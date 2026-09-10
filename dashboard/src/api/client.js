// ==============================|| CENTRALIZED BACKEND API CLIENT ||============================== //

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export async function apiRequest(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      },
      ...options
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.warn(`API request to ${endpoint} failed, utilizing local fallback:`, error.message);
    throw error;
  }
}
