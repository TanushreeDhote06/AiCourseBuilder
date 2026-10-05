import React, { useState, useRef } from 'react';
import '../../../style/home.scss';

/**
 * UI Layer: Home / Interview Plan Generation Page
 * Following the 4-layer React architecture (UI -> Hook -> State -> API).
 * This component handles user interaction, form inputs, and visual presentation.
 */
const Home = ({
  onSubmit,
  initialJobDescription = '',
  initialSelfDescription = '',
  isLoading = false
}) => {
  const [jobDescription, setJobDescription] = useState(initialJobDescription);
  const [selfDescription, setSelfDescription] = useState(initialSelfDescription);
  const [resumeFile, setResumeFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef(null);

  const handleJobDescChange = (e) => {
    if (e.target.value.length <= 5000) {
      setJobDescription(e.target.value);
    }
  };

  const handleSelfDescChange = (e) => {
    setSelfDescription(e.target.value);
  };

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setResumeFile(file);
    }
  };

  const handleRemoveFile = (e) => {
    e.stopPropagation();
    setResumeFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({
        jobDescription,
        selfDescription,
        resumeFile
      });
    }
  };

  return (
    <main className="home-page">
      {/* Header Section */}
      <header className="header-section">
        <h1 className="main-title">
          Create Your Custom <span className="highlight-pink">Interview Plan</span>
        </h1>
        <p className="subtitle">
          Let our AI analyze the job requirements and your unique profile to build a winning strategy.
        </p>
      </header>

      {/* Main Card Container */}
      <form className="interview-card" onSubmit={handleSubmit}>
        <div className="card-columns-wrapper">
          {/* Left Column: Target Job Description */}
          <section className="left-column">
            <div className="section-header">
              <div className="header-title-group">
                <span className="header-icon" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                  </svg>
                </span>
                <h2>Target Job Description</h2>
              </div>
              <span className="badge-required">REQUIRED</span>
            </div>

            <div className="textarea-container">
              <textarea
                id="jobDescription"
                name="jobDescription"
                className="job-textarea"
                placeholder="Paste the full job description here...&#10;e.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'"
                value={jobDescription}
                onChange={handleJobDescChange}
                maxLength={5000}
                required
              />
              <span className="char-count">{jobDescription.length} / 5000 chars</span>
            </div>
          </section>

          {/* Right Column: Your Profile */}
          <section className="right-column">
            <div className="section-header">
              <div className="header-title-group">
                <span className="header-icon" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                <h2>Your Profile</h2>
              </div>
            </div>

            {/* Sub-section 1: Upload Resume */}
            <div className="sub-section">
              <div className="sub-section-header">
                <h3>Upload Resume</h3>
                <span className="badge-best-results">BEST RESULTS</span>
              </div>

              <div
                className={`upload-dropzone ${isDragging ? 'dragging' : ''}`}
                onClick={handleFileClick}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleFileClick();
                  }
                }}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  id="resume"
                  name="resume"
                  accept=".pdf,.docx,.doc"
                  onChange={handleFileChange}
                  hidden
                />

                <svg className="upload-cloud-icon" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                  <path d="M12 12v9" />
                  <path d="m16 16-4-4-4 4" />
                </svg>

                <p className="upload-prompt-text">Click to upload or drag & drop</p>
                <p className="upload-sub-text">PDF or DOCX (Max 5MB)</p>

                {resumeFile && (
                  <div className="file-preview">
                    <span className="file-name" title={resumeFile.name}>{resumeFile.name}</span>
                    <button
                      type="button"
                      className="remove-file-btn"
                      onClick={handleRemoveFile}
                      aria-label="Remove uploaded file"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* OR Divider */}
            <div className="or-divider">
              <span>OR</span>
            </div>

            {/* Sub-section 2: Quick Self-Description */}
            <div className="sub-section">
              <div className="sub-section-header">
                <h3>Quick Self-Description</h3>
              </div>

              <div className="self-desc-container">
                <textarea
                  id="selfDescription"
                  name="selfDescription"
                  className="self-desc-textarea"
                  placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                  value={selfDescription}
                  onChange={handleSelfDescChange}
                />
              </div>
            </div>

            {/* Sub-section 3: Info Notice Box */}
            <div className="info-notice-box">
              <span className="info-circle-icon" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
              </span>
              <p className="notice-text">
                Either a <strong>Resume</strong> or a <strong>Self Description</strong> is required to generate a personalized plan.
              </p>
            </div>
          </section>
        </div>

        {/* Footer Bar */}
        <footer className="card-footer-bar">
          <div className="footer-meta">
            <span>AI-Powered Strategy Generation · Approx 30s</span>
          </div>
          <button
            type="submit"
            className="generate-strategy-btn"
            disabled={isLoading}
          >
            <svg className="star-icon" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span>{isLoading ? 'Generating Plan...' : 'Generate My Interview Strategy'}</span>
          </button>
        </footer>
      </form>
    </main>
  );
};

export default Home;