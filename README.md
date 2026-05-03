# Tier Lists App

A full-stack, cross-platform tier list application that allows users to create, customize, and manage ranked lists with persistent storage and user authentication.

## Overview

Tier Lists App is designed to provide a easy experience for organizing and ranking items across mobile and web platforms. The application supports dynamic list creation, real-time updates, and persistent user data through a backend API and database integration.

## Features

- User authentication (login/register)
- Create, edit, and delete tier lists
- Drag-and-drop style ranking system
- Persistent data storage using a backend API
- Cross-platform support (mobile + web)
- Clean and responsive UI
- Local state management for fast interactions

## Tech Stack

### Frontend (Mobile)
- Flutter (Dart)
- State management
- Custom UI components

### Backend
- Node.js
- Express.js
- REST API design

### Database
- MongoDB
- Mongoose (schema modeling)

### Tools & DevOps
- Git / GitHub
- SwaggerHub (API documentation)
- DigitalOcean (deployment)

## Architecture

The application follows a client-server architecture:

- Flutter frontend communicates with a Node.js/Express REST API
- Backend handles authentication, business logic, and database operations
- MongoDB stores user data and tier list structures

## Key Contributions

- Developed the Flutter mobile application end-to-end
- Implemented authentication and CRUD functionality
- Integrated REST API with frontend
- Designed dynamic ranking UI for tier list interaction
- Collaborated in a team of 5 using GitHub workflows and code reviews

## Getting Started

### Prerequisites
- Node.js
- Flutter SDK
- MongoDB

### Installation

```bash
# Clone repository
git clone https://github.com/soccerthomas/your-repo-name.git

# Install backend dependencies
cd backend
npm install

# Run backend
npm start

# Run Flutter app
cd ../mobile
flutter run
