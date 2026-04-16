const TOPICS = [
  "Array",
  "String",
  "Linked List",
  "Stack",
  "Queue",
  "Hashing",
  "Recursion",
  "Binary Search",
  "Tree",
  "Graph",
  "Heap",
  "Greedy",
  "Dynamic Programming",
  "Backtracking",
  "Bit Manipulation",
  "Two Pointers",
  "Sliding Window",
  "Trie",
  "Segment Tree",
  "Math",
];

const arrayQuestionsData = [
  {
    "title": "Two Sum",
    "topic": "Array",
    "difficulty": "Easy",
    "description": "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.",
    "examples": [
      {
        "input": {"nums": [2,7,11,15], "target": 9},
        "output": [0,1],
        "explanation": "nums[0] + nums[1] = 2 + 7 = 9"
      }
    ],
    "constraints": [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9"
    ],
    "hint": "Use a HashMap to store visited elements."
  },
  {
    "title": "Maximum Subarray",
    "topic": "Array",
    "difficulty": "Medium",
    "description": "Given an integer array nums, find the contiguous subarray with the largest sum and return its sum.",
    "examples": [
      {
        "input": {"nums": [-2,1,-3,4,-1,2,1,-5,4]},
        "output": 6,
        "explanation": "Subarray [4,-1,2,1] has the largest sum."
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5"
    ],
    "hint": "Use Kadane's Algorithm."
  },
  {
    "title": "Rotate Array",
    "topic": "Array",
    "difficulty": "Easy",
    "description": "Given an array, rotate the array to the right by k steps.",
    "examples": [
      {
        "input": {"nums":[1,2,3,4,5,6,7],"k":3},
        "output":[5,6,7,1,2,3,4]
      }
    ],
    "constraints": [
      "1 <= nums.length <= 10^5"
    ],
    "hint": "Reverse entire array, then parts."
  },
  {
    "title": "Best Time to Buy and Sell Stock",
    "topic": "Array",
    "difficulty": "Easy",
    "description": "You are given an array where prices[i] is the price of a stock on the ith day. Find the maximum profit.",
    "examples": [
      {
        "input": {"prices":[7,1,5,3,6,4]},
        "output": 5,
        "explanation": "Buy on day 2 and sell on day 5."
      }
    ],
    "constraints": [
      "0 <= prices.length <= 10^5"
    ],
    "hint": "Track minimum price so far."
  },
  {
    "title": "Product of Array Except Self",
    "topic": "Array",
    "difficulty": "Medium",
    "description": "Return an array answer such that answer[i] is equal to the product of all elements except nums[i].",
    "examples": [
      {
        "input": {"nums":[1,2,3,4]},
        "output":[24,12,8,6]
      }
    ],
    "constraints": [
      "Do not use division"
    ],
    "hint": "Use prefix and suffix products."
  },
  {
    "title": "Move Zeroes",
    "topic": "Array",
    "difficulty": "Easy",
    "description": "Move all 0's to the end while maintaining the order of non-zero elements.",
    "examples": [
      {
        "input":{"nums":[0,1,0,3,12]},
        "output":[1,3,12,0,0]
      }
    ],
    "constraints": [
      "Do it in-place"
    ],
    "hint": "Use two pointers."
  },
  {
    "title": "Find Duplicate Number",
    "topic": "Array",
    "difficulty": "Medium",
    "description": "Find the duplicate number in the array where numbers are in range [1,n].",
    "examples": [
      {
        "input":{"nums":[1,3,4,2,2]},
        "output":2
      }
    ],
    "constraints": [
      "Only one duplicate exists"
    ],
    "hint": "Use Floyd’s cycle detection."
  },
  {
    "title": "Merge Intervals",
    "topic": "Array",
    "difficulty": "Medium",
    "description": "Merge all overlapping intervals.",
    "examples": [
      {
        "input":{"intervals":[[1,3],[2,6],[8,10]]},
        "output":[[1,6],[8,10]]
      }
    ],
    "constraints": [],
    "hint": "Sort intervals first."
  },
  {
    "title": "Trapping Rain Water",
    "topic": "Array",
    "difficulty": "Hard",
    "description": "Compute how much water can be trapped after raining.",
    "examples": [
      {
        "input":{"height":[0,1,0,2,1,0,1,3]},
        "output":6
      }
    ],
    "constraints": [],
    "hint": "Use two pointers or prefix max arrays."
  },
  {
    "title": "Longest Consecutive Sequence",
    "topic": "Array",
    "difficulty": "Hard",
    "description": "Find the length of the longest consecutive elements sequence.",
    "examples": [
      {
        "input":{"nums":[100,4,200,1,3,2]},
        "output":4
      }
    ],
    "constraints": [
      "O(n) required"
    ],
    "hint": "Use HashSet."
  }
];

const stringQuestionsData = [
  {
    "title": "Valid Anagram",
    "topic": "String",
    "difficulty": "Easy",
    "description": "Given two strings s and t, return true if t is an anagram of s, and false otherwise.",
    "examples": [
      {
        "input": {"s": "anagram", "t": "nagaram"},
        "output": true
      },
      {
        "input": {"s": "rat", "t": "car"},
        "output": false
      }
    ],
    "constraints": [
      "1 <= s.length, t.length <= 10^5"
    ],
    "hint": "Use frequency count."
  },
  {
    "title": "Longest Substring Without Repeating Characters",
    "topic": "String",
    "difficulty": "Medium",
    "description": "Find the length of the longest substring without repeating characters.",
    "examples": [
      {
        "input": {"s": "abcabcbb"},
        "output": 3,
        "explanation": "Substring 'abc'"
      }
    ],
    "constraints": [
      "0 <= s.length <= 10^5"
    ],
    "hint": "Sliding window + set."
  },
  {
    "title": "Valid Palindrome",
    "topic": "String",
    "difficulty": "Easy",
    "description": "Check if a string is a palindrome after removing non-alphanumeric characters.",
    "examples": [
      {
        "input": {"s": "A man, a plan, a canal: Panama"},
        "output": true
      }
    ],
    "constraints": [],
    "hint": "Use two pointers."
  },
  {
    "title": "String to Integer (atoi)",
    "topic": "String",
    "difficulty": "Medium",
    "description": "Implement the atoi function which converts a string to a 32-bit signed integer.",
    "examples": [
      {
        "input": {"s": "42"},
        "output": 42
      }
    ],
    "constraints": [],
    "hint": "Handle whitespaces, sign, overflow."
  },
  {
    "title": "Longest Palindromic Substring",
    "topic": "String",
    "difficulty": "Medium",
    "description": "Find the longest palindromic substring in s.",
    "examples": [
      {
        "input": {"s": "babad"},
        "output": "bab"
      }
    ],
    "constraints": [],
    "hint": "Expand around center."
  },
  {
    "title": "Group Anagrams",
    "topic": "String",
    "difficulty": "Medium",
    "description": "Group all anagrams together.",
    "examples": [
      {
        "input": {"strs": ["eat","tea","tan","ate","nat","bat"]},
        "output": [["eat","tea","ate"],["tan","nat"],["bat"]]
      }
    ],
    "constraints": [],
    "hint": "Sort string as key."
  },
  {
    "title": "Minimum Window Substring",
    "topic": "String",
    "difficulty": "Hard",
    "description": "Find the smallest substring containing all characters of t.",
    "examples": [
      {
        "input": {"s": "ADOBECODEBANC", "t": "ABC"},
        "output": "BANC"
      }
    ],
    "constraints": [],
    "hint": "Sliding window + hashmap."
  },
  {
    "title": "Implement strStr()",
    "topic": "String",
    "difficulty": "Easy",
    "description": "Return index of first occurrence of needle in haystack.",
    "examples": [
      {
        "input": {"haystack": "hello", "needle": "ll"},
        "output": 2
      }
    ],
    "constraints": [],
    "hint": "Use substring or KMP."
  },
  {
    "title": "Zigzag Conversion",
    "topic": "String",
    "difficulty": "Medium",
    "description": "Convert string into zigzag pattern.",
    "examples": [
      {
        "input": {"s": "PAYPALISHIRING", "numRows": 3},
        "output": "PAHNAPLSIIGYIR"
      }
    ],
    "constraints": [],
    "hint": "Simulate rows."
  },
  {
    "title": "Palindrome Partitioning",
    "topic": "String",
    "difficulty": "Hard",
    "description": "Partition string such that every substring is palindrome.",
    "examples": [
      {
        "input": {"s": "aab"},
        "output": [["a","a","b"],["aa","b"]]
      }
    ],
    "constraints": [],
    "hint": "Backtracking."
  }
];

const treeQuestionsData = [
  {
    "title": "Binary Tree Inorder Traversal",
    "topic": "Tree",
    "difficulty": "Easy",
    "description": "Given the root of a binary tree, return the inorder traversal of its nodes' values.",
    "examples": [
      {
        "input": {"root": [1,null,2,3]},
        "output": [1,3,2]
      }
    ],
    "constraints": [
      "Number of nodes <= 10^5"
    ],
    "hint": "Use recursion or stack."
  },
  {
    "title": "Maximum Depth of Binary Tree",
    "topic": "Tree",
    "difficulty": "Easy",
    "description": "Find the maximum depth of a binary tree.",
    "examples": [
      {
        "input": {"root": [3,9,20,null,null,15,7]},
        "output": 3
      }
    ],
    "constraints": [],
    "hint": "Use DFS."
  },
  {
    "title": "Invert Binary Tree",
    "topic": "Tree",
    "difficulty": "Easy",
    "description": "Invert a binary tree.",
    "examples": [
      {
        "input": {"root": [4,2,7,1,3,6,9]},
        "output": [4,7,2,9,6,3,1]
      }
    ],
    "constraints": [],
    "hint": "Swap left and right recursively."
  },
  {
    "title": "Same Tree",
    "topic": "Tree",
    "difficulty": "Easy",
    "description": "Check if two trees are identical.",
    "examples": [
      {
        "input": {"p":[1,2,3], "q":[1,2,3]},
        "output": true
      }
    ],
    "constraints": [],
    "hint": "Recursive comparison."
  },
  {
    "title": "Binary Tree Level Order Traversal",
    "topic": "Tree",
    "difficulty": "Medium",
    "description": "Return level order traversal of a binary tree.",
    "examples": [
      {
        "input": {"root":[3,9,20,null,null,15,7]},
        "output": [[3],[9,20],[15,7]]
      }
    ],
    "constraints": [],
    "hint": "Use queue (BFS)."
  },
  {
    "title": "Validate Binary Search Tree",
    "topic": "Tree",
    "difficulty": "Medium",
    "description": "Check if a binary tree is a valid BST.",
    "examples": [
      {
        "input": {"root":[2,1,3]},
        "output": true
      }
    ],
    "constraints": [],
    "hint": "Use min-max range."
  },
  {
    "title": "Lowest Common Ancestor",
    "topic": "Tree",
    "difficulty": "Medium",
    "description": "Find LCA of two nodes in a binary tree.",
    "examples": [
      {
        "input": {"root":[3,5,1,6,2,0,8,null,null,7,4], "p":5, "q":1},
        "output": 3
      }
    ],
    "constraints": [],
    "hint": "Use recursion."
  },
  {
    "title": "Diameter of Binary Tree",
    "topic": "Tree",
    "difficulty": "Medium",
    "description": "Find the diameter (longest path) of a binary tree.",
    "examples": [
      {
        "input": {"root":[1,2,3,4,5]},
        "output": 3
      }
    ],
    "constraints": [],
    "hint": "Use DFS and track height."
  },
  {
    "title": "Serialize and Deserialize Binary Tree",
    "topic": "Tree",
    "difficulty": "Hard",
    "description": "Design an algorithm to serialize and deserialize a binary tree.",
    "examples": [
      {
        "input": {"root":[1,2,3,null,null,4,5]},
        "output": "[1,2,3,null,null,4,5]"
      }
    ],
    "constraints": [],
    "hint": "Use BFS or DFS."
  },
  {
    "title": "Binary Tree Maximum Path Sum",
    "topic": "Tree",
    "difficulty": "Hard",
    "description": "Find the maximum path sum in a binary tree.",
    "examples": [
      {
        "input": {"root":[-10,9,20,null,null,15,7]},
        "output": 42
      }
    ],
    "constraints": [],
    "hint": "Use DFS and track max path."
  }
];

const graphQuestionsData = [
  {
    "title": "Number of Islands",
    "topic": "Graph",
    "difficulty": "Medium",
    "description": "Given a 2D grid of '1's (land) and '0's (water), count the number of islands.",
    "examples": [
      {
        "input": {"grid": [["1","1","0"],["1","0","0"],["0","0","1"]]},
        "output": 2
      }
    ],
    "constraints": [
      "m, n <= 300"
    ],
    "hint": "Use DFS/BFS traversal."
  },
  {
    "title": "Clone Graph",
    "topic": "Graph",
    "difficulty": "Medium",
    "description": "Given a reference of a node in a connected graph, return a deep copy of the graph.",
    "examples": [
      {
        "input": {"adjList": [[2,4],[1,3],[2,4],[1,3]]},
        "output": "Cloned graph structure"
      }
    ],
    "constraints": [],
    "hint": "Use HashMap + DFS."
  },
  {
    "title": "Course Schedule",
    "topic": "Graph",
    "difficulty": "Medium",
    "description": "Determine if you can finish all courses given prerequisites.",
    "examples": [
      {
        "input": {"numCourses": 2, "prerequisites": [[1,0]]},
        "output": true
      }
    ],
    "constraints": [],
    "hint": "Detect cycle using DFS or Kahn’s algorithm."
  },
  {
    "title": "Course Schedule II",
    "topic": "Graph",
    "difficulty": "Medium",
    "description": "Return the order of courses to finish all courses.",
    "examples": [
      {
        "input": {"numCourses": 2, "prerequisites": [[1,0]]},
        "output": [0,1]
      }
    ],
    "constraints": [],
    "hint": "Topological sort."
  },
  {
    "title": "Pacific Atlantic Water Flow",
    "topic": "Graph",
    "difficulty": "Medium",
    "description": "Find cells where water can flow to both oceans.",
    "examples": [
      {
        "input": {"heights": [[1,2],[4,3]]},
        "output": [[0,1],[1,0],[1,1]]
      }
    ],
    "constraints": [],
    "hint": "Reverse DFS from oceans."
  },
  {
    "title": "Graph Valid Tree",
    "topic": "Graph",
    "difficulty": "Medium",
    "description": "Check if given edges form a valid tree.",
    "examples": [
      {
        "input": {"n": 5, "edges": [[0,1],[0,2],[0,3],[1,4]]},
        "output": true
      }
    ],
    "constraints": [],
    "hint": "Check cycle + connected."
  },
  {
    "title": "Rotting Oranges",
    "topic": "Graph",
    "difficulty": "Medium",
    "description": "Find minimum time required for all oranges to rot.",
    "examples": [
      {
        "input": {"grid": [[2,1,1],[1,1,0],[0,1,1]]},
        "output": 4
      }
    ],
    "constraints": [],
    "hint": "Multi-source BFS."
  },
  {
    "title": "Word Ladder",
    "topic": "Graph",
    "difficulty": "Hard",
    "description": "Find shortest transformation sequence from beginWord to endWord.",
    "examples": [
      {
        "input": {"beginWord":"hit","endWord":"cog","wordList":["hot","dot","dog","lot","log","cog"]},
        "output": 5
      }
    ],
    "constraints": [],
    "hint": "BFS with transformations."
  },
  {
    "title": "Alien Dictionary",
    "topic": "Graph",
    "difficulty": "Hard",
    "description": "Find order of characters in alien language.",
    "examples": [
      {
        "input": {"words":["wrt","wrf","er","ett","rftt"]},
        "output": "wertf"
      }
    ],
    "constraints": [],
    "hint": "Topological sort."
  },
  {
    "title": "Minimum Spanning Tree (Prim’s)",
    "topic": "Graph",
    "difficulty": "Hard",
    "description": "Find the minimum cost to connect all nodes.",
    "examples": [
      {
        "input": {"points": [[0,0],[2,2],[3,10],[5,2],[7,0]]},
        "output": 20
      }
    ],
    "constraints": [],
    "hint": "Use Prim’s algorithm with heap."
  }
];

const recursionQuestionsData = [
  {
    "title": "Factorial of a Number",
    "topic": "Recursion",
    "difficulty": "Easy",
    "description": "Given an integer n, return the factorial of n using recursion.",
    "examples": [
      {
        "input": {"n": 5},
        "output": 120
      }
    ],
    "constraints": [
      "0 <= n <= 20"
    ],
    "hint": "n! = n * (n-1)!"
  },
  {
    "title": "Fibonacci Number",
    "topic": "Recursion",
    "difficulty": "Easy",
    "description": "Return the nth Fibonacci number.",
    "examples": [
      {
        "input": {"n": 6},
        "output": 8
      }
    ],
    "constraints": [],
    "hint": "Use recursion or DP for optimization."
  },
  {
    "title": "Generate Subsets",
    "topic": "Recursion",
    "difficulty": "Medium",
    "description": "Given an array, return all possible subsets.",
    "examples": [
      {
        "input": {"nums":[1,2]},
        "output": [[],[1],[2],[1,2]]
      }
    ],
    "constraints": [],
    "hint": "Include or exclude each element."
  },
  {
    "title": "Permutations",
    "topic": "Recursion",
    "difficulty": "Medium",
    "description": "Return all possible permutations of an array.",
    "examples": [
      {
        "input": {"nums":[1,2,3]},
        "output": "All permutations"
      }
    ],
    "constraints": [],
    "hint": "Use backtracking with swapping."
  },
  {
    "title": "Combination Sum",
    "topic": "Recursion",
    "difficulty": "Medium",
    "description": "Find all unique combinations that sum to target.",
    "examples": [
      {
        "input": {"candidates":[2,3,6,7],"target":7},
        "output": [[2,2,3],[7]]
      }
    ],
    "constraints": [],
    "hint": "Backtracking with pruning."
  },
  {
    "title": "Generate Parentheses",
    "topic": "Recursion",
    "difficulty": "Medium",
    "description": "Generate all combinations of valid parentheses.",
    "examples": [
      {
        "input": {"n":3},
        "output": ["((()))","(()())","(())()","()(())","()()()"]
      }
    ],
    "constraints": [],
    "hint": "Track open and close count."
  },
  {
    "title": "Word Search",
    "topic": "Recursion",
    "difficulty": "Medium",
    "description": "Check if a word exists in a grid.",
    "examples": [
      {
        "input": {"board":[["A","B"],["C","D"]],"word":"AB"},
        "output": true
      }
    ],
    "constraints": [],
    "hint": "DFS + backtracking."
  },
  {
    "title": "Palindrome Partitioning",
    "topic": "Recursion",
    "difficulty": "Medium",
    "description": "Partition string into all palindrome substrings.",
    "examples": [
      {
        "input": {"s":"aab"},
        "output": [["a","a","b"],["aa","b"]]
      }
    ],
    "constraints": [],
    "hint": "Backtracking."
  },
  {
    "title": "N-Queens",
    "topic": "Recursion",
    "difficulty": "Hard",
    "description": "Place n queens such that none attack each other.",
    "examples": [
      {
        "input": {"n":4},
        "output": "All valid board configurations"
      }
    ],
    "constraints": [],
    "hint": "Backtracking with column/diagonal checks."
  },
  {
    "title": "Sudoku Solver",
    "topic": "Recursion",
    "difficulty": "Hard",
    "description": "Solve Sudoku using backtracking.",
    "examples": [
      {
        "input": {"board":"9x9 grid"},
        "output": "Solved board"
      }
    ],
    "constraints": [],
    "hint": "Try numbers 1-9 recursively."
  }
];

const binarySearchQuestionsData = [
  {
    "title": "Binary Search",
    "topic": "Binary Search",
    "difficulty": "Easy",
    "description": "Given a sorted array nums and a target value, return the index of target if found, otherwise return -1.",
    "examples": [
      {
        "input": {"nums":[-1,0,3,5,9,12],"target":9},
        "output": 4
      }
    ],
    "constraints": [
      "nums is sorted"
    ],
    "hint": "Classic binary search."
  },
  {
    "title": "Search Insert Position",
    "topic": "Binary Search",
    "difficulty": "Easy",
    "description": "Find the index where the target should be inserted.",
    "examples": [
      {
        "input": {"nums":[1,3,5,6],"target":2},
        "output": 1
      }
    ],
    "constraints": [],
    "hint": "Binary search variant."
  },
  {
    "title": "First and Last Position of Element",
    "topic": "Binary Search",
    "difficulty": "Medium",
    "description": "Find first and last occurrence of target.",
    "examples": [
      {
        "input": {"nums":[5,7,7,8,8,10],"target":8},
        "output": [3,4]
      }
    ],
    "constraints": [],
    "hint": "Use two binary searches."
  },
  {
    "title": "Search in Rotated Sorted Array",
    "topic": "Binary Search",
    "difficulty": "Medium",
    "description": "Search target in rotated sorted array.",
    "examples": [
      {
        "input": {"nums":[4,5,6,7,0,1,2],"target":0},
        "output": 4
      }
    ],
    "constraints": [],
    "hint": "Identify sorted half."
  },
  {
    "title": "Find Minimum in Rotated Sorted Array",
    "topic": "Binary Search",
    "difficulty": "Medium",
    "description": "Find minimum element in rotated array.",
    "examples": [
      {
        "input": {"nums":[3,4,5,1,2]},
        "output": 1
      }
    ],
    "constraints": [],
    "hint": "Binary search pivot."
  },
  {
    "title": "Find Peak Element",
    "topic": "Binary Search",
    "difficulty": "Medium",
    "description": "Find a peak element.",
    "examples": [
      {
        "input": {"nums":[1,2,3,1]},
        "output": 2
      }
    ],
    "constraints": [],
    "hint": "Compare mid with neighbors."
  },
  {
    "title": "Koko Eating Bananas",
    "topic": "Binary Search",
    "difficulty": "Medium",
    "description": "Find minimum eating speed to finish bananas in h hours.",
    "examples": [
      {
        "input": {"piles":[3,6,7,11],"h":8},
        "output": 4
      }
    ],
    "constraints": [],
    "hint": "Binary search on answer."
  },
  {
    "title": "Capacity To Ship Packages",
    "topic": "Binary Search",
    "difficulty": "Medium",
    "description": "Find minimum ship capacity within D days.",
    "examples": [
      {
        "input": {"weights":[1,2,3,4,5,6,7,8,9,10],"days":5},
        "output": 15
      }
    ],
    "constraints": [],
    "hint": "Binary search on answer."
  },
  {
    "title": "Median of Two Sorted Arrays",
    "topic": "Binary Search",
    "difficulty": "Hard",
    "description": "Find median of two sorted arrays.",
    "examples": [
      {
        "input": {"nums1":[1,3],"nums2":[2]},
        "output": 2
      }
    ],
    "constraints": [],
    "hint": "Binary search partition."
  },
  {
    "title": "Split Array Largest Sum",
    "topic": "Binary Search",
    "difficulty": "Hard",
    "description": "Split array into k subarrays minimizing largest sum.",
    "examples": [
      {
        "input": {"nums":[7,2,5,10,8],"k":2},
        "output": 18
      }
    ],
    "constraints": [],
    "hint": "Binary search on answer."
  }
];

const dynamicProgrammingQuestionsData = [
  {
    "title": "Climbing Stairs",
    "topic": "Dynamic Programming",
    "difficulty": "Easy",
    "description": "You are climbing a staircase. It takes n steps to reach the top. Each time you can climb 1 or 2 steps. Find number of distinct ways.",
    "examples": [
      {
        "input": {"n": 3},
        "output": 3,
        "explanation": "Ways: [1+1+1], [1+2], [2+1]"
      }
    ],
    "constraints": [
      "1 <= n <= 45"
    ],
    "hint": "Fibonacci pattern."
  },
  {
    "title": "House Robber",
    "topic": "Dynamic Programming",
    "difficulty": "Medium",
    "description": "You cannot rob adjacent houses. Find maximum amount you can rob.",
    "examples": [
      {
        "input": {"nums":[2,7,9,3,1]},
        "output": 12
      }
    ],
    "constraints": [],
    "hint": "dp[i] = max(dp[i-1], dp[i-2] + nums[i])"
  },
  {
    "title": "House Robber II",
    "topic": "Dynamic Programming",
    "difficulty": "Medium",
    "description": "Same as House Robber but houses are in circular form.",
    "examples": [
      {
        "input": {"nums":[2,3,2]},
        "output": 3
      }
    ],
    "constraints": [],
    "hint": "Break into two cases."
  },
  {
    "title": "Longest Increasing Subsequence",
    "topic": "Dynamic Programming",
    "difficulty": "Medium",
    "description": "Find the length of longest increasing subsequence.",
    "examples": [
      {
        "input": {"nums":[10,9,2,5,3,7,101,18]},
        "output": 4
      }
    ],
    "constraints": [],
    "hint": "DP or Binary Search optimization."
  },
  {
    "title": "Coin Change",
    "topic": "Dynamic Programming",
    "difficulty": "Medium",
    "description": "Find minimum coins needed to make amount.",
    "examples": [
      {
        "input": {"coins":[1,2,5],"amount":11},
        "output": 3
      }
    ],
    "constraints": [],
    "hint": "Bottom-up DP."
  },
  {
    "title": "Partition Equal Subset Sum",
    "topic": "Dynamic Programming",
    "difficulty": "Medium",
    "description": "Check if array can be partitioned into two subsets with equal sum.",
    "examples": [
      {
        "input": {"nums":[1,5,11,5]},
        "output": true
      }
    ],
    "constraints": [],
    "hint": "Subset sum problem."
  },
  {
    "title": "Longest Common Subsequence",
    "topic": "Dynamic Programming",
    "difficulty": "Medium",
    "description": "Find length of longest common subsequence of two strings.",
    "examples": [
      {
        "input": {"text1":"abcde","text2":"ace"},
        "output": 3
      }
    ],
    "constraints": [],
    "hint": "2D DP table."
  },
  {
    "title": "Edit Distance",
    "topic": "Dynamic Programming",
    "difficulty": "Hard",
    "description": "Convert word1 to word2 using minimum operations.",
    "examples": [
      {
        "input": {"word1":"horse","word2":"ros"},
        "output": 3
      }
    ],
    "constraints": [],
    "hint": "Insert, delete, replace operations."
  },
  {
    "title": "Word Break",
    "topic": "Dynamic Programming",
    "difficulty": "Medium",
    "description": "Check if string can be segmented into dictionary words.",
    "examples": [
      {
        "input": {"s":"leetcode","wordDict":["leet","code"]},
        "output": true
      }
    ],
    "constraints": [],
    "hint": "DP + HashSet."
  },
  {
    "title": "Burst Balloons",
    "topic": "Dynamic Programming",
    "difficulty": "Hard",
    "description": "Find maximum coins by bursting balloons wisely.",
    "examples": [
      {
        "input": {"nums":[3,1,5,8]},
        "output": 167
      }
    ],
    "constraints": [],
    "hint": "Interval DP."
  }
];

const hashingQuestionsData = [
  {
    "title": "Two Sum",
    "topic": "Hashing",
    "difficulty": "Easy",
    "description": "Find two indices such that nums[i] + nums[j] = target.",
    "examples": [
      {
        "input": {"nums":[2,7,11,15],"target":9},
        "output":[0,1]
      }
    ],
    "constraints": [],
    "hint": "Use HashMap."
  },
  {
    "title": "Contains Duplicate",
    "topic": "Hashing",
    "difficulty": "Easy",
    "description": "Check if array contains any duplicates.",
    "examples": [
      {
        "input": {"nums":[1,2,3,1]},
        "output": true
      }
    ],
    "constraints": [],
    "hint": "Use HashSet."
  },
  {
    "title": "Intersection of Two Arrays",
    "topic": "Hashing",
    "difficulty": "Easy",
    "description": "Return intersection of two arrays.",
    "examples": [
      {
        "input": {"nums1":[1,2,2,1],"nums2":[2,2]},
        "output":[2]
      }
    ],
    "constraints": [],
    "hint": "Use set."
  },
  {
    "title": "Longest Consecutive Sequence",
    "topic": "Hashing",
    "difficulty": "Medium",
    "description": "Find length of longest consecutive sequence.",
    "examples": [
      {
        "input": {"nums":[100,4,200,1,3,2]},
        "output": 4
      }
    ],
    "constraints": [],
    "hint": "Use HashSet."
  },
  {
    "title": "Subarray Sum Equals K",
    "topic": "Hashing",
    "difficulty": "Medium",
    "description": "Count subarrays whose sum equals k.",
    "examples": [
      {
        "input": {"nums":[1,1,1],"k":2},
        "output": 2
      }
    ],
    "constraints": [],
    "hint": "Prefix sum + hashmap."
  },
  {
    "title": "Group Anagrams",
    "topic": "Hashing",
    "difficulty": "Medium",
    "description": "Group anagrams together.",
    "examples": [
      {
        "input": {"strs":["eat","tea","tan","ate","nat","bat"]},
        "output":[["eat","tea","ate"],["tan","nat"],["bat"]]
      }
    ],
    "constraints": [],
    "hint": "Sorted string as key."
  },
  {
    "title": "Longest Substring Without Repeating Characters",
    "topic": "Hashing",
    "difficulty": "Medium",
    "description": "Find longest substring without repeating characters.",
    "examples": [
      {
        "input": {"s":"abcabcbb"},
        "output": 3
      }
    ],
    "constraints": [],
    "hint": "Use HashSet + sliding window."
  },
  {
    "title": "Minimum Window Substring",
    "topic": "Hashing",
    "difficulty": "Hard",
    "description": "Find minimum window containing all chars of t.",
    "examples": [
      {
        "input": {"s":"ADOBECODEBANC","t":"ABC"},
        "output":"BANC"
      }
    ],
    "constraints": [],
    "hint": "Sliding window + hashmap."
  },
  {
    "title": "Isomorphic Strings",
    "topic": "Hashing",
    "difficulty": "Easy",
    "description": "Check if two strings are isomorphic.",
    "examples": [
      {
        "input": {"s":"egg","t":"add"},
        "output": true
      }
    ],
    "constraints": [],
    "hint": "Use two hashmaps."
  },
  {
    "title": "LRU Cache",
    "topic": "Hashing",
    "difficulty": "Hard",
    "description": "Design LRU Cache supporting get and put in O(1).",
    "examples": [
      {
        "input": {"operations":["put","put","get","put","get"],"values":[[1,1],[2,2],[1],[3,3],[2]]},
        "output":[null,null,1,null,-1]
      }
    ],
    "constraints": [],
    "hint": "HashMap + Doubly Linked List."
  }
];

const heapQuestionsData = [
  {
    "title": "Kth Largest Element in Array",
    "topic": "Heap",
    "difficulty": "Medium",
    "description": "Find the kth largest element in an unsorted array.",
    "examples": [
      {
        "input": {"nums":[3,2,1,5,6,4], "k":2},
        "output": 5
      }
    ],
    "constraints": [],
    "hint": "Use min heap of size k."
  },
  {
    "title": "Top K Frequent Elements",
    "topic": "Heap",
    "difficulty": "Medium",
    "description": "Return k most frequent elements.",
    "examples": [
      {
        "input": {"nums":[1,1,1,2,2,3], "k":2},
        "output": [1,2]
      }
    ],
    "constraints": [],
    "hint": "Frequency map + heap."
  },
  {
    "title": "Merge K Sorted Lists",
    "topic": "Heap",
    "difficulty": "Hard",
    "description": "Merge k sorted linked lists into one sorted list.",
    "examples": [
      {
        "input": {"lists":[[1,4,5],[1,3,4],[2,6]]},
        "output":[1,1,2,3,4,4,5,6]
      }
    ],
    "constraints": [],
    "hint": "Use min heap."
  },
  {
    "title": "Find Median from Data Stream",
    "topic": "Heap",
    "difficulty": "Hard",
    "description": "Continuously find median from stream of numbers.",
    "examples": [
      {
        "input": {"operations":["addNum","addNum","findMedian"], "values":[1,2,null]},
        "output":[null,null,1.5]
      }
    ],
    "constraints": [],
    "hint": "Use two heaps (max + min)."
  },
  {
    "title": "K Closest Points to Origin",
    "topic": "Heap",
    "difficulty": "Medium",
    "description": "Find k closest points to origin.",
    "examples": [
      {
        "input": {"points":[[1,3],[-2,2]], "k":1},
        "output":[[-2,2]]
      }
    ],
    "constraints": [],
    "hint": "Use max heap."
  },
  {
    "title": "Task Scheduler",
    "topic": "Heap",
    "difficulty": "Medium",
    "description": "Find minimum intervals to execute tasks with cooling period.",
    "examples": [
      {
        "input": {"tasks":["A","A","A","B","B","B"], "n":2},
        "output": 8
      }
    ],
    "constraints": [],
    "hint": "Max heap + greedy."
  },
  {
    "title": "Sort Characters by Frequency",
    "topic": "Heap",
    "difficulty": "Medium",
    "description": "Sort characters by decreasing frequency.",
    "examples": [
      {
        "input": {"s":"tree"},
        "output":"eert"
      }
    ],
    "constraints": [],
    "hint": "Use frequency map + heap."
  },
  {
    "title": "Kth Smallest Element in Sorted Matrix",
    "topic": "Heap",
    "difficulty": "Medium",
    "description": "Find kth smallest element in matrix.",
    "examples": [
      {
        "input": {"matrix":[[1,5,9],[10,11,13],[12,13,15]], "k":8},
        "output": 13
      }
    ],
    "constraints": [],
    "hint": "Min heap."
  },
  {
    "title": "Reorganize String",
    "topic": "Heap",
    "difficulty": "Medium",
    "description": "Rearrange string so no adjacent characters are same.",
    "examples": [
      {
        "input": {"s":"aab"},
        "output":"aba"
      }
    ],
    "constraints": [],
    "hint": "Max heap."
  },
  {
    "title": "IPO (Maximize Capital)",
    "topic": "Heap",
    "difficulty": "Hard",
    "description": "Find maximum capital after selecting k projects.",
    "examples": [
      {
        "input": {"k":2,"w":0,"profits":[1,2,3],"capital":[0,1,1]},
        "output": 4
      }
    ],
    "constraints": [],
    "hint": "Use two heaps."
  }
];

const slidingWindowQuestionsData = [
  {
    "title": "Maximum Sum Subarray of Size K",
    "topic": "Sliding Window",
    "difficulty": "Easy",
    "description": "Find the maximum sum of any contiguous subarray of size k.",
    "examples": [
      {
        "input": {"nums":[2,1,5,1,3,2],"k":3},
        "output": 9,
        "explanation": "Subarray [5,1,3]"
      }
    ],
    "constraints": [],
    "hint": "Use fixed-size sliding window."
  },
  {
    "title": "Longest Substring Without Repeating Characters",
    "topic": "Sliding Window",
    "difficulty": "Medium",
    "description": "Find length of longest substring without repeating characters.",
    "examples": [
      {
        "input": {"s":"abcabcbb"},
        "output": 3
      }
    ],
    "constraints": [],
    "hint": "Use variable window + set."
  },
  {
    "title": "Minimum Window Substring",
    "topic": "Sliding Window",
    "difficulty": "Hard",
    "description": "Find the smallest substring containing all characters of t.",
    "examples": [
      {
        "input": {"s":"ADOBECODEBANC","t":"ABC"},
        "output":"BANC"
      }
    ],
    "constraints": [],
    "hint": "Use hashmap + variable window."
  },
  {
    "title": "Longest Repeating Character Replacement",
    "topic": "Sliding Window",
    "difficulty": "Medium",
    "description": "Replace at most k characters to get longest repeating substring.",
    "examples": [
      {
        "input": {"s":"AABABBA","k":1},
        "output": 4
      }
    ],
    "constraints": [],
    "hint": "Track max frequency."
  },
  {
    "title": "Permutation in String",
    "topic": "Sliding Window",
    "difficulty": "Medium",
    "description": "Check if s2 contains a permutation of s1.",
    "examples": [
      {
        "input": {"s1":"ab","s2":"eidbaooo"},
        "output": true
      }
    ],
    "constraints": [],
    "hint": "Fixed window + frequency map."
  },
  {
    "title": "Subarray Product Less Than K",
    "topic": "Sliding Window",
    "difficulty": "Medium",
    "description": "Count subarrays where product < k.",
    "examples": [
      {
        "input": {"nums":[10,5,2,6],"k":100},
        "output": 8
      }
    ],
    "constraints": [],
    "hint": "Expand and shrink window."
  },
  {
    "title": "Max Consecutive Ones III",
    "topic": "Sliding Window",
    "difficulty": "Medium",
    "description": "Flip at most k zeros to get longest 1s.",
    "examples": [
      {
        "input": {"nums":[1,1,1,0,0,0,1,1,1,1,0],"k":2},
        "output": 6
      }
    ],
    "constraints": [],
    "hint": "Variable window."
  },
  {
    "title": "Fruit Into Baskets",
    "topic": "Sliding Window",
    "difficulty": "Medium",
    "description": "Find longest subarray with at most 2 distinct elements.",
    "examples": [
      {
        "input": {"fruits":[1,2,1]},
        "output": 3
      }
    ],
    "constraints": [],
    "hint": "At most 2 distinct elements."
  },
  {
    "title": "Longest Subarray with Sum K",
    "topic": "Sliding Window",
    "difficulty": "Medium",
    "description": "Find longest subarray with sum equal to k.",
    "examples": [
      {
        "input": {"nums":[1,2,3,1,1,1,1],"k":3},
        "output": 3
      }
    ],
    "constraints": [],
    "hint": "Use prefix sum (for negatives)."
  },
  {
    "title": "Sliding Window Maximum",
    "topic": "Sliding Window",
    "difficulty": "Hard",
    "description": "Find max element in every window of size k.",
    "examples": [
      {
        "input": {"nums":[1,3,-1,-3,5,3,6,7],"k":3},
        "output":[3,3,5,5,6,7]
      }
    ],
    "constraints": [],
    "hint": "Use deque."
  }
];

const linkedListQuestionsData = [
  {
    "title": "Reverse Linked List",
    "topic": "Linked List",
    "difficulty": "Easy",
    "description": "Reverse a singly linked list and return the head.",
    "examples": [
      {
        "input": {"head":[1,2,3,4,5]},
        "output":[5,4,3,2,1]
      }
    ],
    "constraints": [],
    "hint": "Use iterative or recursive approach."
  },
  {
    "title": "Linked List Cycle",
    "topic": "Linked List",
    "difficulty": "Easy",
    "description": "Detect if a linked list has a cycle.",
    "examples": [
      {
        "input": {"head":[3,2,0,-4], "pos":1},
        "output": true
      }
    ],
    "constraints": [],
    "hint": "Use Floyd’s cycle detection."
  },
  {
    "title": "Merge Two Sorted Lists",
    "topic": "Linked List",
    "difficulty": "Easy",
    "description": "Merge two sorted linked lists into one sorted list.",
    "examples": [
      {
        "input": {"l1":[1,2,4], "l2":[1,3,4]},
        "output":[1,1,2,3,4,4]
      }
    ],
    "constraints": [],
    "hint": "Use dummy node."
  },
  {
    "title": "Remove Nth Node From End",
    "topic": "Linked List",
    "difficulty": "Medium",
    "description": "Remove the nth node from the end of the list.",
    "examples": [
      {
        "input": {"head":[1,2,3,4,5], "n":2},
        "output":[1,2,3,5]
      }
    ],
    "constraints": [],
    "hint": "Use two pointers."
  },
  {
    "title": "Middle of the Linked List",
    "topic": "Linked List",
    "difficulty": "Easy",
    "description": "Find the middle node of a linked list.",
    "examples": [
      {
        "input": {"head":[1,2,3,4,5]},
        "output":[3,4,5]
      }
    ],
    "constraints": [],
    "hint": "Slow and fast pointer."
  },
  {
    "title": "Intersection of Two Linked Lists",
    "topic": "Linked List",
    "difficulty": "Easy",
    "description": "Find intersection node of two linked lists.",
    "examples": [
      {
        "input": {"listA":[4,1,8,4,5], "listB":[5,6,1,8,4,5]},
        "output": 8
      }
    ],
    "constraints": [],
    "hint": "Two pointer switching technique."
  },
  {
    "title": "Palindrome Linked List",
    "topic": "Linked List",
    "difficulty": "Easy",
    "description": "Check if linked list is palindrome.",
    "examples": [
      {
        "input": {"head":[1,2,2,1]},
        "output": true
      }
    ],
    "constraints": [],
    "hint": "Reverse second half."
  },
  {
    "title": "Reorder List",
    "topic": "Linked List",
    "difficulty": "Medium",
    "description": "Reorder list as L0 → Ln → L1 → Ln-1...",
    "examples": [
      {
        "input": {"head":[1,2,3,4]},
        "output":[1,4,2,3]
      }
    ],
    "constraints": [],
    "hint": "Find middle, reverse, merge."
  },
  {
    "title": "Copy List with Random Pointer",
    "topic": "Linked List",
    "difficulty": "Medium",
    "description": "Deep copy a linked list with random pointers.",
    "examples": [
      {
        "input": {"head":"complex list"},
        "output":"deep copy"
      }
    ],
    "constraints": [],
    "hint": "Use hashmap or interweaving nodes."
  },
  {
    "title": "Merge K Sorted Lists",
    "topic": "Linked List",
    "difficulty": "Hard",
    "description": "Merge k sorted linked lists into one.",
    "examples": [
      {
        "input": {"lists":[[1,4,5],[1,3,4],[2,6]]},
        "output":[1,1,2,3,4,4,5,6]
      }
    ],
    "constraints": [],
    "hint": "Use heap or divide & conquer."
  }
];

function toSlug(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

const starterCode = {
  javascript: `function solve(input) {\n  // Your logic here\n  return 0;\n}`,
  cpp: `// C++ template logic`,
  java: `// Java template logic`,
  python: `# Python template logic`,
};

function createProblem(topic, track, difficulty, title, index, customData = null) {
  if (customData) {
    const slug = toSlug(`${topic}-${customData.title}-${index + 1}`);
    const formattedDesc = `
### Description
${customData.description}

### Examples
${customData.examples.map((ex, i) => `
**Example ${i+1}:**
- **Input:** \`${JSON.stringify(ex.input)}\`
- **Output:** \`${JSON.stringify(ex.output)}\`
${ex.explanation ? `- **Explanation:** ${ex.explanation}` : ""}
`).join("\n")}

### Constraints
${customData.constraints && customData.constraints.length > 0 ? customData.constraints.map(c => `- ${c}`).join("\n") : "- No specific constraints."}

### Hints
- **Hint:** ${customData.hint}
`;
    return {
      title: customData.title,
      slug,
      topic,
      track,
      difficulty: customData.difficulty,
      tags: [topic, customData.difficulty],
      description: formattedDesc.trim(),
      starterCode,
      sampleTestCases: customData.examples.map(ex => ({
        input: JSON.stringify(ex.input),
        expectedOutput: JSON.stringify(ex.output)
      })),
      hiddenTestCases: customData.examples.map(ex => ({
        input: JSON.stringify(ex.input),
        expectedOutput: JSON.stringify(ex.output)
      })),
    };
  }

  // Generic generator for other topics
  const slug = toSlug(`${topic}-${track}-problem-${index + 1}`);
  return {
    title: `${topic} Challenge #${index + 1}`,
    slug,
    topic,
    track,
    difficulty,
    tags: [topic, track, difficulty],
    description: `### Description\nStandard problem for ${topic} topic.`,
    starterCode,
    sampleTestCases: [{ input: '{"nums":[1,2,3]}', expectedOutput: "6" }],
    hiddenTestCases: [{ input: '{"nums":[1,2,3]}', expectedOutput: "6" }],
  };
}

const problems = [];

TOPICS.forEach((topic) => {
  if (topic === "Array") {
    arrayQuestionsData.forEach((data, i) => {
      let track = data.difficulty === "Easy" ? "Basic" : data.difficulty === "Medium" ? "Intermediate" : "Hard";
      problems.push(createProblem(topic, track, data.difficulty, data.title, i, data));
    });
  } else if (topic === "String") {
    stringQuestionsData.forEach((data, i) => {
      let track = data.difficulty === "Easy" ? "Basic" : data.difficulty === "Medium" ? "Intermediate" : "Hard";
      problems.push(createProblem(topic, track, data.difficulty, data.title, i, data));
    });
  } else if (topic === "Tree") {
    treeQuestionsData.forEach((data, i) => {
      let track = data.difficulty === "Easy" ? "Basic" : data.difficulty === "Medium" ? "Intermediate" : "Hard";
      problems.push(createProblem(topic, track, data.difficulty, data.title, i, data));
    });
  } else if (topic === "Graph") {
    graphQuestionsData.forEach((data, i) => {
      let track = data.difficulty === "Easy" ? "Basic" : data.difficulty === "Medium" ? "Intermediate" : "Hard";
      problems.push(createProblem(topic, track, data.difficulty, data.title, i, data));
    });
  } else if (topic === "Recursion") {
    recursionQuestionsData.forEach((data, i) => {
      let track = data.difficulty === "Easy" ? "Basic" : data.difficulty === "Medium" ? "Intermediate" : "Hard";
      problems.push(createProblem(topic, track, data.difficulty, data.title, i, data));
    });
  } else if (topic === "Binary Search") {
    binarySearchQuestionsData.forEach((data, i) => {
      let track = data.difficulty === "Easy" ? "Basic" : data.difficulty === "Medium" ? "Intermediate" : "Hard";
      problems.push(createProblem(topic, track, data.difficulty, data.title, i, data));
    });
  } else if (topic === "Dynamic Programming") {
    dynamicProgrammingQuestionsData.forEach((data, i) => {
      let track = data.difficulty === "Easy" ? "Basic" : data.difficulty === "Medium" ? "Intermediate" : "Hard";
      problems.push(createProblem(topic, track, data.difficulty, data.title, i, data));
    });
  } else if (topic === "Hashing") {
    hashingQuestionsData.forEach((data, i) => {
      let track = data.difficulty === "Easy" ? "Basic" : data.difficulty === "Medium" ? "Intermediate" : "Hard";
      problems.push(createProblem(topic, track, data.difficulty, data.title, i, data));
    });
  } else if (topic === "Heap") {
    heapQuestionsData.forEach((data, i) => {
      let track = data.difficulty === "Easy" ? "Basic" : data.difficulty === "Medium" ? "Intermediate" : "Hard";
      problems.push(createProblem(topic, track, data.difficulty, data.title, i, data));
    });
  } else if (topic === "Sliding Window") {
    slidingWindowQuestionsData.forEach((data, i) => {
      let track = data.difficulty === "Easy" ? "Basic" : data.difficulty === "Medium" ? "Intermediate" : "Hard";
      problems.push(createProblem(topic, track, data.difficulty, data.title, i, data));
    });
  } else if (topic === "Linked List") {
    linkedListQuestionsData.forEach((data, i) => {
      let track = data.difficulty === "Easy" ? "Basic" : data.difficulty === "Medium" ? "Intermediate" : "Hard";
      problems.push(createProblem(topic, track, data.difficulty, data.title, i, data));
    });
  } else {
    for (let i = 0; i < 10; i++) {
        let difficulty = "Easy";
        let track = "Basic";
        if (i >= 4 && i < 7) { difficulty = "Medium"; track = "Intermediate"; }
        if (i >= 7) { difficulty = "Hard"; track = "Hard"; }
        problems.push(createProblem(topic, track, difficulty, `Problem ${i+1}`, i));
    }
  }
});

module.exports = problems;
