// Final Production Configuration for Cobel Business Training Center
const getBaseUrl = () => {
  if (typeof window !== 'undefined') return '/api'; // Browser: relative path
  
  // Prioritize your custom domain variable
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, ''); // Remove trailing slash if present
  }
  
  // Vercel deployment fallback
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}/api`;
  
  return 'http://localhost:3000/api'; // Local dev fallback
};

export const API_BASE_URL = getBaseUrl();

export const config = {
  apiUrl: API_BASE_URL,
  timeout: 30000, 
  headers: {
    'Content-Type': 'application/json'
  }
};

export default config;
