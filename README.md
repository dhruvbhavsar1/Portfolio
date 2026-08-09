# Dhruv Bhavsar Portfolio

A terminal-inspired developer portfolio showcasing mobile applications, developer tools, skills, and experience.

## Live Demo

[View the live portfolio](https://dhruvbhavsar1.github.io/Portfolio/)

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript, Tailwind CSS
- **Architecture:** ES modules with data-driven renderers
- **Deployment:** GitHub Pages
- **Featured technologies:** Flutter, Dart, Kotlin, Python, Firebase, Hive, SQLite

## Project Structure

```
Portfolio/
├── Portfolio.html          # Main HTML entry point (loads src/main.js as module)
├── src/
│   ├── main.js            # App entrypoint: wires handlers, runs boot sequence
│   ├── data/
│   │   └── portfolio.js    # All resume/portfolio data (single source of truth)
│   ├── utils/
│   │   ├── dom.js         # Centralized DOM element selectors
│   │   └── typewriter.js  # Typewriter animation utility
│   ├── commands/
│   │   ├── registry.js    # Command-to-renderer mapping
│   │   └── executor.js    # Command execution with typing animation
│   ├── renderers/         # Pure UI renderers (consume portfolioData)
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
│   │   └── handlers.js    # DOM event wiring (menu buttons, sidebar)
│   └── styles/
│       ├── main.css
│       ├── terminal.css
│       └── animations.css
├── docs/projects/         # Project documentation
└── assets/resume/         # Resume files (PDF/DOCX)
```

## Getting Started

### Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/dhruvbhavsar1/Portfolio.git
   cd Portfolio
   ```

2. **Start a static server:**
   ```powershell
   py -m http.server 8000
   ```
   Or use Node.js:
   ```bash
   npx serve -l 8000 .
   ```

3. **Open in browser:**
   ```
   http://127.0.0.1:8000/Portfolio.html
   ```

## Customization

### Update Resume Data

All resume content lives in **`src/data/portfolio.js`**. Edit this file to update:
- Profile and summary
- Contact information
- Experience entries
- Skills (languages, frameworks, tools, concepts)
- Education
- Certifications
- Services offered
- Projects

### Add/Remove Commands

Commands are registered in **`src/commands/registry.js`**. Each command maps to a renderer function.

Example:
```javascript
'mycommand': { execute: renderMyContent }
```

Then wire buttons in `Portfolio.html` with `data-cmd="mycommand"`.

### Modify UI/Styling

- **Colors & theme:** Edit Tailwind config in `Portfolio.html` `<script id="tailwind-config">`
- **Animations:** Update `src/styles/animations.css`
- **Terminal styles:** Update `src/styles/terminal.css`

### Change Boot Timings

Edit timings in `src/main.js` boot sequence:
- `setTimeout(r => ..., 350)` - initial delay before whoami typing
- `{ speed: 120 }` - typing speed (ms per character)
- `setTimeout(..., 120)` - delay after typing before content reveal
- `setTimeout(..., 250)` - menu reveal delay
- `setTimeout(..., 150)` - projects view reveal delay

## Featured Projects

- **Charity / Discount Marketplace App** – Flutter offline-first marketplace with Firebase optimization
- **Monginis CRM** – Offline Flutter CRM for customer management
- **Flutter iOS Check** – Python CLI tool for iOS readiness analysis
- **PriorityPing** – Android app for priority-based notification filtering
- **Student Management System** – Python + SQLite CRUD app
- **Expense Tracker** – Python CLI expense management

## Resume Files

- [PDF Resume](assets/resume/Dhruv_Bhavsar_Resume.pdf)
- [Word Resume](assets/resume/Dhruv_Bhavsar_Resume.docx)

## License

MIT License - see [LICENSE](LICENSE) file for details.