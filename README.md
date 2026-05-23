# eBuk Project Setup Guide

Welcome to the **eBuk** repository workspace. This project uses a decoupled, full-stack architecture consisting of a Laravel backend API, a Next.js web frontend, and an Expo-powered React Native mobile application.

---

## Global Prerequisites

Before initializing any application, ensure you have the following installed on your local development workstation:

* **PHP** (Version 8.2 or higher recommended)
* **Composer** (PHP Package Manager)
* **Node.js** (v18.x or v20.x LTS) & npm
* **XAMPP / phpMyAdmin** (or any local MySQL database engine)
* **Expo Go App** installed on your physical mobile device (iOS/Android)

---

## 🗺️ Workspace Architecture Overview

```text
ebuk/
├── ebuk-backend/     # Laravel 11 REST API
├── ebuk-front/       # Next.js Web Frontend
└── ebuk-mobile/      # React Native Mobile Application (Expo)
