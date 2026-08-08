export const portfolioData = {
    profile: {
        name: 'Dhruv Bhavsar',
        title: 'Software Developer',
        location: 'Kheda, Gujarat, India',
        summary: `Software Developer with hands-on experience building Android and Flutter applications, specializing in offline-first architecture, Firebase optimization, and scalable mobile solutions. Experienced in designing cost-efficient sync systems, local caching with Hive, and integrating UPI payments, WhatsApp automation, and cloud services. Currently pursuing MCA at CHARUSAT and actively developing open-source and freelance projects.`,
        tags: ['Flutter','Android','Python']
    },
    contact: {
        name: 'Dhruv Bhavsar',
        location: 'Kheda, Gujarat, India',
        phone: '+91 95123 27505',
        email: 'bhavsardhruv020@gmail.com',
        github: 'https://github.com/dhruvbhavsar1',
        linkedin: 'https://www.linkedin.com/in/dhruv-bhavsar-0029bb283'
    },
    experience: [
        {
            id: 'freelance',
            title: 'Freelance Android & Flutter Developer',
            period: '2026 — Present',
            responsibilities: [
                'Designed and built complete mobile applications from architecture to deployment-ready builds.',
                'Optimized Firebase costs using local caching, incremental sync, and offline-first design.',
                'Integrated UPI payments, WhatsApp workflows, notifications, and cloud storage.'
            ]
        }
    ],
    skills: {
        languages: ['Dart','Kotlin','Python','Java','C#','C','C++','HTML','CSS'],
        frameworks: ['Flutter','Android SDK (Kotlin)'],
        backend: ['Firebase Firestore','Hive','SQLite','MySQL','Cloudinary'],
        tools: ['Git/GitHub','VS Code','Android Studio'],
        concepts: ['first architecture','Lazy loading','Incremental sync','REST APIs','Notification systems']
    },
    education: [
        {
            id: 'mca',
            degree: 'Master of Computer Applications (MCA)',
            institution: 'CHARUSAT',
            period: '2026 — 2028'
        },
        {
            id: 'bca',
            degree: 'Bachelor of Computer Applications (BCA)',
            institution: 'CHARUSAT',
            cgpa: '6.68'
        }
    ],
    certifications: ['Oracle Java Foundation','Coursera Python – Write Your First Program'],
    services: ['Flutter App Development','Android App Development','Firebase & Firestore Integration','Bug Fixing & App Optimization','Offline-first Mobile App Architecture'],
    projects: [
        {
            id: 'charity-marketplace',
            name: 'Charity / Discount Marketplace App',
            status: 'PROJECT',
            type: 'MOBILE APPLICATION',
            stack: ['Flutter','Firebase','Hive','Cloudinary'],
            description: 'first marketplace with admin panel, order history, tracking, and optimized Firestore reads.',
            features: ['first architecture','Admin panel','Order history','Tracking','Optimized Firestore reads','Lazy loading','Cloudinary CDN','UPI payments','WhatsApp automation']
        },
        {
            id: 'monginis-crm',
            name: 'CRM for Birthday & Customer Management (Monginis)',
            status: 'PROJECT',
            stack: ['Flutter','Hive','Firestore','WorkManager'],
            description: 'Offline CRM with dashboard, notifications, WhatsApp templates, and rolling monthly sync engine.',
            features: ['Offline CRM','Dashboard','Notifications','WhatsApp templates','Rolling monthly sync engine']
        },
        {
            id: 'flutter-ios-check',
            name: 'Flutter iOS Check',
            status: 'OPEN SOURCE',
            type: 'CLI TOOL',
            lang: 'Python',
            description: 'Python CLI tool for analyzing Flutter iOS readiness.',
            features: ['Info.plist validation','Podfile validation','Firebase configuration validation','Permission validation','Deployment target validation','Flutter iOS readiness analysis'],
            repo: 'https://github.com/dhruvbhavsar1/flutter-ios-check'
        },
        {
            id: 'priority-ping',
            name: 'PriorityPing',
            status: 'ANDROID APP',
            stack: ['Kotlin','Room','NotificationListenerService'],
            description: 'Android app using Kotlin, Room, and NotificationListenerService. Prioritizes notifications from selected contacts across supported apps.',
            repo: 'https://github.com/dhruvbhavsar1/Priority-Ping'
        },
        {
            id: 'student-management',
            name: 'Student Management System',
            stack: ['Python','SQLite'],
            description: 'Python + SQLite CRUD application with validation and search.',
            features: ['CRUD','Validation','Search','SQLite']
        },
        {
            id: 'expense-tracker',
            name: 'Expense Tracker',
            stack: ['Python','SQLite','CLI'],
            description: 'Python CLI + SQLite expense management application.'
        },
        {
            id: 'car-service-reporting',
            name: 'Car Service Reporting System',
            stack: ['C# .NET','SQL'],
            description: 'C# .NET + SQL group project for customer and service management.'
        }
    ]
};
