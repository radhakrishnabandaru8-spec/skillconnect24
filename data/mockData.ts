import { User, Course, Job } from '../types';

export const MOCK_USER: User = {
  id: 'user-1',
  name: 'Alex Doe',
  email: 'test@skillconnect.io',
  password: 'password',
  bio: 'Full-stack developer with a passion for creating intuitive user experiences. Specializing in React, Node.js, and cloud technologies. Lifelong learner and tech enthusiast.',
  skills: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'UI/UX Design', 'Project Management'],
  education: [
    { institution: 'State University', degree: 'B.S. in Computer Science', year: '2020' },
  ],
  experience: [
    { company: 'Tech Solutions Inc.', role: 'Senior Frontend Developer', years: '2022-Present' },
    { company: 'Innovate Co.', role: 'Junior Web Developer', years: '2020-2022' },
  ],
  enrolledCourses: ['course-2'],
  completedCourses: [],
  courseProgress: { "course-2": [] },
};

export const MOCK_COURSES: Course[] = [
  {
    id: 'course-1',
    title: 'Modern Web Development Bootcamp',
    description: 'Master frontend and backend development with the MERN stack. Build real-world projects and launch your career as a full-stack developer.',
    duration: '12 Weeks',
    skillLevel: 'Beginner',
    tags: ['React', 'Node.js', 'MongoDB', 'Express'],
    curriculum: [
      { id: 'c1-1', topic: 'Introduction to HTML, CSS, & JavaScript', details: 'Covering the fundamentals of web development.' },
      { id: 'c1-2', topic: 'React & Modern Frontend', details: 'Deep dive into component-based architecture with React.' },
      { id: 'c1-3', topic: 'Node.js & Express for Backend', details: 'Building robust APIs and server-side logic.' },
      { id: 'c1-4', topic: 'MongoDB & Data Management', details: 'Understanding NoSQL databases and data modeling.' },
      { id: 'c1-5', topic: 'Full-Stack Project Deployment', details: 'Deploying your application to the cloud.' },
    ]
  },
  {
    id: 'course-2',
    title: 'Advanced Machine Learning',
    description: 'Dive deep into neural networks, deep learning, and reinforcement learning. This course is for those with a foundational knowledge of ML.',
    duration: '8 Weeks',
    skillLevel: 'Advanced',
    tags: ['Python', 'TensorFlow', 'AI', 'Deep Learning'],
     curriculum: [
      { id: 'c2-1', topic: 'Neural Networks Foundations', details: 'Understanding the building blocks of deep learning.' },
      { id: 'c2-2', topic: 'Convolutional Neural Networks (CNNs)', details: 'Mastering image recognition and analysis.' },
      { id: 'c2-3', topic: 'Recurrent Neural Networks (RNNs)', details: 'Working with sequential data and natural language.' },
      { id: 'c2-4', topic: 'Reinforcement Learning', details: 'Training agents to make optimal decisions.' },
    ]
  },
  {
    id: 'course-3',
    title: 'Data Science with Python',
    description: 'Learn to analyze data, create beautiful visualizations, and use powerful machine learning libraries like pandas, NumPy, and scikit-learn.',
    duration: '10 Weeks',
    skillLevel: 'Intermediate',
    tags: ['Python', 'Data Analysis', 'Pandas', 'NumPy'],
     curriculum: [
      { id: 'c3-1', topic: 'Data Wrangling with Pandas', details: 'Cleaning, transforming, and manipulating datasets.' },
      { id: 'c3-2', topic: 'Data Visualization with Matplotlib & Seaborn', details: 'Creating insightful charts and plots.' },
      { id: 'c3-3', topic: 'Statistical Analysis', details: 'Applying statistical methods to extract meaning from data.' },
      { id: 'c3-4', topic: 'Introduction to Scikit-Learn', details: 'Building your first machine learning models.' },
    ]
  },
  {
    id: 'course-4',
    title: 'UI/UX Design Fundamentals',
    description: 'From wireframing to prototyping, learn the principles of user-centered design to create intuitive and beautiful digital products.',
    duration: '6 Weeks',
    skillLevel: 'Beginner',
    tags: ['UI Design', 'UX Research', 'Figma', 'Prototyping'],
     curriculum: [
      { id: 'c4-1', topic: 'The Design Thinking Process', details: 'Empathizing with users and defining problems.' },
      { id: 'c4-2', topic: 'Wireframing & Low-Fidelity Prototyping', details: 'Structuring your application layout.' },
      { id: 'c4-3', topic: 'Visual Design Principles', details: 'Typography, color theory, and layout.' },
      { id: 'c4-4', topic: 'High-Fidelity Prototyping in Figma', details: 'Creating interactive and testable prototypes.' },
    ]
  },
   {
    id: 'course-5',
    title: 'Cloud Computing with AWS',
    description: 'Learn to deploy, manage, and scale applications using Amazon Web Services. Covers core services like EC2, S3, and Lambda.',
    duration: '8 Weeks',
    skillLevel: 'Intermediate',
    tags: ['AWS', 'Cloud', 'DevOps', 'EC2', 'S3'],
     curriculum: [
      { id: 'c5-1', topic: 'Introduction to Cloud Computing', details: 'Understanding the benefits and models of cloud.' },
      { id: 'c5-2', topic: 'Core AWS Services', details: 'Hands-on with EC2, S3, RDS, and VPC.' },
      { id: 'c5-3', topic: 'Serverless Architecture with Lambda', details: 'Building event-driven applications.' },
      { id: 'c5-4', topic: 'Infrastructure as Code with CloudFormation', details: 'Automating your cloud infrastructure.' },
    ]
  },
  {
    id: 'course-6',
    title: 'Cybersecurity Essentials',
    description: 'Learn the fundamentals of cybersecurity, including threat analysis, network security, and ethical hacking principles to protect digital assets.',
    duration: '10 Weeks',
    skillLevel: 'Intermediate',
    tags: ['Cybersecurity', 'Network Security', 'Ethical Hacking', 'InfoSec'],
     curriculum: [
      { id: 'c6-1', topic: 'Introduction to Cybersecurity', details: 'Understanding the landscape of digital threats and vulnerabilities.' },
      { id: 'c6-2', topic: 'Network & Infrastructure Security', details: 'Securing networks with firewalls, VPNs, and intrusion detection systems.' },
      { id: 'c6-3', topic: 'Ethical Hacking & Penetration Testing', details: 'Learning to think like a hacker to find and fix security flaws.' },
      { id: 'c6-4', topic: 'Cryptography and Data Protection', details: 'Implementing encryption to protect sensitive information.' },
      { id: 'c6-5', topic: 'Security Policies and Compliance', details: 'Understanding standards like GDPR, HIPAA, and ISO 27001.' },
    ]
  },
  {
    id: 'course-7',
    title: 'Agile Project Management with Scrum',
    description: 'Master the principles of Agile and the Scrum framework to deliver projects on time and on budget. Learn to lead teams, manage backlogs, and run effective sprints.',
    duration: '4 Weeks',
    skillLevel: 'Beginner',
    tags: ['Agile', 'Scrum', 'Project Management', 'Jira'],
     curriculum: [
      { id: 'c7-1', topic: 'The Agile Manifesto and Principles', details: 'Understanding the core values of Agile development.' },
      { id: 'c7-2', topic: 'The Scrum Framework', details: 'Roles (Product Owner, Scrum Master), Events (Sprints, Stand-ups), and Artifacts (Backlog).' },
      { id: 'c7-3', topic: 'User Stories and Backlog Management', details: 'Writing effective user stories and prioritizing features.' },
      { id: 'c7-4', topic: 'Sprint Planning and Execution', details: 'Running successful sprints from planning to retrospective.' },
    ]
  },
  {
    id: 'course-8',
    title: 'Digital Marketing Fundamentals',
    description: 'Get a comprehensive overview of digital marketing, including SEO, content marketing, social media strategy, and email campaigns to grow an online presence.',
    duration: '6 Weeks',
    skillLevel: 'Beginner',
    tags: ['Digital Marketing', 'SEO', 'Content Marketing', 'Social Media'],
     curriculum: [
      { id: 'c8-1', topic: 'Introduction to Digital Marketing', details: 'Understanding the digital marketing ecosystem.' },
      { id: 'c8-2', topic: 'Search Engine Optimization (SEO)', details: 'Improving website visibility on search engines.' },
      { id: 'c8-3', topic: 'Content & Social Media Marketing', details: 'Creating engaging content and building a community.' },
      { id: 'c8-4', topic: 'Email Marketing and Automation', details: 'Building and nurturing an email list for conversions.' },
    ]
  },
  {
    id: 'course-9',
    title: 'Blockchain & Cryptocurrency Explained',
    description: 'Understand the core concepts behind blockchain technology, how cryptocurrencies like Bitcoin work, and the future of decentralized applications.',
    duration: '5 Weeks',
    skillLevel: 'Beginner',
    tags: ['Blockchain', 'Crypto', 'Web3', 'Decentralization'],
     curriculum: [
      { id: 'c9-1', topic: 'What is Blockchain?', details: 'Learn about distributed ledgers, blocks, and cryptographic hashing.' },
      { id: 'c9-2', topic: 'How Bitcoin Works', details: 'A deep dive into mining, transactions, and the Bitcoin network.' },
      { id: 'c9-3', topic: 'Smart Contracts & Ethereum', details: 'Exploring programmable money and decentralized applications (dApps).' },
      { id: 'c9-4', topic: 'The Web3 Ecosystem', details: 'An overview of NFTs, DAOs, and the future of the internet.' },
    ]
  },
  {
    id: 'course-10',
    title: 'Mobile App Development with React Native',
    description: 'Build cross-platform mobile apps for iOS and Android using a single JavaScript codebase with React Native. Go from setup to app store deployment.',
    duration: '10 Weeks',
    skillLevel: 'Intermediate',
    tags: ['React Native', 'Mobile Dev', 'iOS', 'Android', 'JavaScript'],
     curriculum: [
      { id: 'c10-1', topic: 'Setting up the Development Environment', details: 'Configuring your machine for iOS and Android development.' },
      { id: 'c10-2', topic: 'Core Components and Styling', details: 'Mastering the fundamental building blocks of a React Native app.' },
      { id: 'c10-3', topic: 'Navigation and State Management', details: 'Creating multi-screen apps with complex data flows.' },
      { id: 'c10-4', topic: 'Accessing Native Device Features', details: 'Using the camera, GPS, and other native APIs.' },
      { id: 'c10-5', topic: 'Building, Testing, and Deploying', details: 'Preparing your app for the Apple App Store and Google Play Store.' },
    ]
  }
];

export const MOCK_JOBS: Job[] = [
  {
    id: 'job-1',
    title: 'Senior React Developer',
    company: 'Tech Solutions Inc.',
    location: 'Remote',
    description: 'We are looking for an experienced React developer to join our team and lead the development of our next-generation user interfaces.',
    requiredSkills: ['React', 'TypeScript', 'Redux'],
    contactInfo: 'careers@techsolutions.com',
    postedBy: 'user-2',
  },
  {
    id: 'job-2',
    title: 'UX/UI Designer for Mobile App',
    company: 'Innovate Co.',
    location: 'San Francisco, CA',
    description: 'Seeking a creative designer to craft a seamless and engaging user experience for our new mobile application.',
    requiredSkills: ['UI/UX Design', 'Figma', 'Mobile Design'],
    contactInfo: 'apply@innovateco.com',
    postedBy: 'user-3',
  },
  {
    id: 'job-3',
    title: 'Backend Node.js Engineer',
    company: 'Backend Pros',
    location: 'New York, NY',
    description: 'Join our backend team to build and maintain scalable APIs and services that power our platform.',
    requiredSkills: ['Node.js', 'Express', 'MongoDB'],
    contactInfo: 'jobs@backendpros.io',
    postedBy: 'user-1',
  },
  {
    id: 'job-4',
    title: 'DevOps Engineer',
    company: 'CloudUp',
    location: 'Austin, TX (Hybrid)',
    description: 'We are seeking a DevOps engineer to automate our deployment pipelines, manage our AWS infrastructure, and improve system reliability.',
    requiredSkills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
    contactInfo: 'devops-jobs@cloudup.com',
    postedBy: 'user-4',
  },
  {
    id: 'job-5',
    title: 'Data Analyst',
    company: 'Data Insights LLC',
    location: 'Remote',
    description: 'Analyze large datasets to identify trends, create reports, and provide actionable insights for our business development team.',
    requiredSkills: ['SQL', 'Python', 'Pandas', 'Tableau'],
    contactInfo: 'apply@datainsights.com',
    postedBy: 'user-2',
  },
  {
    id: 'job-6',
    title: 'Junior Frontend Developer',
    company: 'Web Wizards',
    location: 'Boston, MA',
    description: 'Exciting opportunity for a junior developer to learn and grow. You will work on building and maintaining our marketing websites.',
    requiredSkills: ['HTML', 'CSS', 'JavaScript', 'jQuery'],
    contactInfo: 'careers@webwizards.net',
    postedBy: 'user-1',
  },
  {
    id: 'job-7',
    title: 'Product Manager',
    company: 'Innovate Co.',
    location: 'San Francisco, CA',
    description: 'Lead the product roadmap for our flagship mobile app. Work with design and engineering to define, build, and launch new features.',
    requiredSkills: ['Product Management', 'Agile', 'Jira', 'User Research'],
    contactInfo: 'pm@innovateco.com',
    postedBy: 'user-3',
  },
  {
    id: 'job-8',
    title: 'Cybersecurity Analyst',
    company: 'SecureNet',
    location: 'Washington, D.C.',
    description: 'Monitor our networks for security threats, investigate incidents, and help develop and implement security policies.',
    requiredSkills: ['Cybersecurity', 'SIEM', 'Network Security', 'InfoSec'],
    contactInfo: 'security-careers@securenet.com',
    postedBy: 'user-4',
  },
  {
    id: 'job-9',
    title: 'Lead Mobile Developer (React Native)',
    company: 'Appify',
    location: 'Remote',
    description: 'Lead a team of mobile developers in building a high-performance cross-platform application using React Native.',
    requiredSkills: ['React Native', 'TypeScript', 'iOS', 'Android', 'Team Leadership'],
    contactInfo: 'mobile-lead@appify.com',
    postedBy: 'user-2',
  },
];