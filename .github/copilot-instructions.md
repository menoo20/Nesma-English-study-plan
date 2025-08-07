# Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a responsive web application for managing English course assessments and study plans for Nesma company employees. The application is built using vanilla JavaScript, HTML, and CSS with Vite as the build tool.

## Key Features
- Student management system with individual profiles
- PDF placement test viewer and upload functionality
- Dynamic study plan calendar generator
- Local storage for data persistence
- Responsive design for mobile and desktop

## Architecture
- **Frontend-only application** - No backend required
- **Local storage** - All data stored in browser's localStorage
- **File management** - PDF files stored as base64 in localStorage (simulating Git repo uploads)
- **Modular JavaScript** - Event-driven architecture with clear separation of concerns

## Development Guidelines
- Use vanilla JavaScript (ES6+) for all functionality
- Maintain responsive design principles
- Follow modern CSS best practices with CSS Grid and Flexbox
- Ensure accessibility standards are met
- Keep the codebase simple and maintainable for easy updates

## Data Structure
- Student records include: name, test score, level, notes, and test file
- Study plans are generated dynamically based on selected days
- All data persists across browser sessions using localStorage

## Future Enhancements
- Integration with actual Git repository for file storage
- Real backend API for data persistence
- Advanced PDF annotation features
- Email notifications for students
