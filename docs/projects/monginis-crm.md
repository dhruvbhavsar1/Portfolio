# Monginis CRM (CakeCRM)

**Status:** Private/Client Project — Code Not Public  
**Type:** Mobile Customer Relationship Management (CRM)  
**Platform:** Flutter (Mobile)  
**Tech Stack:** Flutter, Dart, Provider, Hive, Firebase Firestore, WhatsApp  

## Overview

Monginis CRM is an offline-first Flutter mobile application designed to help a cake shop owner manage customer information, birthdays, preferences, VIP status, reminders, and communications from a single private mobile application.

The application runs as a private APK on the business owner's Android phone. It is not a customer-facing application and is not intended for public release.

## High-Level Architecture

```
    User (Cake Shop Owner)
         |
         v
    Flutter UI
         |
         v
    Provider / Application State
         |
         +─────────────┬─────────────┐
         |             |             |
         v             v             v
    Hive Local    Firebase       Sync/Backup
    Storage       Firestore      Logic
         |             |             |
         └─────────────┬─────────────┘
                       |
              Working Environment
```

**Design Philosophy:** The local device is the primary working environment. Firebase Firestore provides cloud backup and synchronization. The app remains usable without internet.

## Technology Stack

### Frontend / Mobile
- Flutter
- Dart
- Material 3 UI

### State Management
- Provider

### Local Storage
- Hive (persistent customer data)
- SharedPreferences (lightweight settings)

### Cloud Backend
- Firebase Core
- Firebase Firestore (cloud backup/sync)
- Firebase Authentication (where applicable)

### External Communication
- WhatsApp deep links / URL launcher
- Local notifications
- Connectivity checking

## Why Flutter?

Flutter is ideal for this private CRM because it provides:

- Fast UI development
- Single Dart codebase (write once, run on Android/iOS)
- Material 3 support
- Strong Android support (APK generation)
- Excellent Firebase integration
- Simple Hive integration for local databases
- Easy notification and deep-link integration
- Reusable, efficient widgets

For a private business CRM application, Flutter balances speed and reliability perfectly.

## Key Features

- ✅ Offline-first operation — works without internet
- ✅ Customer information management
- ✅ Birthday and event reminders
- ✅ Customer preference tracking
- ✅ VIP/new-customer status classification
- ✅ Local-first data storage with cloud sync
- ✅ WhatsApp integration for customer communication
- ✅ Notification system
- ✅ Rolling monthly sync engine

## Data Flow

1. **User enters customer data** → Local Hive storage (instant)
2. **Provider state updates** → UI reflects changes immediately
3. **Background sync** → Firestore syncs data when online
4. **Cloud backup** → All customer data backed up to Firestore
5. **Sync recovery** → On reconnect, local and cloud data reconcile
6. **Notifications/reminders** → Birthday/event alerts trigger locally

## Architecture Layers

```
┌─────────────────────────────────┐
│   UI Layer (Flutter Screens)    │
│   Settings / Customer Management│
└────────────────┬────────────────┘
                 │
┌────────────────v────────────────┐
│  State Management (Provider)    │
└────────────────┬────────────────┘
                 │
┌────────────────v────────────────┐
│    Business Logic & Validation  │
└────────────────┬────────────────┘
                 │
        ┌────────┴────────┐
        │                 │
        v                 v
   Hive Store        Firebase Sync
```

## Offline-First Sync Strategy

- Customer records are stored locally in Hive
- All CRUD operations work offline
- Background sync pushes changes to Firestore
- Conflict resolution favors local data (last-write-wins)
- Sync status is transparent to the user

## Privacy & Security

- No customer data leaves the app unless explicitly synced to Firestore
- Private deployment — no multi-tenant concerns
- Local encryption supported via Hive
- Firebase authentication optional for backup cloud access
