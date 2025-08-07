// Schedule Configuration Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
  initializeSchedulePage();
  loadSavedSchedule();
  initializeEventListeners();
});

// Initialize the schedule page
function initializeSchedulePage() {
  // Set default date to today
  const today = new Date();
  const dateInput = document.getElementById('start-date');
  if (dateInput) {
    dateInput.value = today.toISOString().split('T')[0];
  }

  // Set default recommended days (Sunday, Tuesday, Thursday)
  const recommendedDays = ['Sunday', 'Tuesday', 'Thursday'];
  recommendedDays.forEach(day => {
    const checkbox = document.getElementById(`day-${day.toLowerCase()}`);
    if (checkbox) {
      checkbox.checked = true;
    }
  });
}

// Load saved schedule configuration from localStorage
function loadSavedSchedule() {
  const savedSchedule = localStorage.getItem('scheduleConfig');
  if (savedSchedule) {
    try {
      const config = JSON.parse(savedSchedule);
      
      // Load form values
      if (config.startDate) {
        document.getElementById('start-date').value = config.startDate;
      }
      if (config.duration) {
        document.getElementById('duration').value = config.duration;
      }
      if (config.daysPerWeek) {
        document.getElementById('days-per-week').value = config.daysPerWeek;
      }
      if (config.classTime) {
        document.getElementById('class-time').value = config.classTime;
      }
      if (config.sessionDuration) {
        document.getElementById('session-duration').value = config.sessionDuration;
      }
      
      // Load selected days
      if (config.selectedDays) {
        // Clear all checkboxes first
        document.querySelectorAll('.days-selector input[type="checkbox"]').forEach(cb => {
          cb.checked = false;
        });
        
        // Check the saved days
        config.selectedDays.forEach(day => {
          const checkbox = document.getElementById(`day-${day.toLowerCase()}`);
          if (checkbox) {
            checkbox.checked = true;
          }
        });
      }
      
      showNotification('Previous schedule configuration loaded successfully!');
    } catch (error) {
      console.error('Error loading saved schedule:', error);
    }
  }
}

// Initialize event listeners
function initializeEventListeners() {
  // Save schedule button
  document.getElementById('save-schedule')?.addEventListener('click', saveScheduleConfiguration);
  
  // Generate calendar button
  document.getElementById('generate-calendar')?.addEventListener('click', generateScheduleCalendar);
  
  // Days per week change handler
  document.getElementById('days-per-week')?.addEventListener('change', handleDaysPerWeekChange);
  
  // Form input change handlers for auto-save
  const formInputs = document.querySelectorAll('.form-input, .days-selector input');
  formInputs.forEach(input => {
    input.addEventListener('change', debounce(autoSaveSchedule, 1000));
  });
}

// Handle days per week selection change
function handleDaysPerWeekChange() {
  const daysPerWeek = parseInt(document.getElementById('days-per-week').value);
  const checkboxes = document.querySelectorAll('.days-selector input[type="checkbox"]');
  const checkedCount = document.querySelectorAll('.days-selector input[type="checkbox"]:checked').length;
  
  if (checkedCount !== daysPerWeek) {
    showNotification(`Please select exactly ${daysPerWeek} days for your weekly schedule.`, 'warning');
  }
}

// Save schedule configuration
function saveScheduleConfiguration() {
  const selectedDays = [];
  document.querySelectorAll('.days-selector input[type="checkbox"]:checked').forEach(checkbox => {
    selectedDays.push(checkbox.value);
  });
  
  const daysPerWeek = parseInt(document.getElementById('days-per-week').value);
  
  if (selectedDays.length !== daysPerWeek) {
    showNotification(`Please select exactly ${daysPerWeek} days for your weekly schedule.`, 'error');
    return;
  }
  
  if (!document.getElementById('start-date').value) {
    showNotification('Please select a start date.', 'error');
    return;
  }
  
  const scheduleConfig = {
    startDate: document.getElementById('start-date').value,
    duration: document.getElementById('duration').value,
    daysPerWeek: daysPerWeek,
    selectedDays: selectedDays,
    classTime: document.getElementById('class-time').value,
    sessionDuration: document.getElementById('session-duration').value,
    savedAt: new Date().toISOString()
  };
  
  localStorage.setItem('scheduleConfig', JSON.stringify(scheduleConfig));
  showNotification('Schedule configuration saved successfully!', 'success');
}

// Auto-save schedule configuration
function autoSaveSchedule() {
  const selectedDays = [];
  document.querySelectorAll('.days-selector input[type="checkbox"]:checked').forEach(checkbox => {
    selectedDays.push(checkbox.value);
  });
  
  const scheduleConfig = {
    startDate: document.getElementById('start-date').value,
    duration: document.getElementById('duration').value,
    daysPerWeek: document.getElementById('days-per-week').value,
    selectedDays: selectedDays,
    classTime: document.getElementById('class-time').value,
    sessionDuration: document.getElementById('session-duration').value,
    autoSavedAt: new Date().toISOString()
  };
  
  localStorage.setItem('scheduleConfig', JSON.stringify(scheduleConfig));
}

// Generate schedule calendar
function generateScheduleCalendar() {
  const selectedDays = [];
  document.querySelectorAll('.days-selector input[type="checkbox"]:checked').forEach(checkbox => {
    selectedDays.push(checkbox.value);
  });
  
  const daysPerWeek = parseInt(document.getElementById('days-per-week').value);
  
  if (selectedDays.length !== daysPerWeek) {
    showNotification(`Please select exactly ${daysPerWeek} days for your weekly schedule.`, 'error');
    return;
  }
  
  const startDate = document.getElementById('start-date').value;
  if (!startDate) {
    showNotification('Please select a start date.', 'error');
    return;
  }
  
  const duration = parseInt(document.getElementById('duration').value);
  const classTime = document.getElementById('class-time').value;
  const sessionDuration = document.getElementById('session-duration').value;
  
  const calendar = createScheduleCalendar(selectedDays, startDate, duration, classTime, sessionDuration);
  document.getElementById('schedule-calendar').innerHTML = calendar;
  
  showNotification('Schedule calendar generated successfully!', 'success');
}

// Create schedule calendar HTML
function createScheduleCalendar(classDays, startDate, durationWeeks, classTime, sessionDuration) {
  const start = new Date(startDate);
  const sessions = [];
  
  // Calculate all class sessions
  let currentDate = new Date(start);
  let sessionCount = 0;
  const totalSessions = durationWeeks * classDays.length;
  
  while (sessionCount < totalSessions) {
    const dayName = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
    
    if (classDays.includes(dayName)) {
      sessions.push({
        date: new Date(currentDate),
        sessionNumber: sessionCount + 1,
        dayName: dayName
      });
      sessionCount++;
    }
    
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  // Group sessions by week
  const weeklySchedule = [];
  for (let i = 0; i < sessions.length; i += classDays.length) {
    weeklySchedule.push(sessions.slice(i, i + classDays.length));
  }
  
  let calendarHTML = `
    <div class="calendar-header">
      <h4>Course Schedule (${durationWeeks} weeks, ${classDays.length} days/week)</h4>
      <p class="schedule-details">
        <strong>Class Time:</strong> ${formatTime(classTime)} 
        <strong>Duration:</strong> ${sessionDuration} minutes
        <strong>Total Sessions:</strong> ${totalSessions}
      </p>
    </div>
    <div class="weekly-schedule">
  `;
  
  weeklySchedule.forEach((week, weekIndex) => {
    calendarHTML += `
      <div class="week-card">
        <h5 class="week-title">Week ${weekIndex + 1}</h5>
        <div class="sessions-grid">
    `;
    
    week.forEach(session => {
      const dateStr = session.date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      });
      
      calendarHTML += `
        <div class="session-card">
          <div class="session-number">Session ${session.sessionNumber}</div>
          <div class="session-date">${session.dayName}</div>
          <div class="session-details">${dateStr}</div>
          <div class="session-time">${formatTime(classTime)}</div>
        </div>
      `;
    });
    
    calendarHTML += `
        </div>
      </div>
    `;
  });
  
  calendarHTML += '</div>';
  
  return calendarHTML;
}

// Format time for display
function formatTime(timeString) {
  const [hours, minutes] = timeString.split(':');
  const time = new Date();
  time.setHours(parseInt(hours), parseInt(minutes));
  
  return time.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

// Utility function for debouncing
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Notification system (reused from main.js)
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  let backgroundColor;
  
  switch(type) {
    case 'success':
      backgroundColor = 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)';
      break;
    case 'error':
      backgroundColor = 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)';
      break;
    case 'warning':
      backgroundColor = 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)';
      break;
    default:
      backgroundColor = 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)';
  }
  
  notification.style.cssText = `
    position: fixed;
    top: 2rem;
    right: 2rem;
    background: ${backgroundColor};
    color: white;
    padding: 1rem 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    z-index: 3000;
    animation: slideIn 0.3s ease;
    font-weight: 500;
    max-width: 300px;
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
  }, 4000);
}

// Add CSS animations for notifications if not already present
if (!document.querySelector('#schedule-animations')) {
  const style = document.createElement('style');
  style.id = 'schedule-animations';
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
}
