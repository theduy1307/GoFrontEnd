/**
 * API Constants Configuration
 * Defines base URLs and API structure for the application
 */

// Environment configuration
const API_HOST = 'http://localhost:8000'

// API Names
export const API_NAMES = {
  MASTER_DATA: 'masterdata',
  TIME_ATTENDANCE: 'timeattendance'
}

// API Base URLs
export const API_BASE_URLS = {
  MASTER_DATA: `${API_HOST}/${API_NAMES.MASTER_DATA}/api/v1`,
  TIME_ATTENDANCE: `${API_HOST}/${API_NAMES.TIME_ATTENDANCE}/api/v1`
}

// Default API (used by axios client)
export const DEFAULT_API_BASE_URL = API_BASE_URLS.MASTER_DATA

// API Version
export const API_VERSION = 'v1'

// Protocol and host configuration
export const API_CONFIG = {
  HOST: API_HOST,
  PROTOCOL: 'http',
  PORT: 8000
}

/**
 * Export default configuration for easy access
 */
export default {
  API_BASE_URLS,
  API_NAMES,
  DEFAULT_API_BASE_URL,
  API_CONFIG,
  API_VERSION
}
