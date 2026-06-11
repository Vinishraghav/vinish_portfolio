export const portfolioData = {
  profile: {
    name: "VINISHRAGHAV K E",
    title: "Software Engineer | Full Stack Developer | Aspiring Cloud Engineer",
    avatarUrl: "/images/vinish_cyber.png", // Cyber-enhanced portrait
    bio: "Building scalable software, modern web applications, and cloud-ready systems. I enjoy solving real-world problems through scalable applications, cloud technologies, and modern development practices.",
    metadata: {
      location: "Coimbatore, India",
      education: "B.E CSE (AIML) - Sri Eshwar College of Engineering",
      cgpa: 7.91,
      batch: "2024-2028",
      status: "Open to Internships",
      milestones: [
        "SkillRack: 1000+ Solved",
        "LeetCode Rating: 1348",
        "Codeforces Rating: 654"
      ],
      focus_areas: ["Cloud Resume Challenge", "CI/CD Automation", "Linux Arch"]
    }
  },
  skills: {
    programming: ["Python", "Java", "JavaScript"],
    frontend: ["HTML", "CSS", "JavaScript", "Bootstrap", "Next.js", "Tailwind CSS"],
    backend_db: ["Flask", "REST APIs", "SQL", "SQLite", "PostgreSQL (Learning)"],
    cloud_devops: ["AWS", "Linux", "Cloud Computing", "IAM", "EC2", "S3", "Git", "GitHub"]
  },
  projects: [
    { 
      title: "Real-Time Transport Tracking", 
      stack: "Flutter · Firebase · Google Maps API", 
      desc: "Developed a cloud-synchronized mobile application providing GPS-based real-time bus tracking and route updates.", 
      github: "#" 
    },
    { 
      title: "Tour Van Booking Website", 
      stack: "Python · Flask · HTML · CSS · JS", 
      desc: "Built a web platform connecting tourists and vehicle owners with booking workflows and RBAC security systems.", 
      github: "#" 
    },
    { 
      title: "Credit Card Risk Management", 
      stack: "Python · Flask · Machine Learning", 
      desc: "Developed an ML risk engine forecasting credit card default metrics to guide dynamic automated lending evaluations.", 
      github: "#" 
    }
  ],
  certifications: [
    "AWS Certified Cloud Practitioner", 
    "Linux Foundation LFS101", 
    "IBM Python for Data Science and Machine Learning",
    "Johns Hopkins HTML, CSS, and JS for Web Developers",
    "Salesforce Certified Agentforce Specialist",
    "Oracle Java Foundations",
    "Cognitive Class SQL and Relational Databases 101",
    "Microsoft Security, Compliance and Identity"
  ],
  resumes: [
    { name: "Download_SWE_Resume.pdf", url: "#" },
    { name: "Download_FullStack_Resume.pdf", url: "#" },
    { name: "Download_CloudEng_Resume.pdf", url: "#" }
  ]
};
