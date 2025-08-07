# Git Repository File Upload Instructions

## For Adding Placement Test PDFs

Since this is a frontend-only application, PDF files can be added to the Git repository for persistent storage. Here's how to add placement test PDFs for each student:

### Directory Structure
```
public/
  students/
    student1/
      placement-test.pdf
      additional-assessments.pdf
    student2/
      placement-test.pdf
      additional-assessments.pdf
    student3/
      placement-test.pdf
      additional-assessments.pdf
```

### Steps to Add PDF Files

1. **Save PDF files to the correct student directory:**
   - Student 1 PDFs: `public/students/student1/`
   - Student 2 PDFs: `public/students/student2/`
   - Student 3 PDFs: `public/students/student3/`

2. **Name the files consistently:**
   - Main placement test: `placement-test.pdf`
   - Additional assessments: `assessment-[date].pdf`
   - Progress tests: `progress-[week].pdf`

3. **Commit and push to Git repository:**
   ```bash
   git add public/students/
   git commit -m "Add placement test PDFs for students"
   git push origin main
   ```

4. **Update the application:**
   - The application will automatically detect new PDF files
   - Students can view their tests through the web interface
   - Files are cached locally for offline viewing

### File Naming Conventions

- **placement-test.pdf** - Initial placement test
- **assessment-week1.pdf** - Weekly assessments
- **progress-month1.pdf** - Monthly progress reports
- **final-exam.pdf** - Final examination

### File Size Recommendations

- Keep PDF files under 5MB for optimal loading
- Compress large files before uploading
- Use PDF optimization tools if needed

### Security Notes

- Only add anonymized or authorized test materials
- Ensure student privacy is maintained
- Consider password-protecting sensitive documents

### Future Automation

In the future, the application could be enhanced with:
- Automatic file upload through web interface
- Direct Git integration for file management
- Cloud storage integration
- Automated file organization
