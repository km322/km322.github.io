export const profileData = {
  name: "Ketan Mittal",
  title: "Software Engineer",
  avatar: "/professional-developer-avatar.png",
  email: "mittal.ketan1@gmail.com",
  phone: "925-997-3105",
  github: "https://github.com/km322",
  linkedin: "https://linkedin.com/in/ketan-mittal322",
  social: {
    github: "https://github.com/km322",
    linkedin: "https://linkedin.com/in/ketan-mittal322",
  },
}

export const aboutData = {
  description: [
    "I'm a Software Engineer from San Francisco, California, specializing in web development and creating innovative digital solutions. I enjoy turning complex problems into simple, beautiful and intuitive applications.",
    "My job is to build your website or application so that it is functional and user-friendly but at the same time attractive. Moreover, I add personal touch to your product and make sure that is eye-catching and easy to use. My aim is to bring across your message and identity in the most creative way. I've worked with various technologies including React, Next.js, Node.js, and modern cloud platforms.",
  ],
  services: [
    {
      icon: "Code",
      title: "Frontend Development",
      description: "Building modern, responsive web applications with React, Next.js, and TypeScript.",
    },
    {
      icon: "Zap",
      title: "Backend Development",
      description: "Creating robust APIs and server-side solutions with Node.js and modern frameworks.",
    },
    {
      icon: "Smartphone",
      title: "Mobile Development",
      description: "Professional development of mobile applications with React Native and modern tools.",
    },
    {
      icon: "PenTool",
      title: "UI/UX Design",
      description: "Designing intuitive and beautiful user interfaces that enhance user experience.",
    },
  ],
  testimonials: [
    {
      avatar: "/professional-man.jpg",
      name: "Daniel Lewis",
      text: "John was hired to create a corporate identity. We were very pleased with the work done. He has a lot of experience and is very concerned about the needs of client.",
    },
    {
      avatar: "/professional-woman-diverse.png",
      name: "Jessica Miller",
      text: "John was hired to create a corporate identity. We were very pleased with the work done. He has a lot of experience and is very concerned about the needs of client.",
    },
    {
      avatar: "/professional-man.jpg",
      name: "Michael Chen",
      text: "Outstanding work! John delivered a high-quality product that exceeded our expectations. His attention to detail is remarkable.",
    },
    {
      avatar: "/professional-woman-diverse.png",
      name: "Sarah Johnson",
      text: "Professional, creative, and highly skilled. John is the developer you want on your team for any complex project.",
    },
  ],
  clients: [
    { name: "TechCorp", logo: "/tech-company-logo.jpg" },
    { name: "StartupHub", logo: "/startup-logo.png" },
    { name: "DesignStudio", logo: "/design-agency-logo.png" },
    { name: "CodeLabs", logo: "/software-company-logo.png" },
    { name: "WebSolutions", logo: "/web-agency-logo.jpg" },
    { name: "AppMakers", logo: "/app-development-logo.jpg" },
  ],
}

export const resumeData = {
  education: [
    {
      title: "University of California, San Diego (UCSD)",
      period: "September 2023 – Present",
      description: "Bachelor of Science in Data Science | Minor in Mathematics, Minor in Cognitive Science | GPA: 3.97",
    },
  ],
  experience: [
    {
      title: "Software Engineering Intern",
      period: "June 2025 – Present",
      description:
        "Architected an MCP-powered agentic LLM on Microsoft Power Platform to automate real-time data queries and user support, enabling deployment across MS Teams and web apps for 100+ users and reducing resolution time by ~3 minutes per request. Built a Retrieval-Augmented Generation (RAG) framework for intelligent access to supply-chain data, combining 20+ optimized SQL stored procedures, Boomi APIs, and FedEx API integrations.",
    },
    {
      title: "Enterprise AI Intern",
      period: "May 2024 – May 2025",
      description:
        "Implemented GPT-4.1 in a Customer Service RAG-based Conversational AI, resulting in a 10x reduction in cost per LLM call, 52% faster call resolution times, and increasing model accuracy to 94%. Engineered parallelized RESTful microservices using Python and FastAPI, containerized with Docker and orchestrated via Kubernetes, implementing caching, load balancing, and CI/CD pipelines.",
    },
    {
      title: "Computer Vision Undergraduate Researcher",
      period: "March 2025 – Present",
      description:
        "Enhanced computer vision-based behavioral tracking for ALS detection in live mice by integrating Laplacian variance-based quality checks with OpenCV. Applied transformer architectures for time-series analysis using Keypoint MoSeq embeddings for early detection of ALS movement biomarkers in mice - identifying patterns up to 40 days before symptom onset.",
    },
    {
      title: "Engineering Manager",
      period: "November 2024 – Present",
      description:
        "Manage and support a team of over 8 developers on an active project by facilitating architectural decisions, code reviews, monitoring technical milestones, and aligning team efforts with organizational objectives. Collaborated with UCSD Health to develop an interactive, gamified e-bike safety certification website using Firebase and the MERN stack.",
    },
  ],
  languages: [
    { name: "Python", level: 95 },
    { name: "TypeScript", level: 90 },
    { name: "Java", level: 85 },
    { name: "SQL", level: 90 },
    { name: "JavaScript", level: 95 },
    { name: "C++", level: 80 },
    { name: "React", level: 95 },
    { name: "Next.js", level: 90 },
  ],
}

export const portfolioData = {
  categories: ["all", "web design", "applications", "web development"],
  projects: [
    {
      title: "E-Commerce Platform",
      category: "web development",
      image: "/modern-ecommerce-website.png",
      description: "Full-stack e-commerce solution with payment integration",
      tech: ["Next.js", "Node.js", "PostgreSQL"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/johndoe/ecommerce",
    },
    {
      title: "Task Management App",
      category: "applications",
      image: "/task-management-interface.png",
      description: "Collaborative task manager with real-time updates",
      tech: ["React", "Firebase", "TypeScript"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/johndoe/taskmanager",
    },
    {
      title: "Portfolio Website",
      category: "web design",
      image: "/minimalist-portfolio-design.jpg",
      description: "Modern portfolio design for creative professionals",
      tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/johndoe/portfolio",
    },
    {
      title: "Social Media Dashboard",
      category: "web development",
      image: "/analytics-dashboard.png",
      description: "Analytics dashboard with data visualization",
      tech: ["React", "D3.js", "Express"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/johndoe/dashboard",
    },
    {
      title: "Mobile Banking App",
      category: "applications",
      image: "/banking-app-interface.png",
      description: "Secure mobile banking application",
      tech: ["React Native", "Node.js", "MongoDB"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/johndoe/banking",
    },
    {
      title: "Restaurant Website",
      category: "web design",
      image: "/restaurant-website-design.png",
      description: "Elegant restaurant website with online ordering",
      tech: ["Next.js", "Sanity CMS", "Stripe"],
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/johndoe/restaurant",
    },
  ],
}

export const blogData = {
  posts: [
    {
      title: "Building Modern Web Applications with Next.js 15",
      category: "Development",
      date: "Mar 15, 2024",
      readTime: "8 min",
      image: "/web-development-coding.png",
      excerpt: "Deep dive into Next.js 15 features and App Router enhancements.",
      tags: ["Next.js", "React", "Web Development"],
      slug: "building-modern-web-apps-nextjs-15",
    },
    {
      title: "Microservices Architecture: A Complete Guide",
      category: "Architecture",
      date: "Mar 8, 2024",
      readTime: "12 min",
      image: "/software-architecture.jpg",
      excerpt: "Design scalable microservices with real-world examples.",
      tags: ["Architecture", "Backend", "DevOps"],
      slug: "microservices-architecture-guide",
    },
    {
      title: "The Art of UI/UX: Creating Delightful Experiences",
      category: "Design",
      date: "Feb 28, 2024",
      readTime: "6 min",
      image: "/ui-ux-design-concept.png",
      excerpt: "Principles of exceptional UI/UX design for interfaces users love.",
      tags: ["Design", "UI/UX", "Frontend"],
      slug: "art-of-uiux-delightful-experiences",
    },
    {
      title: "TypeScript Best Practices for Large-Scale Applications",
      category: "Development",
      date: "Feb 20, 2024",
      readTime: "10 min",
      image: "/web-development-coding.png",
      excerpt: "Master TypeScript patterns for maintainable, type-safe code.",
      tags: ["TypeScript", "JavaScript", "Best Practices"],
      slug: "typescript-best-practices",
    },
    {
      title: "Building Real-Time Applications with WebSockets",
      category: "Development",
      date: "Feb 12, 2024",
      readTime: "9 min",
      image: "/software-architecture.jpg",
      excerpt: "Implement real-time features using WebSockets and modern frameworks.",
      tags: ["WebSockets", "Real-time", "Backend"],
      slug: "realtime-apps-websockets",
    },
    {
      title: "Mastering CSS Grid and Flexbox Layouts",
      category: "Design",
      date: "Feb 5, 2024",
      readTime: "7 min",
      image: "/ui-ux-design-concept.png",
      excerpt: "Modern CSS layout techniques with practical examples.",
      tags: ["CSS", "Layout", "Frontend"],
      slug: "mastering-css-grid-flexbox",
    },
  ],
}

export const contactData = {
  email: "mittal.ketan1@gmail.com",
  phone: "925-997-3105",
}
