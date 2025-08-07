import './style.css'

// Student data storage with actual student information
// Use Vite's BASE_URL to ensure proper paths in both dev and production
const BASE_URL = import.meta.env.BASE_URL;

let studentsData = {
  student1: {
    name: 'Asma Muazi Al Malki',
    score: 31,
    level: 'elementary',
    notes: 'Current Level: A2 (23-40): Elementary\n\nYou handle simple conversations (e.g., shopping, hobbies) but make frequent errors.\n\nGaps: Past simple (played/went), future plans (going to), comparatives (bigger), and quantifiers (some/any).\n\nTo reach B1:\n• Focus on Grammar: Past simple irregular verbs (ate/saw), present perfect (have been), and modals (should/could).\n• Vocabulary: Travel, jobs, feelings, and common phrasal verbs (get up).\n• Practice: Watch English cartoons (e.g., Peppa Pig) with subtitles. Use grammar workbooks like English File Elementary.',
    testFile: `${BASE_URL}students/student1/Asma Muazi Al Malki Corrected.pdf`
  },
  student2: {
    name: 'Khalid Hassan Al-Ghamdi',
    score: 22,
    level: 'beginner',
    notes: 'Current Level: A1 (0-22): Beginner\n\nYou know basic phrases and simple vocabulary (e.g., colors, family, food).\nYou struggle with forming full sentences, questions, and everyday conversations.\n\nGrammar gaps: Present simple, articles (a/an/the), basic prepositions (in/on/at).\n\nTo reach A2:\n• Focus on Grammar: Present simple (e.g., I eat), plurals, and simple questions (Do you...?).\n• Vocabulary: Daily routines, household items, and common verbs.\n• Practice: Use apps like Duolingo or Memrise for foundational vocabulary. Write 3 sentences daily about your day (e.g., "I drink coffee").',
    testFile: `${BASE_URL}students/student2/Khalid Hassan AlGhamdi Corrected.pdf`
  },
  student3: {
    name: 'Meshal Almutairi',
    score: 35,
    level: 'elementary',
    notes: 'Current Level: A2 (23-40): Elementary\n\nYou handle simple conversations (e.g., shopping, hobbies) but make frequent errors.\n\nGaps: Past simple (played/went), future (going to), comparatives (bigger), and quantifiers (some/any).\n\nTo reach B1:\n• Focus on Grammar: Past simple irregular verbs (ate/saw), present perfect (have been), and modals (should/could).\n• Vocabulary: Travel, jobs, feelings, and common phrasal verbs (get up).\n• Practice: Watch English cartoons (e.g., Peppa Pig) with subtitles. Use grammar workbooks like English File Elementary.',
    testFile: `${BASE_URL}students/student3/Mashaiel Almutairi corrections.pdf`
  }
};

// Load data from localStorage
function loadData() {
  const saved = localStorage.getItem('nesmaStudentsData');
  if (saved) {
    const savedData = JSON.parse(saved);
    // Merge saved data with default data, preserving PDF file paths
    Object.keys(studentsData).forEach(studentId => {
      if (savedData[studentId]) {
        // Keep the default testFile path but allow other fields to be updated
        studentsData[studentId] = {
          ...studentsData[studentId],
          ...savedData[studentId],
          testFile: studentsData[studentId].testFile // Always use the default PDF path
        };
      }
    });
  }
}

// Save data to localStorage
function saveData() {
  localStorage.setItem('nesmaStudentsData', JSON.stringify(studentsData));
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  initializeNavigation();
  initializeDashboardCards();
  initializeModals();
  initializeStudentCards();
  initializeStudyPlan();
  updateDashboard();
  
  // Load any saved data from localStorage and merge with default data
  loadData();
});

// Dashboard card navigation
function initializeDashboardCards() {
  const dashboardCards = document.querySelectorAll('.dashboard-card');
  
  dashboardCards.forEach((card, index) => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', () => {
      let targetSection;
      
      // Map dashboard cards to sections
      switch(index) {
        case 0: // Total Students card
          targetSection = 'students';
          break;
        case 1: // Course Duration card
          targetSection = 'study-plan';
          break;
        case 2: // Progress Tracking card
          targetSection = 'students'; // or could be 'study-plan'
          break;
        default:
          targetSection = 'dashboard';
      }
      
      // Navigate to the target section
      navigateToSection(targetSection);
    });
    
    // Add hover effect for better UX
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-12px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(-8px) scale(1)';
    });
  });
}

// Helper function to navigate to a section
function navigateToSection(sectionName) {
  const navButtons = document.querySelectorAll('.nav-btn');
  const sections = document.querySelectorAll('.content-section');
  
  // Update active nav button
  navButtons.forEach(btn => btn.classList.remove('active'));
  const targetNavBtn = document.querySelector(`[data-section="${sectionName}"]`);
  if (targetNavBtn) {
    targetNavBtn.classList.add('active');
  }
  
  // Update active section
  sections.forEach(section => section.classList.remove('active'));
  const targetSection = document.getElementById(sectionName);
  if (targetSection) {
    targetSection.classList.add('active');
  }
}

// Navigation functionality
function initializeNavigation() {
  const navButtons = document.querySelectorAll('.nav-btn');
  const sections = document.querySelectorAll('.content-section');
  
  navButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetSection = button.dataset.section;
      
      // Update active nav button
      navButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Update active section
      sections.forEach(section => section.classList.remove('active'));
      document.getElementById(targetSection).classList.add('active');
    });
  });
}

// Modal functionality
function initializeModals() {
  const modals = document.querySelectorAll('.modal');
  const closeButtons = document.querySelectorAll('.close');
  
  closeButtons.forEach(button => {
    button.addEventListener('click', closeModal);
  });
  
  // Close modal when clicking outside
  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  });
  
  // Cancel buttons
  document.querySelectorAll('.cancel').forEach(button => {
    button.addEventListener('click', closeModal);
  });
}

function openModal(modalId) {
  document.getElementById(modalId).classList.add('active');
}

function closeModal() {
  document.querySelectorAll('.modal').forEach(modal => {
    modal.classList.remove('active');
  });
}

// Student card functionality
function initializeStudentCards() {
  // View test buttons
  document.querySelectorAll('.view-test').forEach(button => {
    button.addEventListener('click', (e) => {
      const studentId = e.target.dataset.student;
      openPDFViewer(studentId);
    });
  });
  
  // View analysis buttons
  document.querySelectorAll('.view-analysis').forEach(button => {
    button.addEventListener('click', (e) => {
      const studentId = e.target.dataset.student;
      openAnalysisModal(studentId);
    });
  });
}

function openPDFViewer(studentId) {
  const student = studentsData[studentId];
  document.getElementById('modal-title').textContent = `${student.name} - Placement Test`;
  
  const pdfViewer = document.getElementById('pdf-viewer');
  
  if (student.testFile) {
    // Show the PDF file
    pdfViewer.innerHTML = `
      <div style="text-align: center; margin-bottom: 1rem;">
        <p style="color: #2c3e50; font-weight: 500;">Corrected Placement Test</p>
      </div>
      <iframe src="${student.testFile}" width="100%" height="600px" style="border: none; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
        <p>Your browser doesn't support PDF viewing. <a href="${student.testFile}" target="_blank" style="color: #3498db; text-decoration: none;">Download the PDF</a> instead.</p>
      </iframe>
      <div style="text-align: center; margin-top: 1rem;">
        <a href="${student.testFile}" target="_blank" class="btn-secondary" style="text-decoration: none;">
          <span class="btn-icon">📄</span>
          Open in New Tab
        </a>
      </div>
    `;
  } else {
    // Show message that no test is available
    pdfViewer.innerHTML = `
      <div class="pdf-placeholder">
        <div class="upload-area">
          <p>📄 No placement test available for ${student.name}</p>
          <p style="margin-top: 1rem; font-size: 0.9rem; color: #666;">
            To add a placement test, place the PDF file in:<br>
            <code>public/students/${studentId}/</code>
          </p>
        </div>
      </div>
    `;
  }
  
  openModal('pdf-modal');
}

function openAnalysisModal(studentId) {
  const student = studentsData[studentId];
  
  // Update modal title
  document.getElementById('analysis-title').textContent = `${student.name} - Level Analysis`;
  
  // Update score display
  document.getElementById('analysis-score').textContent = `${student.score}/70`;
  
  // Update level badge
  const levelBadge = document.getElementById('analysis-level');
  levelBadge.textContent = student.level.charAt(0).toUpperCase() + student.level.slice(1);
  
  // Set level badge color based on level
  levelBadge.className = 'level-badge';
  if (student.level === 'beginner') {
    levelBadge.style.background = 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)';
  } else if (student.level === 'elementary') {
    levelBadge.style.background = 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)';
  } else if (student.level === 'intermediate') {
    levelBadge.style.background = 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)';
  } else if (student.level === 'upper-intermediate') {
    levelBadge.style.background = 'linear-gradient(135deg, #9b59b6 0%, #8e44ad 100%)';
  } else if (student.level === 'advanced') {
    levelBadge.style.background = 'linear-gradient(135deg, #27ae60 0%, #229954 100%)';
  }
  
  // Update analysis notes
  document.getElementById('analysis-notes').textContent = student.notes;
  
  openModal('analysis-modal');
}

function updateStudentCard(studentId) {
  const student = studentsData[studentId];
  const card = document.querySelector(`[data-student="${studentId}"]`);
  
  if (card) {
    const nameElement = card.querySelector('.student-info h3');
    const statusElement = card.querySelector('.student-info p');
    
    nameElement.textContent = student.name;
    
    if (student.score !== null && student.score !== undefined) {
      statusElement.textContent = `Score: ${student.score}/70 (${student.level})`;
      statusElement.style.color = '#2c3e50';
      statusElement.style.fontWeight = '500';
    } else {
      statusElement.textContent = 'Placement Test: Available';
      statusElement.style.color = '#7f8c8d';
      statusElement.style.fontWeight = '400';
    }
  }
}

// Study plan functionality
function initializeStudyPlan() {
  // Study plan is now static content - no dynamic functionality needed
}

// File management note
// To add new PDFs: Place PDF files in public/students/[studentId]/ folder
// To add new students: 
// 1. Create new folder in public/students/ (e.g., student4)
// 2. Add PDF file to that folder
// 3. Update studentsData object with new student information

// Dashboard updates
function updateDashboard() {
  // Update student cards with current data
  Object.keys(studentsData).forEach(studentId => {
    updateStudentCard(studentId);
  });
}

// Notification system
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  let backgroundColor;
  
  switch(type) {
    case 'success':
      backgroundColor = '#4CAF50';
      break;
    case 'error':
      backgroundColor = '#f44336';
      break;
    case 'info':
      backgroundColor = '#2196F3';
      break;
    default:
      backgroundColor = '#4CAF50';
  }
  
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${backgroundColor};
    color: white;
    padding: 1rem 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    z-index: 3000;
    animation: slideIn 0.3s ease;
    font-weight: 500;
  `;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
`;
document.head.appendChild(style);
