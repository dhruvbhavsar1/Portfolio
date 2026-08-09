# Dhruv Bhavsar — Portfolio

A terminal-inspired developer portfolio showcasing mobile applications, developer tools, skills, and experience in Flutter, Android, and Python development.

---

## 🌐 Live Demo

**[View Live Portfolio](https://dhruvbhavsar1.github.io/Portfolio/)**

The portfolio is deployed on GitHub Pages and demonstrates a terminal-style interface with interactive commands for exploring projects, skills, and experience.

---

## 🛠️ Tech Stack

### Frontend
- **HTML5** – Semantic markup
- **CSS3** – Tailwind CSS (utility-first styling)
- **JavaScript** – ES modules, async/await, DOM manipulation
- **Architecture** – Data-driven renderers, command registry pattern

### Featured Project Technologies
- **Mobile:** Flutter, Dart, Kotlin
- **Backend:** Firebase, Firestore, Authentication
- **Local Storage:** Hive, SQLite, Room Database
- **Cloud Services:** Firebase Storage, Cloudinary CDN
- **Tools:** Python, Git/GitHub
- **Integrations:** UPI payments, WhatsApp automation, Local notifications

### Deployment
- **Platform:** GitHub Pages
- **Framework:** Static HTML/CSS/JS (no build required)
- **Customization:** Edit `src/data/portfolio.js` for content updates

---

## 📁 Project Structure

```
Portfolio/
├── index.html                      # Main entry point (GitHub Pages)
├── src/
│   ├── main.js                    # App entrypoint
│   ├── data/
│   │   └── portfolio.js           # Resume & portfolio data (single source of truth)
│   ├── utils/
│   │   ├── dom.js                 # DOM element accessors
│   │   └── typewriter.js          # Typing animation utility
│   ├── commands/
│   │   ├── registry.js            # Command-to-renderer mapping
│   │   └── executor.js            # Command execution with animation
│   ├── renderers/                 # Pure UI renderers
│   │   ├── whoami.js
│   │   ├── about.js
│   │   ├── projects.js
│   │   ├── skills.js
│   │   ├── experience.js
│   │   ├── education.js
│   │   ├── certifications.js
│   │   ├── contact.js
│   │   └── services.js
│   ├── handlers/
│   │   └── handlers.js            # DOM event wiring
│   └── styles/
│       ├── main.css
│       ├── terminal.css
│       └── animations.css
├── docs/
│   ├── projects/                  # Project documentation
│   │   ├── charity-app.md
│   │   ├── monginis-crm.md
│   │   └── priority-ping.md
│   └── notes/                     # Developer tools & notes
│       └── flutter-ios-check.md
├── assets/
│   └── resume/
│       ├── Dhruv_Bhavsar_Resume.docx
│       └── Dhruv_Bhavsar_Resume.pdf
├── README.md                      # This file
├── LICENSE                        # MIT License
└── .gitignore                     # Git ignore rules
```

---

## 📋 Featured Projects

### 1. **Charity / Discount Marketplace App**
**Status:** Private/Client Project — Code Not Public  
**Type:** Mobile Application (Flutter)  
**Tech:** Flutter, Dart, Firebase, Hive, Cloudinary, UPI  

Offline-first Flutter marketplace with admin panel, order tracking, optimized Firestore reads, and WhatsApp integration.

📖 [View Documentation](docs/projects/charity-app.md)

---

### 2. **Monginis CRM (CakeCRM)**
**Status:** Private/Client Project — Code Not Public  
**Type:** Mobile CRM Application (Flutter)  
**Tech:** Flutter, Dart, Provider, Hive, Firebase Firestore  

Offline-first CRM for cake shop customer management, birthday reminders, and WhatsApp communication.

📖 [View Documentation](docs/projects/monginis-crm.md)

---

### 3. **PriorityPing**
**Status:** Public Project  
**Type:** Android Notification Management  
**Tech:** Kotlin, Android SDK, Room Database, SQLite  
**Repository:** [github.com/dhruvbhavsar1/Priority-Ping](https://github.com/dhruvbhavsar1/Priority-Ping)

Android app that prioritizes notifications from selected contacts and apps, preventing important messages from getting lost in silent/DND modes.

📖 [View Documentation](docs/projects/priority-ping.md)

---

### 4. **Flutter iOS Check**
**Status:** Public Project  
**Type:** CLI Development Tool (Python)  
**Tech:** Python, Static Analysis, iOS Configuration  
**Repository:** [github.com/dhruvbhavsar1/flutter-ios-check](https://github.com/dhruvbhavsar1/flutter-ios-check)

Python command-line tool for analyzing Flutter projects' iOS readiness without requiring Xcode or a Mac.

📖 [View Documentation](docs/notes/flutter-ios-check.md)

---

### 5. **Other Projects**
- **Student Management System** – Python + SQLite CRUD application
- **Expense Tracker** – Python CLI expense management tool
- **Car Service Reporting System** – C# .NET + SQL group project

---

## 📄 Resume

- **📥 PDF Resume:** [Dhruv_Bhavsar_Resume.pdf](assets/resume/Dhruv_Bhavsar_Resume.pdf)
- **📥 Word Resume:** [Dhruv_Bhavsar_Resume.docx](assets/resume/Dhruv_Bhavsar_Resume.docx)

---

## 📬 Contact

**Name:** Dhruv Bhavsar  
**Location:** Kheda, Gujarat, India  
**Email:** [bhavsardhruv020@gmail.com](mailto:bhavsardhruv020@gmail.com)  
**Phone:** [+91 95123 27505](tel:+919512327505)  
**GitHub:** [@dhruvbhavsar1](https://github.com/dhruvbhavsar1)  
**LinkedIn:** [LinkedIn Profile](https://linkedin.com/in/dhruvbhavsar1)

---


## 🔧 Technologies Used

- **Languages:** JavaScript, Python, Dart, Kotlin, C#, Java, HTML, CSS
- **Frameworks:** Flutter, Android SDK
- **Backend:** Firebase, Firestore, Firebase Authentication
- **Databases:** SQLite, Hive, Room Database
- **Tools:** Git, GitHub, Visual Studio Code, Android Studio
- **Design:** Tailwind CSS, Material Design, Material 3

---

## 📜 License

This project (portfolio website code) is licensed under the **MIT License** — see [LICENSE](LICENSE) file for details.

### Important Note on Project Code

The MIT License applies to this portfolio's website code (HTML, CSS, JavaScript in `src/`).

**Private project documentation** in `/docs/projects/` describes client/private work whose source code is NOT included and NOT covered by this license:
- Charity App
- Monginis CRM

**Public projects** maintain their own licenses in their respective repositories:
- [PriorityPing License](https://github.com/dhruvbhavsar1/Priority-Ping/blob/main/LICENSE)
- [Flutter iOS Check License](https://github.com/dhruvbhavsr1/flutter-ios-check/blob/main/LICENSE)

---

## ✨ Highlights

✅ **Terminal-inspired UX** – Polished CLI-style interface  
✅ **Fast typing animations** – Smooth 120ms/character whoami reveal  
✅ **Responsive design** – Works on desktop, tablet, mobile  
✅ **Dark theme** – Material 3 dark color scheme  
✅ **Accessible** – Semantic HTML, keyboard-friendly  
✅ **Zero dependencies** – Pure JavaScript, no frameworks  
✅ **Easy customization** – Data-driven architecture  
✅ **GitHub Pages ready** – Deploy-and-forget simplicity  

---

**Last Updated:** August 2026  
**Status:** Active & Maintained