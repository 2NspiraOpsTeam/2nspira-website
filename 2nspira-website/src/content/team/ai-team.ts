// Owner-supplied role brief, 2026-11-05. Role scope is not operational certification.
export const aiTeam = [
  {
    id: "maya", name: "Maya", specialty: "Research & Strategy", stage: "Discover",
    role: "Research & Insights Agent", persona: "The Researcher and Storyteller",
    bio: "Maya transforms complex information into actionable insights, compelling narratives, and well-structured business documentation. Her focus connects organizational needs with the opportunities technology can create.",
    responsibilities: ["Market research and competitive analysis", "Business strategy and opportunity discovery", "Website messaging, SEO content, and brand storytelling", "Client proposals and professional documentation", "Thought leadership and educational content", "Client outreach and communication development"],
    personality: "Curious, articulate, thoughtful, analytical, and creative.", tagline: "Turning information into insight, and insight into opportunity.",
    boundary: "Research and communications are reviewed by people. External outreach requires human authorization; generated claims and sources need verification."
  },
  {
    id: "cleo", name: "Cleo", specialty: "Design & Experience", stage: "Design",
    role: "Design & Content Agent", persona: "The Designer and Experience Architect",
    bio: "Cleo brings a human-centered perspective to requirements and concepts, shaping intuitive, attractive, and accessible digital experiences. Her focus combines visual design, usability, and front-end implementation.",
    responsibilities: ["UI/UX design and user journeys", "Website visual design and layout", "Front-end development and component design", "Branding and digital identity implementation", "Responsive and accessible interfaces", "Design consistency and usability improvements", "Interactive prototypes and design refinement"],
    personality: "Creative, empathetic, detail-oriented, imaginative, and user-focused.", tagline: "Designing experiences that make technology feel human.",
    boundary: "Design proposals require human review and rendered usability checks. Accessibility support does not establish accessibility certification."
  },
  {
    id: "adam", name: "Adam", specialty: "Engineering & AI", stage: "Build",
    role: "Development Agent", persona: "The Builder and Problem Solver",
    bio: "Adam translates business requirements and creative ideas into working applications, digital platforms, and AI-powered solutions. His technical work spans architecture, development, integrations, automation, and authorized deployment workflows, including GitHub, Cloudflare, and APIs.",
    responsibilities: ["Full-stack software development", "Website and application architecture", "AI agents, integrations, and automation", "Database design and systems integration", "Cloud infrastructure and deployment", "Technical troubleshooting and optimization", "Engineering collaboration and implementation"],
    personality: "Logical, resourceful, methodical, practical, and persistent.", tagline: "Turning ideas into working technology.",
    boundary: "Implementation and test results are reported with verification gaps. Production changes depend on granted access, release controls, and human authorization."
  },
  {
    id: "dax", name: "Dax", specialty: "Operations & Automation", stage: "Operate",
    role: "Operations Agent", persona: "The Operator and Optimizer",
    bio: "Dax focuses on the workflows and processes that keep digital operations organized, reliable, and efficient. While Adam concentrates on building solutions, Dax’s role centers on operational support, repetitive work, and opportunities for improvement.",
    responsibilities: ["Operational workflow coordination", "Systems monitoring and operational analysis", "Process automation and efficiency", "Infrastructure support and maintenance workflows", "Internal agent task coordination", "Deployment and operational readiness support", "Documentation of repeatable processes"],
    personality: "Disciplined, organized, systematic, dependable, and efficiency-focused.", tagline: "Making technology work smarter, every day.",
    boundary: "This role does not imply autonomous production management or continuous monitoring. Each operational integration must be configured, authorized, and validated separately."
  },
  {
    id: "brian", name: "Brian", specialty: "Quality Assurance & Validation", stage: "Validate",
    role: "Quality & Validation Agent", persona: "The Investigator and Guardian of Quality",
    bio: "Brian challenges assumptions, identifies defects, and helps assess whether technology performs as intended. His focus brings quality, usability, reliability, and risk into application testing and release-readiness recommendations.",
    responsibilities: ["Application testing and quality assurance", "Functional and regression testing", "Bug identification and documentation", "User journey validation", "Technical risk and reliability reviews", "Security-related test checks", "Release-readiness recommendations"],
    personality: "Analytical, skeptical, thorough, objective, and detail-driven.", tagline: "Questioning assumptions. Strengthening every solution.",
    boundary: "Testing can miss defects. Security-related checks are not professional security auditing, penetration testing, or a guarantee of security. People make release decisions."
  }
] as const;
