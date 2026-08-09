# Charity / Discount Marketplace App

**Status:** Private/Client Project — Code Not Public  
**Type:** Mobile Application  
**Platform:** Flutter (Android)  
**Tech Stack:** Flutter, Dart, Firebase, Hive, Cloudinary, UPI  

## Overview

The Charity App is a Flutter mobile application providing an offline-first marketplace experience with an admin panel, order tracking, and Firebase-optimized data synchronization.

## High-Level Architecture

```
┌─────────────────────┐
│   Flutter App       │
│   (Android)         │
└────────────┬────────┘
             │
    ┌────────┴────────┬────────────────┐
    │                 │                │
    v                 v                v
Firebase Auth    Cloud Firestore   Storage/
                                   Image Service
    │                 │                │
    └────────────┬────────────────────┘
                 │
           App State / Cache
                 │
        ┌────────┴────────┐
        │                 │
    Provider         Hive / Local Cache
```

## Core Architectural Principles

- **Firebase is the source of truth** for shared application data
- **Flutter** is the application/UI layer  
- **Provider** manages runtime state
- **Hive/local storage** enables persistent caching and offline behavior

## Technology Stack

### Frontend
- Flutter
- Dart
- Material UI
- Provider (state management)

### Backend & Cloud
- Firebase Core
- Firebase Authentication
- Cloud Firestore
- Firebase Storage

### Local Storage & Device
- Hive (persistent cache)
- SharedPreferences
- Path Provider
- Connectivity Plus
- Cached image storage

### Additional Packages
- `cached_network_image` – Image caching
- `image_picker` – Photo selection
- `flutter_image_compress` – Image optimization
- `flutter_dotenv` – Environment configuration
- `http` – HTTP requests
- `intl` – Internationalization
- `pdf` / `printing` – Report generation
- `url_launcher` – Deep links
- `shimmer` – Loading animations
- `badges` – UI badging

## Key Features

- ✅ Offline-first marketplace with local-first sync
- ✅ Admin panel for inventory and order management
- ✅ Order history and status tracking
- ✅ Optimized Firestore reads with lazy loading
- ✅ Cloudinary CDN for media delivery
- ✅ UPI payment integration
- ✅ WhatsApp automation for order updates
- ✅ Push notifications

## Data Flow

1. **User action** → UI triggers data request
2. **State management** → Provider updates app state
3. **Local cache** → Hive stores/retrieves cached data instantly
4. **Cloud sync** → Firebase Firestore syncs in background when online
5. **Media handling** → Cloudinary serves images via CDN

## Caching Strategy

- Firestore reads are optimized with incremental/lazy loading
- Local data is cached in Hive for instant access
- Offline mode uses cached data as fallback
- Background sync pushes local changes to Firebase when network recovers

## Documentation

For detailed architecture, data flow, storage model, and implementation details, refer to the project's internal documentation.
