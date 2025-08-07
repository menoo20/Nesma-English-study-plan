# Nesma English Course Management System

A responsive web application for managing English placement tests, student records, and study plans for Nesma company employees.

## Features

### 📚 Student Management
- Individual student profiles for up to 3 students
- Placement test score tracking
- English level assessment (Beginner to Advanced)
- Personal notes and progress tracking
- PDF placement test upload and viewing

### 📅 Study Plan Generator
- Dynamic calendar generation for one-month courses
- Flexible 3-day weekly schedule configuration
- Weekly study topics and curriculum outline
- Visual calendar with class day highlighting

### 📄 PDF Management
- Upload and view placement test PDFs for each student
- Browser-based PDF viewing
- Local storage for file persistence
- Future Git repository integration ready

### 🎨 Responsive Design
- Mobile-first responsive layout
- Modern glassmorphism design
- Smooth animations and transitions
- Accessible navigation and forms

## Technology Stack

- **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3
- **Build Tool**: Vite
- **Storage**: Browser localStorage
- **Styling**: CSS Grid, Flexbox, CSS Custom Properties
- **Fonts**: Google Fonts (Inter)

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd plan-and-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

### Adding Student Records
1. Navigate to the "Students" section
2. Click "Update Record" on any student card
3. Fill in the student information:
   - Name
   - Test Score (0-100)
   - Current Level
   - Notes
4. Save the record

### Uploading Placement Tests
1. Click "View Test" on a student card
2. Click "Choose PDF File" to upload a placement test
3. The PDF will be stored locally and can be viewed anytime

### Creating Study Plans
1. Go to the "Study Plan" section
2. Select exactly 3 days of the week for classes
3. Click "Generate Study Plan"
4. View the generated calendar with class days highlighted

## File Structure

```
plan-and-website/
├── public/
│   ├── students/          # Student data storage
│   └── pdfs/             # PDF files storage
├── src/
│   ├── main.js           # Main application logic
│   └── style.css         # Application styles
├── index.html            # Main HTML file
├── package.json          # Dependencies and scripts
└── README.md            # This file
```

## Data Storage

Currently, all data is stored in the browser's localStorage. In a production environment, this would be replaced with:
- Backend API for student data
- Cloud storage for PDF files
- Database for persistent storage

## Future Enhancements

- [ ] Backend API integration
- [ ] Real Git repository file uploads
- [ ] Email notifications for students
- [ ] Advanced PDF annotation tools
- [ ] Progress tracking charts
- [ ] Export functionality for reports
- [ ] Multi-language support

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support or questions, please contact the development team or create an issue in the repository.
