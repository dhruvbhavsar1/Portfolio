from pathlib import Path

readme = r"""# Dhruv Bhavsar — Portfolio

> A modern developer portfolio showcasing my projects, technical skills, experience, and the engineering work behind each project.

🌐 **Live Portfolio:**(https://dhruvbhavsar1.github.io/Portfolio/)

> **Note:** The live URL above is the previously shared deployment URL. Update it if your current portfolio has a different deployment URL.

---

## 👨‍💻 About

Hi, I'm **Dhruv Bhavsar**, an MCA student and software developer focused on building practical applications, developer tools, mobile apps, web applications, and IoT systems.

This portfolio is designed to present not only the final UI of my projects, but also the **technology, architecture, implementation decisions, and functionality** behind them.

---

## 🚀 Featured Projects

### 🎁 Charity App

A mobile application designed to manage charity-related operations and data.

**Highlights**
- Customer/user and order-related data management
- Product and catalog handling
- Firebase-backed data flow
- Offline-friendly data handling and caching
- Image handling and compression
- PDF generation/printing
- Connectivity-aware application behavior
- Role-based application architecture
- Modern Flutter UI

**Technology**
`Flutter` `Dart` `Firebase` `Cloud Firestore` `Firebase Storage` `Provider` `Hive/Local Storage`

---

### 🎂 Monginis CRM — CakeCRM

A private CRM application built for managing customer information for a cake shop.

**Highlights**
- Customer directory
- Add, edit, and delete customer records
- Birthday tracking
- Upcoming birthday dashboard
- VIP/new customer indicators
- Favorite cake and notes
- WhatsApp integration
- Local notifications
- Offline-first data access
- Cloud backup/synchronization
- Product catalog caching
- Demo-mode usage limits

**Architecture**

The application follows an offline-first approach:

```text
Flutter UI
    ↓
Provider / Application State
    ↓
Local Storage (Hive)
    ↓
Firebase Firestore
    ↓
Cloud Backup / Synchronization
