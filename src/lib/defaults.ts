import type { Experience, Profile, Project, SkillCategory, SiteContent, Story, StoryPassion, StorySpotlight } from "./types";

export const storyIntro =
  "I'm Faraz — a developer by profession, but that's only one chapter of who I am. Outside of work you'll find me in the gym, planning my next trip, reading about history, or studying and researching Islamic knowledge. I'm also a lifelong cricket lover and a teacher at heart.\n\nThis page is the bigger picture: what I believe in, what I care about, and where I'm heading next.";

/** The big parts of life shown as featured "pillar" cards on the story page. */
export const pillarPassions: StoryPassion[] = [
  {
    emoji: "✈️",
    title: "Travelling",
    description: "Exploring new places, cultures and people — every journey teaches me something new.",
    details:
      "I love discovering new cities, trying local food and hearing people's stories. Travelling keeps me humble and curious, and reminds me how big and beautiful this world is.",
  },
  {
    emoji: "🏛️",
    title: "History",
    description: "I'm fascinated by the past — the civilisations, people and ideas that shaped the world we live in.",
    details:
      "From ancient empires to the golden age of Islamic science, I love understanding how events connect across centuries. History gives me perspective on the present and lessons for the future.",
  },
  {
    emoji: "🕌",
    title: "Islamic knowledge & research",
    description: "Learning and researching my Deen is one of the most important parts of my life.",
    details:
      "I spend time studying the Quran, Hadith and Seerah, and researching topics in depth from authentic sources. Seeking knowledge keeps me grounded, gives my life purpose, and shapes how I treat people and how I work.",
  },
];

/** The headline parts of life, shown as big panels near the top of the story page. */
const para = (...p: string[]) => p.join("\n\n");
const each = (...l: string[]) => l.join("\n");

export const defaultSpotlights: StorySpotlight[] = [
  {
    emoji: "🏋️",
    eyebrow: "Daily discipline",
    title: "Health & *fitness*",
    text: para(
      "The gym is a non-negotiable part of my day. Training is where I build patience, consistency and the discipline that carries into my work, my studies and my family life.",
      "I treat health as a long game — regular workouts, eating well, sleeping properly and staying active on the cricket field — because a strong body keeps the mind sharp."
    ),
    points: each(
      "Training in the gym consistently",
      "Eating clean and fuelling properly",
      "Staying fit for cricket",
      "Discipline that carries into everything else"
    ),
    quotes: each(
      "The strong believer is better and more beloved to Allah than the weak believer, while there is good in both. — Prophet Muhammad ﷺ (Sahih Muslim)",
      "Take care of your body. It's the only place you have to live. — Jim Rohn",
      "Strength does not come from winning. Your struggles develop your strengths. — Arnold Schwarzenegger",
      "We are what we repeatedly do. Excellence, then, is not an act, but a habit. — Will Durant"
    ),
  },
  {
    emoji: "🚁",
    eyebrow: "MS thesis · Iqra University",
    title: "An *agentic AI* drone",
    text: para(
      "For my MS in Computer Science (AI), I'm building an agentic, gesture-controlled drone. Traditional drones just follow commands; mine is designed to understand the situation and make its own safety decisions.",
      "You fly it with hand gestures, it recognises who its pilot is, and it detects obstacles to avoid collisions on its own — aiming for safer, more natural human–drone interaction."
    ),
    points: each(
      "Hand-gesture flight control with computer vision (MediaPipe)",
      "Face-authenticated pilot using ArcFace embeddings",
      "Obstacle detection with time-of-flight sensors",
      "Autonomous safety decisions — agentic AI",
      "Tested in a 3D flight simulator"
    ),
    quotes: "The best way to predict the future is to invent it. — Alan Kay",
  },
  {
    emoji: "🏏",
    eyebrow: "My first love",
    title: "Cricket is my *game*",
    text: para(
      "Cricket has been part of my life for as long as I can remember. I play it, I follow every big match, and it has taught me more about teamwork, patience and handling pressure than anything else.",
      "It's also where my two worlds meet: I build software for the game I love — ScoreExec for live scoring, Highlight Studio for match graphics, and Captains Portal for running a team."
    ),
    points: each(
      "Playing whenever I get the chance",
      "Following every big match",
      "Built ScoreExec, Highlight Studio & Captains Portal",
      "Teamwork and calm under pressure"
    ),
    quotes: each(
      "Fight like cornered tigers. — Imran Khan, 1992 World Cup",
      "Chase your dreams, because dreams do come true. — Sachin Tendulkar"
    ),
  },
  {
    emoji: "👨‍🏫",
    eyebrow: "Giving back",
    title: "Teaching & *mentoring*",
    text: para(
      "Teaching computer science is one of the most rewarding things I do. Breaking a hard idea into simple steps — and seeing it finally click for a student — is the best feeling there is.",
      "Whether it's in a classroom, mentoring a junior developer on my team, or explaining a concept to a friend, sharing knowledge is how I give back."
    ),
    points: each("Teaching computer science", "Mentoring junior developers", "Making hard concepts simple"),
    quotes: each(
      "When one teaches, two learn. — Robert Heinlein",
      "When a person dies, their deeds end except for three: ongoing charity, beneficial knowledge, or a righteous child who prays for them. — Prophet Muhammad ﷺ (Sahih Muslim)"
    ),
  },
];

/** Draft content for the /career page — meant to be rewritten in your own words from the admin panel. */
export const defaultStory: Story = {
  enabled: true,
  navLabel: "My Story",
  eyebrow: "Beyond the code",
  title: "The person behind the *developer*",
  intro: storyIntro,
  quote: "Passionate about changing the world with technology.",
  quoteAuthor: "My personal motto",
  spotlights: defaultSpotlights,
  chapters: [
    {
      year: "2017",
      title: "First steps",
      description:
        "While still studying Computer Science at Indus University, I joined Techno Lab 360 as a junior full-stack developer intern — working with AngularJS and .NET Core, and falling in love with building for the web.",
    },
    {
      year: "2018",
      title: "Silver medal & building from zero",
      description:
        "I graduated as a *Silver Medalist* — after building a 3D co-op zombie shooting game as my final year project — and joined Clinar IT Solutions to build medical and healthcare platforms with .NET Core and Angular.",
    },
    {
      year: "2019",
      title: "Going full-stack",
      description:
        "At Technology-Plex I engineered REST APIs with .NET Core, integrated SignalR, Pusher, Stripe and Hangfire, and delivered products like Rhithm and Sellution.",
    },
    {
      year: "2021",
      title: "Going global",
      description:
        "I joined Zone Delivery Service, a UAE fleet logistics company, where I led the development of their web applications with React and Angular until 2024.",
    },
    {
      year: "2024",
      title: "Leading the front-end",
      description:
        "I became *Front-End Lead* at Jami Partners — architecting enterprise platforms with React and Next.js, from the Future of Work and Healthy Longevity Compass Navigators to an Islamic Shariah-compliant fintech product.",
    },
    {
      year: "2025",
      title: "Back to the classroom",
      description:
        "I started my MS in Computer Science, specialising in AI, at Iqra University — my thesis is an agentic AI drone that detects obstacles.",
    },
    {
      year: "Today",
      title: "Building my own ideas",
      description:
        "Beyond my day job, I'm combining my two biggest loves — cricket and code — in ScoreExec, a cricket scoring and match-management platform.",
    },
  ],
  education: [
    {
      institution: "Iqra University",
      degree: "MS in Computer Science (Specialization in AI)",
      period: "Jan 2025 — Present",
      description: "Currently pursuing my MS, with ongoing thesis work on an agentic AI drone for obstacle detection.",
    },
    {
      institution: "Indus University",
      degree: "BS in Computer Science",
      period: "Graduated Feb 2018",
      description:
        "Awarded Silver Medalist for academic excellence. Founding Member & Finance Secretary of the ACM Student Chapter. Final year project: a 3D co-op zombie shooting game.",
    },
    {
      institution: "Government Degree National College, Karachi",
      degree: "Intermediate (Pre-Engineering)",
      period: "2012",
      description: "",
    },
    {
      institution: "Shaheen Secondary School",
      degree: "Matriculation",
      period: "2009",
      description: "",
    },
  ],
  passions: [
    ...pillarPassions,
    { emoji: "🤖", title: "Artificial intelligence", description: "From my MS thesis on agentic AI drones to AI-driven features at work, I love building software that thinks." },
    { emoji: "🎮", title: "Games & 3D", description: "My final year project was a 3D co-op zombie shooter — game development is still my playground for ideas." },
    { emoji: "🌏", title: "Languages", description: "Urdu is my mother tongue, English my working language, and I'm learning Japanese and Dutch." },
    { emoji: "💡", title: "Tech for good", description: "I care about technology that genuinely improves people's lives, from healthcare to Islamic finance." },
  ],
  funFacts: [
    "Silver Medalist in my BS Computer Science",
    "Founding member of my university's ACM chapter",
    "Built a 3D co-op zombie shooter as my final year project",
    "Working on an AI drone that avoids obstacles on its own",
    "Learning Japanese and Dutch",
    "Built a cricket scoring app because I love the game",
  ],
  goals: [
    { horizon: "Now", title: "Finish my MS in AI", description: "Complete my thesis on agentic AI drones and bring more AI into the products I build." },
    { horizon: "Next", title: "Launch my own products", description: "Turn side projects like ScoreExec into products that people use every day." },
    { horizon: "Someday", title: "Give back", description: "Teach and mentor the next generation of developers in Pakistan and beyond." },
  ],
  dreamTitle: "To *change the world* with technology",
  dreamText:
    "My dream is to build something that outlives me — products that make everyday life easier for millions of people, and a team where young developers can grow the way I was given the chance to grow.",
  gallery: [],
  connectTitle: "Let's be friends",
  connectText: "Whether it's about tech, cricket, or a cool idea — I'd love to hear from you. Find me on any of these.",
};

/** Initial content — written to MongoDB the first time the site connects to an empty database. */
export const defaultProfile: Profile = {
  name: "Faraz Ahmed Shaikh",
  shortName: "Faraz",
  roles: ["Front-End Lead", "Full-Stack Developer", "React & Next.js Engineer", ".NET Core Developer", "AI Enthusiast"],
  tagline: "Passionate about changing the world with technology.",
  availableForWork: true,
  availabilityText: "Open to new opportunities",
  photo: "/images/faraz.jpg",
  aboutHeading: "Crafting reliable web products, end to end.",
  bio:
    "I'm an adaptable and responsible software developer with 9+ years of experience in full-stack and front-end development. Today I'm the Front-End Lead at Jami Partners, architecting enterprise platforms with React and Next.js. Before that, I spent over three years leading web development for Zone Delivery Service, a UAE fleet logistics company.\n\nI work across the whole stack — React, Next.js, Angular and Vue on the front-end; .NET Core, C#, Node.js and Python on the back-end; SQL Server, PostgreSQL, MySQL and MongoDB for data; and AWS, Azure, DigitalOcean and Docker to ship it. I'm a Silver Medalist in Computer Science from Indus University and I'm now pursuing an MS in Computer Science, specialising in AI, at Iqra University.",
  location: "Karachi, Pakistan",
  resumeUrl: "https://drive.google.com/file/d/1uH1ZWBrjlb9C4pIND6w3G33qmjLDYxjV/view?usp=sharing",
  stats: [
    { value: "9+", label: "Years of experience" },
    { value: "5", label: "Companies" },
    { value: "15+", label: "Products shipped" },
  ],
  email: "farazahmedshaikh879@gmail.com",
  contactHeading: "Let's build something great together.",
  contactMessage:
    "I'm currently the Front-End Lead at Jami Partners. If you need my services, have a question, or just want to say hi — my inbox is always open.",
  socials: [
    { platform: "github", url: "https://github.com/farazahmed879" },
    { platform: "linkedin", url: "https://www.linkedin.com/in/faraz-ahmed-shaikh-b147b6124/" },
    { platform: "stackoverflow", url: "https://stackoverflow.com/users/6877527/faraz-shaikh" },
    { platform: "twitter", url: "https://www.twitter.com/FarazAhmedSha18/" },
    { platform: "instagram", url: "https://www.instagram.com/faraz.shaikh879/" },
    { platform: "facebook", url: "https://www.facebook.com/faraz.ahmed879" },
  ],
  githubUsername: "farazahmed879",
  githubRepoCount: 6,
  sections: { about: true, experience: true, projects: true, github: true, skills: true, contact: true },
  seoTitle: "Faraz Ahmed Shaikh — Front-End Lead & Full-Stack Developer",
  seoDescription:
    "Portfolio of Faraz Ahmed Shaikh, a Front-End Lead and full-stack developer building web products with React, Next.js, Angular and .NET Core.",
};

export const defaultExperiences: Experience[] = [
  {
    company: "Jami Partners",
    role: "Front-End Lead",
    period: "Sept 2024 — Present",
    location: "",
    description:
      "I spearhead front-end architecture and interface design for core enterprise platforms built with React and Next.js.",
    highlights: [
      "Developed the Global Future of Work Compass Navigator — an intuitive, user-centric workplace analytics interface.",
      "Built the FII Healthy Longevity Compass Navigator, integrating complex data visualisation tools for health management tracking.",
      "Designed FII-CMI (Future of Work Part 2) with an integrative interface updated with new data sources.",
      "Developed the FFI-ACI portal, using custom data structures to deliver tailored analytical insights.",
      "Architected an Islamic Shariah-compliant fintech project tailored for Islamic banking workflows.",
      "Engineered the Jami Connect internal portal: client/internal ticketing, AI-driven resume parsing and search, and a timesheet module with interview scheduling.",
      "Built a Pool Management System for resource and operational tracking.",
      "Contributed to the Salla platform front-end and created the e-commerce interface for Osma Perfume.",
    ],
    tech: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Data Visualisation", "AI"],
    logo: "",
    order: 0,
  },
  {
    company: "Zone Delivery Service",
    role: "Lead Software Developer",
    period: "Jan 2021 — Aug 2024",
    location: "UAE (Remote)",
    description:
      "I developed and maintained scalable end-to-end web applications for UAE fleet logistics operations.",
    highlights: [
      "Built and maintained end-to-end web applications with React.js and Angular.",
      "Worked with cross-functional teams to turn logistics requirements into high-performance web and mobile solutions.",
    ],
    tech: ["React", "Angular", "Spring Boot", "AWS"],
    logo: "",
    order: 1,
  },
  {
    company: "Technology-Plex",
    role: "Full-Stack Software Developer",
    period: "Nov 2019 — Dec 2020",
    location: "Karachi",
    description:
      "A project-based software house where I built .NET Core back-ends and Angular front-ends, delivering products like Rhithm and Sellution.",
    highlights: [
      "Engineered REST APIs with .NET Core and integrated SignalR, Pusher, Stripe and Hangfire jobs.",
      "Built responsive, pixel-precise Angular UIs matching client designs in an Agile team.",
    ],
    tech: [".NET Core", "Angular", "SignalR", "Stripe", "Hangfire", "SQL Server"],
    logo: "",
    order: 2,
  },
  {
    company: "Clinar IT Solutions",
    role: "Full-Stack Software Developer",
    period: "Mar 2018 — Nov 2019",
    location: "Karachi",
    description:
      "A product company building medical and healthcare platforms such as Clinical Pearl and Journal Club.",
    highlights: [
      "Designed .NET Core 2 back-end services and Angular 7 front-ends for healthcare platforms.",
      "Gathered requirements from medical domain experts to build optimised UI workflows and data handling.",
    ],
    tech: [".NET Core", "Angular", "SQL Server"],
    logo: "",
    order: 3,
  },
  {
    company: "Techno Lab 360",
    role: "Junior Full-Stack Developer Intern",
    period: "Apr 2017 — Nov 2017",
    location: "Karachi",
    description:
      "My first engineering role — full-stack development with AngularJS and .NET Core, following clean code standards and software patterns.",
    highlights: [],
    tech: ["AngularJS", ".NET Core"],
    logo: "",
    order: 4,
  },
];

export const defaultProjects: Project[] = [
  {
    name: "Future of Work Compass",
    subtitle: "Global workplace analytics navigator",
    description:
      "An intuitive, user-centric interface for exploring global workplace analytics — the Global Future of Work Compass Navigator, built at Jami Partners.",
    image: "",
    link: "",
    repo: "",
    tags: ["React", "Next.js", "Data Visualisation"],
    featured: true,
    order: 0,
  },
  {
    name: "Healthy Longevity Compass",
    subtitle: "FII health tracking navigator",
    description:
      "The FII Healthy Longevity Compass Navigator — complex data visualisation tools that help people track and optimise their health.",
    image: "",
    link: "",
    repo: "",
    tags: ["React", "Next.js", "Data Visualisation"],
    featured: true,
    order: 1,
  },
  {
    name: "Jami Connect",
    subtitle: "Internal company portal",
    description:
      "An internal portal with client and internal ticketing, AI-driven resume parsing and search, and a timesheet module with interview scheduling.",
    image: "",
    link: "",
    repo: "",
    tags: ["React", "Next.js", "AI"],
    featured: true,
    order: 2,
  },
  {
    name: "Shariah Fintech",
    subtitle: "Islamic banking compliance",
    description:
      "A fintech product built for Islamic Shariah compliance, tailored to Islamic banking workflows.",
    image: "",
    link: "",
    repo: "",
    tags: ["React", "Next.js", "Fintech"],
    featured: true,
    order: 3,
  },
  {
    name: "ScoreExec",
    subtitle: "Cricket scoring web app",
    description: "Live cricket scoring and match management, built with React and Ant Design on a .NET and SQL Server back-end.",
    image: "/images/projects/scoreexec.png",
    link: "https://www.scoreexec.com",
    repo: "",
    tags: ["React", ".NET", "SQL Server", "Ant Design"],
    featured: true,
    order: 4,
  },
  {
    name: "Highlight Studio",
    subtitle: "Cricket match graphics generator",
    description:
      "Turns match data into social-media-ready graphics — 25+ templates for match highlights, team squads, man of the match and achievements, an AI copilot (Claude or Gemini) that fills them in, and one-click PNG/JPEG export. Includes accounts with trial and Pro plans and an admin panel.",
    image: "",
    link: "",
    repo: "",
    tags: ["Next.js", "React", "TypeScript", "MongoDB", "AI", "Tailwind CSS"],
    featured: true,
    order: 5,
  },
  {
    name: "Captains Portal",
    subtitle: "Cricket team management for captains",
    description:
      "Replaces the team spreadsheet: players, matches and tournaments, a per-player match-fee ledger, expenses, sponsors and tournament ROI, with profit & loss reports and scheduled backups. Multi-tenant, with JWT auth.",
    image: "",
    link: "",
    repo: "https://github.com/farazahmed879/captains-portal",
    tags: ["Next.js", "Node.js", "Express", "TypeScript", "MongoDB", "Docker"],
    featured: true,
    order: 6,
  },
  {
    name: "MSP",
    subtitle: "Custom CRM",
    description: "A custom CRM platform for delivery operations, built on a React front-end with a Spring Boot API on AWS.",
    image: "/images/projects/zone.png",
    link: "https://ridersouq.com/login/",
    repo: "",
    tags: ["React", "Spring Boot", "Material UI", "AWS", "MongoDB"],
    featured: true,
    order: 7,
  },
  {
    name: "FII-CMI",
    subtitle: "Future of Work — Part 2",
    description:
      "The second chapter of the Future of Work platform, with an integrative interface updated with new data sources.",
    image: "",
    link: "",
    repo: "",
    tags: ["React", "Next.js", "Data Visualisation"],
    featured: false,
    order: 8,
  },
  {
    name: "FFI-ACI",
    subtitle: "Analytical insights portal",
    description:
      "A portal built on custom data structures that delivers tailored analytical insights.",
    image: "",
    link: "",
    repo: "",
    tags: ["React", "Next.js", "Data Visualisation"],
    featured: false,
    order: 9,
  },
  {
    name: "Pool Management",
    subtitle: "Resource & operations tracking",
    description:
      "A complete pool management system for streamlined resource and operational tracking.",
    image: "",
    link: "",
    repo: "",
    tags: ["React", "Next.js"],
    featured: false,
    order: 10,
  },
  {
    name: "Osma Perfume",
    subtitle: "E-commerce storefront",
    description:
      "The online storefront for Osma Perfume — product browsing, cart and checkout.",
    image: "",
    link: "",
    repo: "",
    tags: ["React", "E-commerce"],
    featured: false,
    order: 11,
  },
  {
    name: "Salla",
    subtitle: "E-commerce platform",
    description:
      "Front-end development contributions to the Salla e-commerce platform.",
    image: "",
    link: "",
    repo: "",
    tags: ["React", "E-commerce"],
    featured: false,
    order: 12,
  },
  {
    name: "Dar Auctions",
    subtitle: "Property selling & purchasing",
    description: "An online property auction marketplace for buying and selling real estate.",
    image: "/images/projects/darauctions.png",
    link: "https://darauction.com/",
    repo: "",
    tags: ["Vue.js", "Tailwind CSS"],
    featured: false,
    order: 13,
  },
  {
    name: "Rhithm",
    subtitle: "School-based mental health",
    description: "A mental-health check-in platform for schools, helping educators understand how students are feeling.",
    image: "/images/projects/rhithm.png",
    link: "https://rhithm.app/",
    repo: "",
    tags: ["Angular", "Bootstrap", ".NET", "SQL Server"],
    featured: false,
    order: 14,
  },
  {
    name: "Sellution",
    subtitle: "CRM sales platform",
    description: "A sales CRM platform built with a custom JavaScript front-end framework and a .NET back-end.",
    image: "/images/projects/selllution.png",
    link: "https://www.sellution.com/",
    repo: "",
    tags: ["jQuery", ".NET"],
    featured: false,
    order: 15,
  },
  {
    name: "Journal Club",
    subtitle: "Medical university portal",
    description: "A learning portal for medical universities to run and share journal club sessions.",
    image: "/images/projects/jc.png",
    link: "https://journalclub.net/",
    repo: "",
    tags: ["Angular", ".NET", "SQL Server", "Material UI"],
    featured: false,
    order: 16,
  },
];

// Levels are self-ratings (0–100) — adjust them from the admin panel.
export const defaultSkills: SkillCategory[] = [
  {
    title: "Frontend",
    order: 0,
    skills: [
      { name: "React", level: 92 },
      { name: "Next.js", level: 90 },
      { name: "TypeScript", level: 88 },
      { name: "JavaScript", level: 92 },
      { name: "Angular", level: 90 },
      { name: "Vue.js", level: 70 },
      { name: "Tailwind CSS", level: 85 },
      { name: "HTML / CSS", level: 90 },
      { name: "Bootstrap", level: 85 },
      { name: "jQuery / AJAX", level: 85 },
    ],
  },
  {
    title: "Backend",
    order: 1,
    skills: [
      { name: ".NET Core", level: 88 },
      { name: "C#", level: 88 },
      { name: "Node.js", level: 75 },
      { name: "Python", level: 65 },
    ],
  },
  {
    title: "Databases",
    order: 2,
    skills: [
      { name: "MS SQL Server", level: 88 },
      { name: "PostgreSQL", level: 75 },
      { name: "MySQL", level: 75 },
      { name: "MongoDB", level: 78 },
    ],
  },
  {
    title: "Cloud & tools",
    order: 3,
    skills: [
      { name: "Git", level: 90 },
      { name: "AWS", level: 70 },
      { name: "Azure", level: 65 },
      { name: "DigitalOcean", level: 65 },
      { name: "Docker", level: 70 },
      { name: "React Native", level: 70 },
      { name: "AI-driven apps", level: 75 },
    ],
  },
  {
    title: "Soft skills",
    order: 4,
    skills: [
      { name: "Leadership", level: 85 },
      { name: "Collaboration", level: 90 },
      { name: "Adaptability", level: 90 },
      { name: "Responsibility", level: 90 },
      { name: "Problem solving", level: 85 },
      { name: "Creativity", level: 85 },
    ],
  },
  {
    title: "Languages",
    order: 5,
    skills: [
      { name: "Urdu (Native)", level: 100 },
      { name: "English (Professional)", level: 85 },
      { name: "Japanese (Basic)", level: 25 },
      { name: "Dutch (Basic)", level: 20 },
    ],
  },
  {
    title: "Beyond code",
    order: 6,
    skills: [
      { name: "Cricket", level: 100 },
      { name: "Computer Science Teaching", level: 80 },
      { name: "Game Development", level: 50 },
      { name: "Graphic Design", level: 40 },
    ],
  },
];

export const defaultContent: SiteContent = {
  profile: defaultProfile,
  experiences: defaultExperiences,
  projects: defaultProjects,
  skills: defaultSkills,
};
