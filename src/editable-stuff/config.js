// Navigation Bar SECTION
const navBar = {
  show: true,
};

// Main Body SECTION
const mainBody = {
  gradientColors: "#4484ce, #1ad7c0, #ff9b11, #9b59b6, #ff7f7f, #ecf0f1",
  firstName: "Faraz",
  middleName: "",
  lastName: "Ahmed Shaikh",
  message: " Passionate about changing the world with technology. ",
  icons: [
    {
      image: "fa-github",
      url: "https://github.com/farazahmed879",
    },
    {
      image: "fa-facebook",
      url: "https://www.facebook.com/faraz.ahmed879",
    },
    {
      image: "fa-instagram",
      url: "https://www.instagram.com/faraz.shaikh879/",
    },
    {
      image: "fa-linkedin",
      url: "https://www.linkedin.com/in/faraz-ahmed-shaikh-b147b6124/",
    },
    {
      image: "fa-twitter",
      url: "https://www.twitter.com/FarazAhmedSha18/",
    },
    {
      image: "fa-stack-overflow",
      url: "https://stackoverflow.com/users/6877527/faraz-shaikh",
    }
  ],
};

const about = {
  show: true,
  heading: "About Me",
  imageLink: require("../editable-stuff/faraz.jpg"),
  imageSize: 375,
  message:
    "Experienced Developer & Consultant with a demonstrated history of working in the computer software industry. Skilled in Android, Databases, Mobile Applications, Web Design, and Java. Strong consulting professional graduated from Indus University.",
  resume: "https://drive.google.com/file/d/1uH1ZWBrjlb9C4pIND6w3G33qmjLDYxjV/view?usp=sharing",
};

// PROJECTS SECTION
// Setting up project lenght will automatically fetch your that number of recently updated projects, or you can set this field 0 to show none.
//      i.e: reposLength: 0,
// If you want to display specfic projects, add the repository names,
//      i.e ["repository-1", "repo-2"]
const repos = {
  show: true,
  heading: "Recent Git Repositories",
  gitHubUsername: "farazahmed879", //i.e."johnDoe12Gh"
  reposLength: 4,
  specificRepos: [],
};

// Leadership SECTION
const leadership = {
  show: false,
  heading: "Leadership",
  message:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vitae auctor eu augue ut lectus arcu bibendum at varius. Libero justo laoreet sit amet cursus sit amet. Imperdiet dui accumsan sit amet nulla facilisi morbi. At auctor urna nunc id. Iaculis urna id volutpat lacus laoreet non curabitur gravida. Et magnis dis parturient montes nascetur ridiculus mus mauris. In nisl nisi scelerisque eu ultrices vitae auctor. Mattis nunc sed blandit libero volutpat sed cras ornare. Pulvinar neque laoreet suspendisse interdum consectetur libero.",
  images: [
    {
      img: require("../editable-stuff/faraz.jpg"),
      label: "First slide label",
      paragraph: "Nulla vitae elit libero, a pharetra augue mollis interdum."
    },
    {
      img: require("../editable-stuff/faraz.jpg"),
      label: "Second slide label",
      paragraph: "Nulla vitae elit libero, a pharetra augue mollis interdum."
    },
  ],
  imageSize: {
    width: "615",
    height: "450"
  }
};

// SKILLS SECTION
const skills = {
  show: true,
  heading: "Skills",
  hardSkills: [
    { name: "Angular", value: 90 },
    { name: "React", value: 30 },
    { name: "Dot Net", value: 85 },
    { name: "Data Structures", value: 85 },
    { name: "JavaScript", value: 90 },
    { name: "JQuery", value: 90 },
    { name: "HTML/CSS", value: 55 },
    { name: "SQL Database", value: 80 }
  ],
  softSkills: [
    { name: "Goal-Oriented", value: 80 },
    { name: "Collaboration", value: 90 },
    { name: "Positivity", value: 75 },
    { name: "Adaptability", value: 85 },
    { name: "Problem Solving", value: 75 },
    { name: "Empathy", value: 90 },
    { name: "Organization", value: 70 },
    { name: "Creativity", value: 90 },
  ],
  otherSkills: [
    { name: "Computer Academic Teaching", value: 80 },
    { name: "Cricket", value: 100 },
    { name: "Game Development", value: 30 },
    { name: "3D Animation", value: 30 },
    { name: "Graphics Designing", value: 40 },
    { name: "Chinese Language", value: 5 },
    { name: "Japanese Language", value: 20 },
    { name: "Creativity", value: 90 },
  ]
};

// GET IN TOUCH SECTION
const getInTouch = {
  show: true,
  heading: "Get In Touch",
  message:
    "I'm currently working with full-time Software Developer at Zone Delivery Service, If you want any service from me, or if you have any questions, or if you just want to say hi, please feel free to email me at",
  email: "farazahmedshaikh879@gmail.com",
};

const experiences = {
  show: true,
  heading: "Experiences",
  data: [
    {
      companyName: 'Zone Delivery Services',
      role: 'Software Developer',
      description: 'Work here as a software developer. Basically Zone is leading company based out of UAE which offers delivery related solutions to businesses, where my core resposibility to handle front-end developement of their All Web Portals.',
      companylogo: require('../assets/img/boeing.png'),
      date: 'Jan 2021 – Continue',
    },
    {
      companyName: 'TeachnologyPlex', 
      role: 'Full-Stack Developer',
      description: 'I worked here as a full-stack developer. TechnologyPlex is a project based sofware house. where my resposibilities to handle back-end on dotnet and front-end on angular and successfully done two main projects Rhithm and Sellution',
      companylogo: require('../assets/img/boeing.png'),
      date: 'Nov 2019 – Dec 2020',
    },
    {
      companyName: 'ClinarIT Sollution',
      role: 'Full-Stack Developer',
      description: 'Clinar IT Sollution is product based software house located in karachi. They had two Medical Project Clinical Pearl and Journal Club. I am the founder memeber to build this project. Core resposibilities to handle front-end on angular and back-end on dotnet',
      companylogo: require('../assets/img/boeing.png'),
      date: 'Mar 2018 –  Nov 2019',
    },
    // {
    //   companyName: 'FriendsBit',
    //   role: 'Full-Stack Developer',
    //   description: 'I worked here as a full-stack developer. FriendsBit is a project based sofware house. where my resposibilities to handle back-end on dotnet and front-end on angular & react and successfully done various projects.',
    //   companylogo: require('../assets/img/boeing.png'),
    //   date: 'Jan 2018 – Nov 2017',
    // },
    {
      companyName: 'TechnoLab360',
      role: 'Front-End Developer',
      description: 'Technolab360 is a product based software house. It start working here a front-end developer. It was most quality time i spend here and learned alot what i have. My core responsibilities are to create Web Pages on angular CRUD operations API integeration etc.',
      companylogo: require('../assets/img/dell.png'),
      date: 'Apr 2017 – Dec 2017',
    },
    {
      companyName: 'Indus University',
      role: 'Marketing Intern',
      description: 'I am supposed to be very lucky, where i studied and got offer from the same organization during my studies to be part of their staff as a marketing intern. Basically I used to create/edit videos and graphics designing.',
      companylogo: require('../assets/img/dell.png'),
      date: 'January 2017 - Apr 2017',
    },
   
    
   
  ]
}

const customProjects = {
  show: true,
  heading: "Projects",
  data: [
    {
      name: 'ScoreExec',
      description: 'Cricket Scoring Web App',
      companylogo: require('../assets/img/boeing.png'),
      frontEnd: 'React',
      backEnd: 'Dot Net',
      lang: [ {name: 'Angular' },{name: 'React' }]
    },
    {
      name: 'Rhithm',
      description: 'School-Based Mental Health.',
      companylogo: require('../assets/img/boeing.png'),
      frontEnd: 'Angular',
      backEnd: 'Dot Net',
      lang: [ {name: 'Angular'},{name: 'React' }]
    },
    {
      name: 'Earnonnet',
      description: 'Web Advertisement App',
      companylogo: require('../assets/img/boeing.png'),
      frontEnd: 'Angular',
      backEnd: 'Dot Net',
      lang: [ {name: 'Angular'},{name: 'React' }]
    },
    {
      name: 'Sellution',
      description: 'CRM Sales platform',
      companylogo: require('../assets/img/boeing.png'),
      frontEnd: 'Custome Js FW',
      backEnd: 'Dot Net',
      lang: [ {name: 'Angular'},{name: 'React' }]
    },
    {
      name: 'Journal Club',
      description: 'Medical Univeristy Portal',
      companylogo: require('../assets/img/boeing.png'),
      frontEnd: 'Angular',
      backEnd: 'Dot Net',
      lang: [ {name: 'Angular'},{name: 'React' }]
    },
    {
      name: 'Trot Drive',
      description: 'Rider Booking Application',
      companylogo: require('../assets/img/boeing.png'),
      frontEnd: 'Angular',
      backEnd: 'Node Js',
      lang: [ {name: 'Angular'},{name: 'React' }]
    },
    {
      name: 'MMC HR',
      description: 'Human Resource Outsourcing (HRO) & Consulting',
      companylogo: require('../assets/img/boeing.png'),
      frontEnd: 'Razor',
      backEnd: 'Dot Net MVC',
      lang: [ {name: 'Angular'},{name: 'React' }]
    },
    {
      name: 'SGS-Vendor-Compliances',
      description: 'Multi-Tenant Application (SaaS)',
      companylogo: require('../assets/img/boeing.png'),
      frontEnd: 'Angular Js',
      backEnd: 'Dot Net',
      lang: [ {name: 'Angular'},{name: 'React' }]
    },
  ]
}

// Blog SECTION
// const blog = {
//   show: false,
// };

export { navBar, mainBody, about, repos, skills, leadership, getInTouch, experiences,customProjects };
