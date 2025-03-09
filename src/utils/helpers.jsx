/**
 * Utility functions for the ResumeGPT application
 */

/**
 * Format a date to a readable string
 * @param {Date|string} date - Date to format
 * @param {Object} options - Options for formatting
 * @returns {string} Formatted date string
 */
export const formatDate = (date, options = {}) => {
    const dateObj = date instanceof Date ? date : new Date(date);
    
    const defaultOptions = {
      format: 'medium', // 'short', 'medium', 'long', 'full'
      includeTime: false,
    };
    
    const opts = { ...defaultOptions, ...options };
    
    if (isNaN(dateObj.getTime())) {
      return 'Invalid date';
    }
    
    let dateTimeFormat;
    
    switch (opts.format) {
      case 'short':
        dateTimeFormat = new Intl.DateTimeFormat('en-US', {
          month: 'numeric',
          day: 'numeric',
          year: '2-digit',
          ...(opts.includeTime ? { hour: 'numeric', minute: 'numeric' } : {})
        });
        break;
      case 'medium':
        dateTimeFormat = new Intl.DateTimeFormat('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          ...(opts.includeTime ? { hour: 'numeric', minute: 'numeric' } : {})
        });
        break;
      case 'long':
        dateTimeFormat = new Intl.DateTimeFormat('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
          ...(opts.includeTime ? { hour: 'numeric', minute: 'numeric', second: 'numeric' } : {})
        });
        break;
      case 'full':
        dateTimeFormat = new Intl.DateTimeFormat('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric',
          ...(opts.includeTime ? { hour: 'numeric', minute: 'numeric', second: 'numeric' } : {})
        });
        break;
      default:
        dateTimeFormat = new Intl.DateTimeFormat('en-US');
    }
    
    return dateTimeFormat.format(dateObj);
  };
  
  /**
   * Truncate text to a specified length
   * @param {string} text - Text to truncate
   * @param {number} maxLength - Maximum length
   * @returns {string} Truncated text
   */
  export const truncateText = (text, maxLength = 100) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };
  
  /**
   * Calculate the percentage match between two sets of skills
   * @param {Array} userSkills - User's skills
   * @param {Array} requiredSkills - Required skills for the job
   * @returns {number} Percentage match
   */
  export const calculateSkillMatchPercentage = (userSkills, requiredSkills) => {
    if (!userSkills || !requiredSkills || requiredSkills.length === 0) return 0;
    
    const matches = requiredSkills.filter(skill => 
      userSkills.some(userSkill => 
        userSkill.toLowerCase().includes(skill.toLowerCase()) || 
        skill.toLowerCase().includes(userSkill.toLowerCase())
      )
    );
    
    return Math.round((matches.length / requiredSkills.length) * 100);
  };
  
  /**
   * Extract the file extension from a filename
   * @param {string} filename - Filename to extract extension from
   * @returns {string} File extension (without the dot)
   */
  export const getFileExtension = (filename) => {
    if (!filename) return '';
    return filename.split('.').pop().toLowerCase();
  };
  
  /**
   * Check if a file is a valid resume file type
   * @param {File} file - File to check
   * @returns {boolean} Whether the file is a valid resume file
   */
  export const isValidResumeFile = (file) => {
    if (!file) return false;
    
    const allowedTypes = ['pdf', 'doc', 'docx', 'txt', 'rtf'];
    const extension = getFileExtension(file.name);
    
    return allowedTypes.includes(extension);
  };
  
  /**
   * Format file size to a human-readable string
   * @param {number} bytes - Size in bytes
   * @returns {string} Formatted size
   */
  export const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  /**
   * Debounce function to limit how often a function is called
   * @param {Function} func - Function to debounce
   * @param {number} wait - Milliseconds to wait
   * @returns {Function} Debounced function
   */
  export const debounce = (func, wait = 300) => {
    let timeout;
    
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };
  
  /**
   * Generate a unique ID
   * @returns {string} Unique ID
   */
  export const generateUniqueId = () => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  };