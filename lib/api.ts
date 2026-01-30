import { supabase } from "@/lib/supabaseProvider";

// Retrieve the API URL from your environment
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.cobelcenter.com";

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

/**
 * CORE REQUEST HANDLER
 * Manages JWT tokens from Supabase to secure the Cobel AI Engine.
 */
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  // Get the latest session directly from the Supabase client
  const { data: { session } } = await supabase.auth.getSession();
  const token = session?.access_token;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const formattedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const response = await fetch(`${API_URL}${formattedEndpoint}`, {
      ...options,
      headers,
    });

    // Handle 401 Unauthorized (Session expired)
    if (response.status === 401) {
       console.error("Cobel AI Engine: Session expired or invalid.");
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        error: errorData.message || `API Error: ${response.status}`,
      };
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'Network failure in Cobel Engine.',
    };
  }
}

/**
 * FEATURE 4: ANALOG-TO-DIGITAL PEDAGOGICAL BRIDGE
 * Ingests handwriting OCR data to update bilingual fluency profiles.
 */
export async function submitHandwritingAnalysis(
  userId: string,
  analysisPayload: { terms: string[]; language: 'en' | 'fr'; raw_text: string }
): Promise<ApiResponse<any>> {
  return apiRequest(`/users/${userId}/handwriting-sync`, {
    method: 'POST',
    body: JSON.stringify(analysisPayload),
  });
}

/**
 * TEMPORAL OPTIMIZATION FORECAST
 * Retrieves the specific milestone data for the student dashboard.
 */
export async function getMilestoneForecast(enrollmentId: string): Promise<ApiResponse<any>> {
  return apiRequest(`/enrollments/${enrollmentId}/forecast`);
}

/**
 * COURSE DATA FETCHER
 */
export async function getCourses(): Promise<ApiResponse<any>> {
  return apiRequest('/courses');
}
