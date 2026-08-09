# Flutter iOS Check — Development Tool

**Type:** Command-Line Static Analysis Tool  
**Language:** Python  
**Purpose:** Analyze Flutter iOS readiness without requiring a Mac  
**Repository:** [github.com/dhruvbhavsar1/flutter-ios-check](https://github.com/dhruvbhavsar1/flutter-ios-check)

## Overview

Flutter iOS Check is a local command-line static analysis tool that inspects Flutter projects for iOS-readiness issues before the expensive iOS build stage.

**Core Design Principle:** The tool is an **analyzer**, not a builder. It reads project files, parses configuration, applies validation rules, and produces findings — without modifying the project or requiring Xcode.

**Problem Solved:** Many iOS configuration problems are discovered late (during Xcode build, on physical devices, TestFlight, or App Store submission). This tool catches them early on any platform (Windows, Linux, Mac).

## High-Level Flow

```
Flutter Project
     │
     v
Project Discovery
     │
     ├──> pubspec.yaml
     │
     ├──> ios/Podfile
     │
     ├──> ios/Runner/Info.plist
     │
     └──> Firebase / Plugin Configuration
     │
     v
Parse into Structured Data
     │
     v
Rule Engine
     │
     v
Findings Report
     │
     v
Developer Fixes Project
```

**Pipeline:** `INPUT → DISCOVERY → PARSING → MODEL → RULES → FINDINGS → OUTPUT`

## Technology Stack

- **Language:** Python 3.7+
- **Parser:** YAML, plist, Podfile parsing
- **Architecture:** Static analysis (no compilation, no Xcode, no simulators)
- **Output:** CLI report (console/markdown/JSON)

## What It Analyzes

### Configuration Files

- **pubspec.yaml**
  - Flutter version constraints
  - Plugin dependencies
  - Build number/version

- **ios/Podfile**
  - CocoaPods configuration
  - Pod versions
  - Deployment target
  - Pod sources

- **ios/Runner/Info.plist**
  - iOS deployment target
  - App permissions
  - Feature flags
  - Privacy descriptions

- **Firebase Configuration**
  - GoogleService-Info.plist
  - Firebase plugin setup

### Validation Rules

- ✅ iOS deployment target (minimum 11.0+)
- ✅ Plugin compatibility with iOS
- ✅ Firebase configuration completeness
- ✅ Permission entries (privacy descriptions)
- ✅ Podfile CocoaPods setup
- ✅ Flutter SDK version compatibility
- ✅ Common misconfiguration patterns

## What It Does NOT Do

The analyzer is **intentionally static** and does NOT:

- ❌ Run Xcode
- ❌ Compile or build the app
- ❌ Run iOS simulators or physical devices
- ❌ Sign applications
- ❌ Submit to App Store Connect
- ❌ Contact Apple's developer services
- ❌ Contact Firebase services
- ❌ Guarantee successful builds
- ❌ Modify your project (unless future "fixer" mode is added)

**Key Distinction:** `iOS readiness analysis` ≠ `iOS build`

## Output Report

The tool generates a structured report with:

```
FINDING: [Issue Category]
  Level: [INFO | WARNING | ERROR]
  File: ios/Runner/Info.plist
  Problem: Deployment target is 10.0, but Flutter requires 11.0+
  Suggestion: Update Info.plist to deploymentTarget 11.0+
  Severity: CRITICAL
```

## Use Cases

1. **Pre-commit checks** – Catch config issues before pushing
2. **CI/CD pipeline** – Automated iOS readiness gates
3. **Cross-platform development** – Windows/Linux developers analyze iOS config without a Mac
4. **Onboarding** – New team members validate iOS setup
5. **Migration checks** – Verify project after major dependency updates

## Command-Line Interface

```bash
# Analyze current project
flutter-ios-check .

# Analyze specific Flutter project
flutter-ios-check /path/to/flutter/project

# Output JSON for parsing
flutter-ios-check . --format=json

# Show only errors (not warnings)
flutter-ios-check . --level=error

# Verbose mode (show all checks, including passing ones)
flutter-ios-check . --verbose
```

## Architecture Layers

```
┌─────────────────────────────────────┐
│   CLI Entrypoint (argparse)         │
└────────────────┬────────────────────┘
                 │
┌────────────────v────────────────────┐
│   Project Discovery (scan fs)       │
└────────────────┬────────────────────┘
                 │
┌────────────────v────────────────────┐
│   File Parsers (YAML/plist/text)   │
└────────────────┬────────────────────┘
                 │
┌────────────────v────────────────────┐
│   Data Model (structured objects)   │
└────────────────┬────────────────────┘
                 │
┌────────────────v────────────────────┐
│   Rule Engine (validators)          │
└────────────────┬────────────────────┘
                 │
┌────────────────v────────────────────┐
│   Finding Generation                │
└────────────────┬────────────────────┘
                 │
┌────────────────v────────────────────┐
│   Output Formatter (CLI/JSON/md)    │
└─────────────────────────────────────┘
```

## Important Design Decisions

1. **Static Analysis Only** – No compilation, no Xcode, fast results
2. **Informative, Not Prescriptive** – Reports issues, doesn't auto-fix
3. **Cross-Platform Friendly** – Runs on Windows/Linux/Mac equally
4. **Incremental Output** – Shows findings as it progresses
5. **Machine-Readable** – JSON output for CI/CD integration

## Validation Categories

### Configuration Readiness
- iOS minimum deployment target
- Flutter SDK version alignment
- Plugin compatibility matrix

### Permissions & Privacy
- Privacy descriptions (iOS 14+)
- Required permissions declared
- Dangerous permission usage

### Firebase Setup
- GoogleService-Info.plist present
- Firebase configuration valid
- Firebase plugin versions compatible

### Xcode Compatibility
- Podfile setup correct
- CocoaPods deployment target match
- No missing pod sources

### Flutter Plugins
- iOS implementations present
- Plugin versions in pubspec match installed versions
- No breaking version mismatches

## Development Notes

- **Parser Robustness:** Handles comments, formatting variations in config files
- **Rule Extensibility:** New validators can be added without modifying core logic
- **Performance:** Analysis completes in < 2 seconds for typical projects
- **Error Handling:** Gracefully reports parsing errors instead of crashing

## Future Roadmap

- 🔮 Auto-fix mode (generate corrected Info.plist/Podfile)
- 🔮 Interactive configuration wizard
- 🔮 HTML report generation
- 🔮 Integration with GitHub Actions
- 🔮 Pre-commit hook templates
- 🔮 Android equivalents (flutter-android-check)

## Limitations

- Requires Python 3.7+
- Assumes standard Flutter project structure
- May not catch all obscure iOS quirks
- Dependent on up-to-date validation rules
- Cannot validate runtime behavior (requires actual build/test)

---

**Status:** Stable / Production Ready  
**Maintenance:** Active (bug fixes + new iOS SDK validations)  
**Contributing:** Open to issues and PRs on GitHub
