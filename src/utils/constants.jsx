/**
 * Application-wide constants for ResumeGPT
 */

// API Endpoints
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';
export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  REFRESH_TOKEN: '/auth/refresh-token',
  LOGOUT: '/auth/logout',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  
  // Resume endpoints
  ANALYZE_RESUME: '/resume/analyze',
  UPLOAD_RESUME: '/resume/upload',
  GET_HISTORY: '/resume/history',
  GET_ANALYSIS: '/resume/analysis',
  DELETE_ANALYSIS: '/resume/analysis',
  
  // User endpoints
  GET_USER_PROFILE: '/users/me',
  UPDATE_USER_PROFILE: '/users/me',
  CHANGE_PASSWORD: '/users/password',
};

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'resumegpt_auth_token',
  USER_DATA: 'resumegpt_user',
  THEME: 'resumegpt_theme',
  ANALYTICS_CONSENT: 'resumegpt_analytics_consent',
};

// File upload constraints
export const UPLOAD_CONSTRAINTS = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_FILE_TYPES: [
    'application/pdf', 
    'application/msword', 
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
    'application/rtf',
  ],
  ALLOWED_EXTENSIONS: ['.pdf', '.doc', '.docx', '.txt', '.rtf'],
};

// Skill categories
export const SKILL_CATEGORIES = {
  TECHNICAL: 'technical',
  SOFT: 'soft',
};

// Skill match levels
export const MATCH_LEVELS = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
  NONE: 'none',
};

// Color schemes for UI elements
export const COLORS = {
  PRIMARY: '#3B82F6', // Blue
  SECONDARY: '#6B7280', // Gray
  SUCCESS: '#10B981', // Green
  DANGER: '#EF4444', // Red
  WARNING: '#F59E0B', // Amber
  INFO: '#3B82F6', // Blue
  LIGHT: '#F3F4F6', // Light Gray
  DARK: '#1F2937', // Dark Gray
  
  // Skill match colors
  MATCH_HIGH: '#10B981', // Green
  MATCH_MEDIUM: '#F59E0B', // Amber
  MATCH_LOW: '#EF4444', // Red
  
  // Chart colors
  CHART_COLORS: [
    '#3B82F6', // Blue
    '#10B981', // Green
    '#F59E0B', // Amber
    '#EF4444', // Red
    '#8B5CF6', // Purple
    '#EC4899', // Pink
    '#F97316', // Orange
    '#14B8A6', // Teal
  ],
};

// Animation durations
export const ANIMATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
};

// Breakpoints for responsive design
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
};

// Default pagination settings
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 20, 50],
};

// Notification settings
export const NOTIFICATION = {
  AUTO_DISMISS_DURATION: 5000, // 5 seconds
  POSITION: 'top-right',
};

// Form validation error messages
export const VALIDATION_ERRORS = {
  REQUIRED: 'This field is required',
  EMAIL: 'Please enter a valid email address',
  PASSWORD_LENGTH: 'Password must be at least 8 characters long',
  PASSWORD_MATCH: 'Passwords do not match',
  FILE_SIZE: 'File size exceeds the maximum limit',
  FILE_TYPE: 'File type is not supported',
};