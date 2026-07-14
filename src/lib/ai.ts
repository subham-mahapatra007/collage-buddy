// AI Utilities for College Buddy
// Handles integration with OpenAI API or provides a realistic educational simulator

export interface AIResponse {
  content: string;
  success: boolean;
}

export async function askAI(
  prompt: string,
  systemInstruction?: string
): Promise<AIResponse> {
  const apiKey = process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY;

  if (apiKey) {
    try {
      // Use OpenAI API if key is present
      if (process.env.OPENAI_API_KEY) {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              ...(systemInstruction ? [{ role: "system", content: systemInstruction }] : []),
              { role: "user", content: prompt },
            ],
            temperature: 0.7,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          return {
            content: data.choices[0]?.message?.content || "No response received.",
            success: true,
          };
        }
      }

      // Use Gemini API if key is present (Gemini OpenAI Compatibility URL)
      if (process.env.GEMINI_API_KEY) {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/openai/chat/completions`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.GEMINI_API_KEY}`,
            },
            body: JSON.stringify({
              model: "gemini-2.5-flash",
              messages: [
                ...(systemInstruction ? [{ role: "system", content: systemInstruction }] : []),
                { role: "user", content: prompt },
              ],
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          return {
            content: data.choices[0]?.message?.content || "No response received.",
            success: true,
          };
        }
      }
    } catch (e) {
      console.error("AI API Call failed, falling back to simulator:", e);
    }
  }

  // Context-aware Educational Simulator Fallback
  return {
    content: simulateAIResponse(prompt, systemInstruction),
    success: true,
  };
}

function simulateAIResponse(prompt: string, systemInstruction?: string): string {
  const p = prompt.toLowerCase();
  
  // Flashcard generator request
  if (p.includes("flashcard") || p.includes("flash cards")) {
    return `### 💡 AI Generated Flashcards

1. **Card 1: What is a Semaphore in OS?**
   * **Front**: What is a Semaphore and what are its types?
   * **Back**: A Semaphore is a variable or abstract data type used to control access to a common resource by multiple processes in a concurrent system. Types: Binary Semaphore (0 or 1 value, like a Mutex) and Counting Semaphore (unbounded value range).
   
2. **Card 2: Define Virtual Memory**
   * **Front**: What is Virtual Memory and why is it used?
   * **Back**: Virtual Memory is a storage allocation scheme in which secondary memory (HDD/SSD) can be addressed as though it were part of main memory (RAM). It allows executing programs larger than physical memory.

3. **Card 3: BPUT Exam Tip: Time Complexity of QuickSort**
   * **Front**: What is the Best, Average, and Worst case time complexity of QuickSort?
   * **Back**: 
     * **Best / Average Case**: O(N log N) - occurs when the pivot divides the array into roughly equal halves.
     * **Worst Case**: O(N²) - occurs when the array is already sorted and we pick the first/last element as pivot.`;
  }

  // MCQ generator request
  if (p.includes("mcq") || p.includes("multiple choice")) {
    return `### 📝 Practice MCQs: BPUT Computer Science Syllabus

**Q1. Which of the following is NOT an OOP concept in C++ / Java?**
- A) Encapsulation
- B) Compilation 👈 **(Correct)**
- C) Inheritance
- D) Polymorphism
*Explanation: Compilation is a system process that converts source code to machine code. OOP concepts are Encapsulation, Abstraction, Inheritance, and Polymorphism.*

**Q2. In BPUT DBMS exams, what normal form deals with multi-valued dependencies?**
- A) 1NF
- B) 2NF
- C) 3NF
- D) 4NF 👈 **(Correct)**
*Explanation: 4NF (Fourth Normal Form) specifically addresses Multi-Valued Dependencies.*

**Q3. What is the complexity to search an element in a balanced Binary Search Tree (BST)?**
- A) O(1)
- B) O(N)
- C) O(log N) 👈 **(Correct)**
- D) O(N log N)
*Explanation: A balanced BST has a height of log N, hence searching takes O(log N) time.*`;
  }

  // Code explainer or debugger request
  if (p.includes("code") || p.includes("debug") || p.includes("program") || p.includes("pointer") || p.includes("java") || p.includes("cpp")) {
    return `### 🛠️ AI Code Analysis & Debugger

#### Code Review & Explanation
* **Current Status**: The code uses manual memory allocation or pointers.
* **Key Concept**: Memory allocation using \`malloc()\` in C requires matching \`free()\` calls to prevent memory leaks, which is highly tested in BPUT CSE Lab exams.

#### Corrected & Optimized Code:
\`\`\`cpp
#include <iostream>
using namespace std;

// Correct implementation of memory management
int main() {
    int size = 5;
    // Dynamic memory allocation in C++
    int* arr = new int[size];
    
    // Initialize array
    for(int i = 0; i < size; i++) {
        arr[i] = (i + 1) * 10;
        cout << "Element " << i << ": " << arr[i] << endl;
    }
    
    // CRITICAL FIX: Freeing allocated memory to prevent memory leak
    delete[] arr; 
    return 0;
}
\`\`\`

#### Debugging Advice:
1. **Always release resources**: Make sure that you deallocate dynamic arrays using \`delete[]\` in C++ or \`free()\` in C.
2. **Null pointer checks**: Always verify if a pointer is \`nullptr\` before attempting to dereference it.`;
  }

  // Interview or Viva Questions
  if (p.includes("viva") || p.includes("interview") || p.includes("question")) {
    return `### 🎓 BPUT Semester Viva & Placement Prep Questions

#### Top Questions for computer science engineering:
1. **What is the difference between Method Overloading and Method Overriding?**
   * *Answer*: Overloading occurs at compile-time (same method name, different parameters in the same class). Overriding occurs at runtime (same method name and parameters in parent and child classes).
2. **What is a Primary Key vs a Unique Key in SQL?**
   * *Answer*: A Primary Key uniquely identifies a record, cannot accept NULL values, and only 1 is allowed per table. A Unique Key also identifies records uniquely, but can accept one NULL value, and multiple Unique Keys can exist.
3. **What is ACID properties in DBMS?**
   * *Answer*: ACID stands for Atomicity (all or nothing), Consistency (state transitions are valid), Isolation (concurrent transactions don't interfere), and Durability (transactions persist after failure).`;
  }

  // Default response (general doubts)
  return `### 📘 AI Academic Tutor: CSE Study Companion

Here is an analysis of your query: **"${prompt}"**

#### 🔑 Core Concepts explained:
* **BPUT CSE Curriculum Context**: This topic is highly relevant for subjects like **Design and Analysis of Algorithms (DAA)**, **Database Management Systems (DBMS)**, and **Computer Organization (COA)**.
* **Explanation**:
  1. **Concept Definition**: Whenever tackling computer science concepts, focus on drawing block diagrams or writing dry runs, as BPUT examiners award high marks for structured flow diagrams.
  2. **Step-by-Step Breakdown**: Focus on divide-and-conquer strategies when designing algorithms.
  3. **Real-world Application**: Understanding this helps in cloud system design, database indexing, and optimizing software memory layouts.

#### 📚 Recommended Reading:
- Refer to local BPUT standard textbook recommendations (e.g., *Coreen, Leiserson, Rivest (CLRS)* for Algorithms, and *Korth* for DBMS).
- Practice the previous 5 years' question papers, particularly short questions from Part-A.

*Do you want me to generate Flashcards, MCQs, or explain code for this topic? Type your request below!*`;
}
