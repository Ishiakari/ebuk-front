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
└── ebuk-mobile/      # React Native Mobile Application (Expo)
```
## Part 1: Laravel Backend Setup
Open your terminal, navigate to your backend repository folder, and install PHP dependencies:
```bash
cd ebuk-backend
composer install
```
Initialize your environment configuration file:
```bash
cp .env.example .env
php artisan key:generate
```
Configure the local database link:
Open the .env file in your code editor and adjust the parameters to point to your local database tool (e.g., XAMPP / phpMyAdmin):
```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=ebuk_db
DB_USERNAME=root
DB_PASSWORD=
```
⚠️ Note: Remember to create a blank schema named ebuk_db in your database engine (like phpMyAdmin) before continuing.
Run database migrations to generate your normalized schema tables:
```bash
php artisan migrate
```
Clear the application caches to ensure structural updates are live:
```bash
php artisan route:clear
php artisan config:clear
```
Start the Laravel server exposed to your local network interface:
```Bash
php artisan serve --host=0.0.0.0 --port=8000
```
Why this matters: Using --host=0.0.0.0 is strictly required to ensure external network connections (like your physical phone running Expo Go) can interact with the server backend. Keep this terminal window open!
