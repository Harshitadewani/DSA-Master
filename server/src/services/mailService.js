const nodemailer = require("nodemailer");

function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) return null;

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

async function sendBadgeEmail({ toEmail, name, badgeLabel }) {
  const transporter = createTransporter();
  if (!transporter) {
    // eslint-disable-next-line no-console
    console.log(`Badge mail skipped (SMTP not configured) for ${toEmail}: ${badgeLabel}`);
    return;
  }

  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: toEmail,
    subject: `Congratulations ${name}! You unlocked ${badgeLabel}`,
    html: `
      <h2>Great consistency, ${name}!</h2>
      <p>You unlocked the <strong>${badgeLabel}</strong> badge on DSA Platform.</p>
      <p>Keep solving daily and level up your problem-solving journey.</p>
    `,
  });
}

module.exports = { sendBadgeEmail };
