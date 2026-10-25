import { Platform } from 'react-native';

// ============================================================
// Campix Configuration
// ============================================================

// Live Render backend
const PRODUCTION_API_URL = 'https://camp-ez6j.onrender.com';

// Optional environment or runtime overrides
const API_URL_FROM_ENV =
  process.env.EXPO_PUBLIC_API_BASE_URL ||
  (typeof globalThis !== 'undefined'
    ? globalThis.__API_BASE_URL__
    : undefined);

const AI_SERVICE_URL_FROM_ENV =
  process.env.EXPO_PUBLIC_AI_SERVICE_BASE_URL ||
  (typeof globalThis !== 'undefined'
    ? globalThis.__AI_SERVICE_BASE_URL__
    : undefined);

// ============================================================
// Default URLs
// ============================================================

function getDefaultApiUrl() {
  return PRODUCTION_API_URL;
}

function getDefaultAiServiceUrl() {
  switch (Platform.OS) {
    case 'android':
      return 'http://10.0.2.2:5050';
    default:
      return 'http://localhost:5050';
  }
}

// ============================================================
// Exported configuration
// ============================================================

export const API_BASE_URL =
  API_URL_FROM_ENV || getDefaultApiUrl();

export const AI_SERVICE_BASE_URL =
  AI_SERVICE_URL_FROM_ENV || getDefaultAiServiceUrl();

// ============================================================
// Debugging
// ============================================================

export function logConfig() {
  if (__DEV__) {
    console.log('=== Campix Configuration ===');
    console.log('Platform:', Platform.OS);
    console.log('API_BASE_URL:', API_BASE_URL);
    console.log('AI_SERVICE_BASE_URL:', AI_SERVICE_BASE_URL);
    console.log('============================');
  }
}

// ============================================================
// Validation
// ============================================================

export function validateConfig() {
  if (!API_BASE_URL) {
    throw new Error('API_BASE_URL is not configured');
  }

  if (!AI_SERVICE_BASE_URL) {
    throw new Error('AI_SERVICE_BASE_URL is not configured');
  }
}