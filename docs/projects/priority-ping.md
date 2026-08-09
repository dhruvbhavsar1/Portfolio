# PriorityPing

**Status:** Public Project  
**Type:** Android Notification Management App  
**Platform:** Android (Kotlin)  
**Tech Stack:** Kotlin, Android SDK, Room Database, SQLite  
**Repository:** [github.com/dhruvbhavsar1/Priority-Ping](https://github.com/dhruvbhavsar1/Priority-Ping)

## Overview

PriorityPing is an Android notification-management application designed to ensure important notifications don't get missed. The app monitors incoming notifications, identifies those marked as important, and gives them special priority treatment.

## Problem Statement

Android can silence or reduce notification visibility due to:
- Silent mode / Do Not Disturb (DND)
- Notification channel settings
- App notification settings
- System power-saving modes

**Solution:** PriorityPing elevates selected notifications through Android's supported notification and policy-access mechanisms.

## Important Technical Note

PriorityPing works **within Android's official APIs** — it does not "hack" the DND system. Behavior depends on:
- Android version
- Device OEM restrictions
- Notification channel configuration
- Granted permissions
- Device-specific policy enforcement

## Technology Stack

### Programming Language
- **Kotlin** (Android-first, null-safe, concise)

### Platform
- **Android** (API 21+)

### Android APIs & Components
- NotificationListenerService
- Notification APIs & Channels
- Notification Manager
- Intent / Activity APIs
- Do Not Disturb / Notification Policy Access APIs
- Android Manifest Permissions

### Local Storage
- **Room Database** (SQLite abstraction)
- SQLite (underlying persistence)

### UI
- Android XML-based layouts
- Activities / Fragments
- Material Design components

### Dependencies
- AndroidX libraries
- Room Runtime 2.6.1+

## Architecture

```
┌──────────────────────────────────────┐
│      Android UI Layer                │
│  Settings / Apps / Priority Config   │
└────────────────┬─────────────────────┘
                 │
┌────────────────v─────────────────────┐
│      Priority Rules Engine           │
│  App + Contact Match / Priority      │
└────────────────┬─────────────────────┘
                 │
┌────────────────v─────────────────────┐
│   Notification Listener Service      │
│   (Background listener)              │
└────────────────┬─────────────────────┘
                 │
         Android system notification
                 │
┌────────────────v─────────────────────┐
│    Incoming Notification             │
│  package / title / text / extras    │
└────────────────┬─────────────────────┘
                 │
┌────────────────v─────────────────────┐
│    Priority Matching Engine          │
│  Match against rules database        │
└────────────────┬─────────────────────┘
                 │
     ┌───────────┴───────────┐
     │                       │
     v                       v
Priority Match          No Match
     │                       │
     v                       v
Apply Priority         Default Behavior
Treatment
```

## Key Features

- ✅ **Priority Rule Configuration** – Define which apps/contacts are important
- ✅ **Background Monitoring** – NotificationListenerService runs continuously
- ✅ **Smart Filtering** – Matches incoming notifications against rules
- ✅ **Priority Elevation** – Increases visibility/sound for important notifications
- ✅ **Settings UI** – Easy app and contact priority management
- ✅ **Local Persistence** – Room database stores rules across reboots
- ✅ **DND Compatibility** – Works with Android Do Not Disturb modes (where supported)

## Data Flow

1. **User configures priority rules** → Stored in Room database
2. **Notification arrives** → NotificationListenerService intercepts
3. **Engine matches notification** → Checks against stored rules
4. **Is priority notification?** 
   - ✅ Yes → Apply priority treatment (sound, vibration, heads-up)
   - ❌ No → Standard Android notification behavior
5. **User interacts** → Activity launches, notification clears

## Permissions & Security

- `NOTIFICATION_LISTENER_SERVICE` – Required to access notifications
- `ACCESS_NOTIFICATION_POLICY` – Required to override DND
- No internet permissions needed
- Local-only operation (no cloud sync)
- User data stays on device

## Supported Workflows

- **VIP Contact Notifications** – Never miss calls/messages from specific people
- **Work App Priority** – Elevate work Slack/Teams notifications
- **Emergency Alerts** – Ensure critical app notifications always reach you
- **Custom Rules** – Mix apps and contacts with priority levels

## Limitations

- Behavior varies by Android version (8.0+ recommended)
- Some OEMs restrict notification policy APIs
- Notification channel settings still apply
- Requires accessibility or notification listener permission

## Future Enhancements (Potential)

- Frequency-based priority (mute after N notifications in timeframe)
- Time-based rules (work hours vs. off-hours)
- Smart learning from user interactions
- Export/import rule sets
- Cloud sync of rules (optional)
