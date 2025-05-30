const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

class ApiClient {
  private getAuthHeaders() {
    if (typeof window === "undefined") {
      // Prevent localStorage error during SSR
      return { "Content-Type": "application/json" };
    }

    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;

    const response = await fetch(url, {
      ...options,
      headers: {
        ...this.getAuthHeaders(),
        ...options.headers,
      },
    });

    let data;
    try {
      data = await response.json();
    } catch {
      throw new Error("Invalid JSON response from server");
    }

    if (!response.ok) {
      throw new Error(data.message || "API request failed");
    }

    return data;
  }

  // ================= AUTH =================
  async login(email: string, password: string) {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  async register(email: string, password: string, name: string) {
    return this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password, name }),
    });
  }

  // ================= SURVEYS =================
  async getSurveys(params?: {
    status?: string;
    page?: number;
    limit?: number;
  }) {
    const queryString = params
      ? "?" + new URLSearchParams(params as any).toString()
      : "";
    return this.request(`/surveys${queryString}`);
  }

  async createSurvey(survey: {
    title: string;
    description: string;
    questions: any[];
  }) {
    return this.request("/surveys", {
      method: "POST",
      body: JSON.stringify(survey),
    });
  }

  async getSurvey(id: string) {
    return this.request(`/surveys/${id}`);
  }

  async updateSurvey(id: string, survey: any) {
    return this.request(`/surveys/${id}`, {
      method: "PUT",
      body: JSON.stringify(survey),
    });
  }

  async deleteSurvey(id: string) {
    return this.request(`/surveys/${id}`, {
      method: "DELETE",
    });
  }

  async publishSurvey(id: string) {
    return this.request(`/surveys/${id}/publish`, {
      method: "POST",
    });
  }

  async duplicateSurvey(id: string) {
    return this.request(`/surveys/${id}/duplicate`, {
      method: "POST",
    });
  }

  // ================= RESPONSES =================
  async getSurveyResponses(
    surveyId: string,
    params?: { page?: number; limit?: number }
  ) {
    const queryString = params
      ? "?" + new URLSearchParams(params as any).toString()
      : "";
    return this.request(`/surveys/${surveyId}/responses${queryString}`);
  }

  async submitSurveyResponse(surveyId: string, response: any) {
    return this.request(`/surveys/${surveyId}/responses`, {
      method: "POST",
      body: JSON.stringify(response),
    });
  }
}

export const apiClient = new ApiClient();
