const BASE_URL = 'http://localhost:8080/api';

export const apiClient = {
  async fetchHistory() {
    const response = await fetch(`${BASE_URL}/history`);
    if (!response.ok) throw new Error('Failed to fetch history');
    return response.json();
  },

  async fetchDashboardStats() {
    const response = await fetch(`${BASE_URL}/dashboard/stats`);
    if (!response.ok) throw new Error('Failed to fetch dashboard stats');
    return response.json();
  },

  async analyzeProfile(username: string) {
    const response = await fetch(`${BASE_URL}/analyze/${username}`);
    if (!response.ok) throw new Error('Analysis failed');
    return response.json();
  }
};
