// Mock Data for College Buddy BPUT CSE Portal

export interface SubjectMock {
  id: string;
  code: string;
  name: string;
  semester: number;
  chapters: { title: string; content: string }[];
  pyqs: { year: number; question: string; answer: string }[];
  mcqs: { question: string; options: string[]; correctIdx: number; explanation: string }[];
  viva: { question: string; answer: string }[];
  important: string[];
  labManual?: { title: string; steps: string[]; codeSnippet?: string }[];
}

export interface PlacementItem {
  id: string;
  company: string;
  category: "Aptitude" | "Technical" | "HR" | "Coding" | "Experiences";
  title: string;
  content: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

export interface ProjectMock {
  id: string;
  title: string;
  description: string;
  type: "Mini" | "Major";
  schema?: string;
  githubUrl?: string;
  reportSummary?: string;
  pptSlides?: string[];
}

export const mockSubjects: SubjectMock[] = [
  // Semester 3
  {
    id: "ds",
    code: "BCS-301",
    name: "Data Structures",
    semester: 3,
    chapters: [
      {
        title: "Chapter 1: Introduction to Data Structures & Arrays",
        content: "Data structures are methods of organizing and storing data in computers. An array is a collection of items stored at contiguous memory locations. In BPUT exams, focus on addressing formulas: Address of A[i] = BaseAddress + i * size."
      },
      {
        title: "Chapter 2: Linked Lists",
        content: "Linked lists consist of nodes where each node contains data and a pointer to the next node. Focus on Singly, Doubly, and Circular linked lists. Insertion and deletion operations take O(1) time if pointer is known, but O(N) traversal is required to locate."
      },
      {
        title: "Chapter 3: Stacks and Queues",
        content: "Stacks use Last In First Out (LIFO) order. Operations: Push, Pop. Applications: Recursion, Infix-to-Postfix conversion. Queues use First In First Out (FIFO). Types: Circular Queue, Deque, Priority Queue."
      },
      {
        title: "Chapter 4: Trees and Graphs",
        content: "Binary Tree, Binary Search Tree (BST), AVL Trees. Graph representations: Adjacency Matrix and Adjacency List. Graph Traversals: Depth First Search (DFS) and Breadth First Search (BFS)."
      }
    ],
    pyqs: [
      {
        year: 2024,
        question: "Explain the algorithm to convert an infix expression to a postfix expression using a stack.",
        answer: "1. Scan the infix expression from left to right.\n2. If the character is an operand, output it.\n3. If it is '(', push it to stack.\n4. If it is ')', pop and output from the stack until '(' is encountered.\n5. If it is an operator, pop operators of higher or equal precedence from the stack, output them, and then push the current operator."
      },
      {
        year: 2023,
        question: "What is an AVL Tree? Show insertion in AVL tree with rotations.",
        answer: "An AVL Tree is a self-balancing Binary Search Tree where the difference between heights of left and right subtrees (Balance Factor) cannot be more than 1. Balance Factor = Height(Left Subtree) - Height(Right Subtree). Rotations: LL, RR, LR, RL."
      }
    ],
    mcqs: [
      {
        question: "Which data structure works on LIFO principle?",
        options: ["Queue", "Stack", "Tree", "Array"],
        correctIdx: 1,
        explanation: "Stack uses the Last In First Out (LIFO) policy, whereas Queue uses FIFO."
      },
      {
        question: "What is the worst-case search complexity in a standard BST?",
        options: ["O(1)", "O(log N)", "O(N)", "O(N log N)"],
        correctIdx: 2,
        explanation: "In the worst case (skewed tree), a BST behaves like a linked list, requiring O(N) operations."
      }
    ],
    viva: [
      {
        question: "What is the difference between Array and Linked List?",
        answer: "Arrays have fixed sizes and contiguous memory allocation, offering O(1) random access. Linked lists have dynamic sizes, non-contiguous allocation, and O(N) random access."
      },
      {
        question: "How do you implement a queue using stacks?",
        answer: "You can implement a queue using two stacks. For enqueue, push to Stack 1. For dequeue, pop from Stack 2. If Stack 2 is empty, transfer all elements from Stack 1 to Stack 2 first."
      }
    ],
    important: [
      "Address calculation for 1D and 2D arrays (Row/Column Major).",
      "Singly and Doubly Linked List node deletion algorithm.",
      "BST insertion and deletions.",
      "Kruskal's and Prim's algorithm for MST.",
      "Infix to Postfix conversion."
    ],
    labManual: [
      {
        title: "Experiment 1: Singly Linked List Insertion and Deletion",
        steps: [
          "1. Define a structure for Node containing data and next pointer.",
          "2. Implement insertAtBeginning(), insertAtEnd(), and insertAtPosition().",
          "3. Implement deleteNode().",
          "4. Run tests and print elements using traverse()."
        ],
        codeSnippet: `struct Node {
    int data;
    Node* next;
};
void insertAtBeginning(Node** head, int val) {
    Node* newNode = new Node();
    newNode->data = val;
    newNode->next = *head;
    *head = newNode;
}`
      }
    ]
  },
  {
    id: "oops",
    code: "BCS-302",
    name: "Object Oriented Programming (C++)",
    semester: 3,
    chapters: [
      {
        title: "Chapter 1: Principles of OOP",
        content: "Objects, Classes, Data Encapsulation, Data Abstraction, Inheritance, Polymorphism, Dynamic Binding, Message Passing. OOP solves procedural limitations."
      },
      {
        title: "Chapter 2: Constructors and Destructors",
        content: "A constructor is a special member function used to initialize objects. Types: Default, Parameterized, Copy Constructor. Destructors release resources when objects go out of scope."
      }
    ],
    pyqs: [
      {
        year: 2024,
        question: "Explain Virtual Functions and Pure Virtual Functions with examples.",
        answer: "Virtual functions enable runtime polymorphism in C++. A pure virtual function is a function declared in a base class with '= 0' and has no implementation, making the class abstract. Derived classes must override it."
      }
    ],
    mcqs: [
      {
        question: "Which specifier makes members accessible only in the same class and its child classes?",
        options: ["private", "public", "protected", "default"],
        correctIdx: 2,
        explanation: "'protected' allows access within the class hierarchy, whereas 'private' restricts access entirely to the declaring class."
      }
    ],
    viva: [
      {
        question: "What is a Friend Function?",
        answer: "A friend function is a non-member function of a class that is granted permission to access the private and protected members of that class."
      }
    ],
    important: [
      "Runtime Polymorphism vs Compile-time Polymorphism.",
      "Copy Constructor and Shallow vs Deep Copy.",
      "Virtual Destructor requirement in base classes.",
      "Friend function and Friend class."
    ]
  },
  
  // Semester 4
  {
    id: "daa",
    code: "BCS-401",
    name: "Design & Analysis of Algorithms",
    semester: 4,
    chapters: [
      {
        title: "Chapter 1: Asymptotic Notations",
        content: "Big Oh (O) for upper bound, Omega (Ω) for lower bound, and Theta (Θ) for tight bound. Recurrence relations solving via Master Theorem."
      },
      {
        title: "Chapter 2: Greedy & Dynamic Programming",
        content: "Greedy: Fractional Knapsack, Huffman Coding, Dijkstra. Dynamic Programming: 0/1 Knapsack, Matrix Chain Multiplication, Longest Common Subsequence (LCS)."
      }
    ],
    pyqs: [
      {
        year: 2024,
        question: "State and prove Master's Theorem for solving recurrence relations.",
        answer: "Master Theorem solves recurrences of the form T(n) = aT(n/b) + f(n), where a >= 1 and b > 1. Compare f(n) with n^(log_b(a)) in 3 cases to determine bounds."
      }
    ],
    mcqs: [
      {
        question: "What is the time complexity of binary search?",
        options: ["O(N)", "O(log N)", "O(N log N)", "O(1)"],
        correctIdx: 1,
        explanation: "Binary search divides the search space in half at each step, yielding a runtime of O(log N)."
      }
    ],
    viva: [
      {
        question: "What is the difference between Greedy and Dynamic Programming?",
        answer: "Greedy makes the locally optimal choice at each step hoping for a global optimum, without re-evaluating. Dynamic Programming solves all subproblems once, stores them, and uses them to construct a global optimum."
      }
    ],
    important: [
      "Master's Theorem cases and proofs.",
      "Matrix Chain Multiplication DP algorithm.",
      "Dijkstra's Algorithm and Bellman-Ford comparisons.",
      "NP-Complete and NP-Hard explanations."
    ]
  },
  {
    id: "os",
    code: "BCS-402",
    name: "Operating Systems",
    semester: 4,
    chapters: [
      {
        title: "Chapter 1: Process Management",
        content: "Processes, Threads, PCB, CPU Scheduling (FCFS, SJF, Priority, Round Robin). Inter-Process Communication, Race conditions, Critical Section problem."
      },
      {
        title: "Chapter 2: Deadlocks",
        content: "Deadlock conditions (Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait). Banker's Algorithm for deadlock avoidance."
      }
    ],
    pyqs: [
      {
        year: 2024,
        question: "Explain Banker's Algorithm with an example of safe sequence calculations.",
        answer: "Banker's Algorithm is a resource allocation and deadlock avoidance algorithm. It determines if allocating resources leaves the system in a safe state by calculating Need = Max - Allocation and checking if Work >= Need."
      }
    ],
    mcqs: [
      {
        question: "Which of the following scheduling algorithms can lead to starvation?",
        options: ["Round Robin", "FCFS", "Shortest Job First (SJF)", "None of these"],
        correctIdx: 2,
        explanation: "SJF can cause starvation for longer jobs if short jobs keep arriving continuously."
      }
    ],
    viva: [
      {
        question: "What is Thrashing?",
        answer: "Thrashing occurs when the operating system spends more time swapping pages in and out of virtual memory than executing actual instructions."
      }
    ],
    important: [
      "CPU Scheduling numericals (Gantt charts, Waiting time).",
      "Banker's Algorithm safe sequence numerical.",
      "Page Replacement Algorithms (FIFO, LRU, Optimal).",
      "Producer-Consumer problem using Semaphores."
    ]
  },
  
  // Semester 5
  {
    id: "dbms",
    code: "BCS-501",
    name: "Database Management Systems",
    semester: 5,
    chapters: [
      {
        title: "Chapter 1: ER Modeling and Relational Algebra",
        content: "Entities, Attributes, Relationships. Operations in Relational Algebra: Selection, Projection, Join, Cartesian Product."
      },
      {
        title: "Chapter 2: Normalization",
        content: "Data anomalies. 1NF (atomic values), 2NF (no partial dependency), 3NF (no transitive dependency), BCNF (every determinant is superkey)."
      }
    ],
    pyqs: [
      {
        year: 2024,
        question: "Discuss 1NF, 2NF, 3NF, and BCNF with suitable relational examples.",
        answer: "1NF: Attributes must contain atomic values. 2NF: In 1NF and no non-prime attribute is partially dependent on any candidate key. 3NF: In 2NF and no non-prime attribute is transitively dependent on candidate keys. BCNF: For every FD X -> Y, X must be a super key."
      }
    ],
    mcqs: [
      {
        question: "Which clause is used to filter groups in SQL?",
        options: ["WHERE", "HAVING", "GROUP BY", "ORDER BY"],
        correctIdx: 1,
        explanation: "HAVING is used to filter records after aggregation (GROUP BY), whereas WHERE is used before aggregation."
      }
    ],
    viva: [
      {
        question: "What is a transaction and what are ACID properties?",
        answer: "A transaction is a logical unit of work. ACID stands for Atomicity, Consistency, Isolation, and Durability, ensuring reliable transaction execution."
      }
    ],
    important: [
      "Normalization numericals (finding candidate keys, check normal forms).",
      "Relational algebra operations.",
      "Conflict Serializability and recovery schedules.",
      "Index structures: B-Trees and B+ Trees."
    ]
  }
];

export const mockPlacement: PlacementItem[] = [
  {
    id: "p1",
    company: "TCS",
    category: "Technical",
    title: "TCS NQT Core Programming Questions",
    content: "Common questions include string manipulations (reversing words, checking palindrome, counting anagram groups), array sorting, GCD calculation, and binary search implementations. TCS NQT heavily scores on time complexity.",
    difficulty: "Medium"
  },
  {
    id: "p2",
    company: "Wipro",
    category: "Aptitude",
    title: "Wipro Elite Quantitative Mock",
    content: "Topics: Time and Work (Men, days, rates), Speed-Distance-Time (train crossing platform problems), Permutation & Combination, Simple & Compound Interest, Data Interpretation. Formulas:\n- Work = Efficiency * Time\n- Speed = Distance / Time",
    difficulty: "Medium"
  },
  {
    id: "p3",
    company: "Infosys",
    category: "Coding",
    title: "Infosys SP/DSE Coding Questions",
    content: "Infosys Specialist Programmer (SP) exams ask Dynamic Programming (like Edit Distance, Grid Path sums) and Graph algorithms (DFS, Dijkstra pathfinding). Problem example:\nGiven an array, find the maximum sum path with non-adjacent elements.",
    difficulty: "Hard"
  },
  {
    id: "p4",
    company: "Cognizant",
    category: "HR",
    title: "Cognizant GenC HR Interview Tips",
    content: "1. Tell me about yourself. (Focus on CSE projects and role-specific skills)\n2. Why do you want to join Cognizant?\n3. How do you handle conflicts in team projects?\n4. Are you ready to relocate?\nPrepare answers using the STAR method (Situation, Task, Action, Result).",
    difficulty: "Easy"
  }
];

export const mockProjects: ProjectMock[] = [
  {
    id: "proj1",
    title: "Student E-Governance Portal",
    description: "An automated academic management app for college administrators and students, built with React, Node.js, and PostgreSQL. It streamlines grade entry, attendance monitoring, and fee structures.",
    type: "Major",
    schema: "Users(id, name, email, role_id)\nStudentProfile(id, user_id, roll_no, semester)\nSubject(id, name, code)\nGrades(id, student_id, subject_id, sgpa)",
    githubUrl: "https://github.com/bput-cse/student-egov-portal",
    reportSummary: "This system replaces paper-based administration, minimizing verification times by 80%. Designed using MVC architecture and hosted securely."
  },
  {
    id: "proj2",
    title: "Smart Attendance using Geo-fencing",
    description: "A mobile-first web app that tracks classroom attendance by verifying the student's GPS location against the classroom's coordinates.",
    type: "Mini",
    schema: "Users(id, name, lat, lng)\nClassrooms(id, name, center_lat, center_lng, radius)\nAttendanceLog(id, user_id, classroom_id, timestamp)",
    githubUrl: "https://github.com/bput-cse/geo-attendance",
    reportSummary: "Uses HTML5 Geolocation APIs and custom radius checks to mark attendance securely, preventing proxy attendance markings."
  }
];
