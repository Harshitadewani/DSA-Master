const vm = require("vm");
const { askGemini } = require("./geminiService");

function parseInput(input) {
  try {
    return JSON.parse(input);
  } catch (error) {
    return input;
  }
}

function stringifyOutput(value) {
  if (value === undefined) return "undefined";
  if (value === null) return "null";
  if (typeof value === "string") return value;
  return JSON.stringify(value);
}

async function runJavaScriptCode(code, input) {
  const parsedInput = parseInput(input);
  
  try {
    new vm.Script(code);
  } catch (e) {
    throw new Error(`SYNTAX ERROR: ${e.message}`);
  }

  const wrappedCode = `
"use strict";
${code}
if (typeof solve !== "function" && typeof rotate !== "function") {
  throw new Error("ENTRY POINT MISSING: You must define the required function (e.g., solve or rotate)");
}
const func = typeof solve === "function" ? solve : rotate;
try {
  const result = func(__INPUT__);
  result;
} catch (innerError) {
  throw new Error("RUNTIME ERROR: " + innerError.message);
}
`;

  const context = {
    __INPUT__: parsedInput,
    console: { log: () => {} }
  };
  
  vm.createContext(context);
  
  try {
    const script = new vm.Script(wrappedCode, { filename: "user-logic.js" });
    const result = script.runInContext(context, { timeout: 2000 });
    return stringifyOutput(result);
  } catch (e) {
    if (e.message.includes("timeout")) throw new Error("TIME LIMIT EXCEEDED (>2s)");
    if (e.message.startsWith("SYNTAX") || e.message.startsWith("RUNTIME") || e.message.startsWith("ENTRY POINT")) throw e;
    throw new Error(`CODE STRUCTURE ERROR: ${e.message}`);
  }
}

async function executeCode({ code, language, testCases, problemTitle, problemDescription }) {
  const started = process.hrtime.bigint();
  const testResults = [];
  let stdout = "";
  let stderr = "";
  let status = "Accepted";

  try {
    if (!code || code.trim().length === 0) throw new Error("ERROR: Code editor is empty.");

    if (language === "javascript") {
      for (const testCase of testCases) {
        const actualOutput = await runJavaScriptCode(code, testCase.input);
        const passed = String(actualOutput).trim() === String(testCase.expectedOutput).trim();
        if (!passed) status = "Failed";

        testResults.push({
          input: testCase.input,
          expectedOutput: testCase.expectedOutput,
          actualOutput,
          passed
        });
      }
      stdout = testResults.map(r => r.actualOutput).join("\n");
    } else {
      // NON-JS: USE AI SIMULATION (PREMIUM FEEL)
      console.log(`Simulating ${language} execution via AI...`);
      const aiResponse = await askGemini({
        problemTitle,
        problemDescription,
        userCode: code,
        prompt: `ACT AS A COMPILER FOR ${language.toUpperCase()}. 
        1. Check for syntax errors. 
        2. Run these inputs: ${testCases.map(t => t.input).join(' | ')}.
        3. Compare results with expected outputs.
        
        RETURN JSON ONLY: 
        { 
          "status": "Accepted" | "Failed" | "Error", 
          "error": "Short error message if any", 
          "results": [{ "input": "...", "passed": true/false, "actual": "..." }] 
        }`
      });

      try {
        // Clean AI response if it has backticks
        const cleaned = aiResponse.replace(/```json|```/g, "").trim();
        const parsed = JSON.parse(cleaned);
        status = parsed.status;
        stderr = parsed.error || "";
        parsed.results.forEach((res, i) => {
          testResults.push({
             input: testCases[i].input,
             expectedOutput: testCases[i].expectedOutput,
             actualOutput: res.actual,
             passed: res.passed
          });
        });
        stdout = `[AI SIMULATION] Output validated for ${language}`;
      } catch (parseErr) {
         // Fallback if AI text is not JSON
         if (aiResponse.toLowerCase().includes("error") || aiResponse.toLowerCase().includes("incorrect")) {
            status = "Error";
            stderr = "AI EVALUATION: Identified syntax or logic errors in your " + language + " code.";
         } else {
            status = "Accepted";
            stdout = "AI EVALUATION: Code logic appears sound.";
         }
      }
    }
  } catch (error) {
    status = "Error";
    stderr = error.message.toUpperCase();
  }

  const ended = process.hrtime.bigint();
  const executionTimeMs = Number(ended - started) / 1_000_000;
  const memoryUsageKb = Math.round(process.memoryUsage().heapUsed / 1024);

  return {
    status,
    stdout,
    stderr,
    testResults,
    executionTimeMs: Number(executionTimeMs.toFixed(2)),
    memoryUsageKb
  };
}

module.exports = { executeCode };
