// =============================================================================
// API Service - Backend Communication
// =============================================================================

const API_BASE = import.meta.env.DEV
    ? 'http://localhost:8787/api'
    : 'https://padillas-concrete-api.your-account.workers.dev/api';

/**
 * Make authenticated API request
 */
async function apiRequest(endpoint, options = {}) {
    const token = localStorage.getItem('adminToken');

    const headers = {
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    // Don't set Content-Type for FormData (browser sets it with boundary)
    if (!(options.body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers,
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || 'Request failed');
    }

    return data;
}

// =============================================================================
// Auth API
// =============================================================================

export async function login(username, password) {
    const data = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
    });

    if (data.token) {
        localStorage.setItem('adminToken', data.token);
    }

    return data;
}

export async function verifyToken() {
    try {
        const data = await apiRequest('/auth/verify');
        return data.success;
    } catch {
        localStorage.removeItem('adminToken');
        return false;
    }
}

export function logout() {
    localStorage.removeItem('adminToken');
}

// =============================================================================
// Projects API
// =============================================================================

export async function getProjects() {
    const data = await apiRequest('/projects');
    return data.projects || [];
}

export async function createProject(projectData) {
    return apiRequest('/projects', {
        method: 'POST',
        body: JSON.stringify(projectData),
    });
}

export async function updateProject(projectId, updates) {
    return apiRequest(`/projects/${projectId}`, {
        method: 'PUT',
        body: JSON.stringify(updates),
    });
}

export async function deleteProject(projectId) {
    return apiRequest(`/projects/${projectId}`, {
        method: 'DELETE',
    });
}

export async function uploadPhoto(projectId, file, type = 'gallery') {
    const formData = new FormData();
    formData.append('photo', file);
    formData.append('type', type);

    return apiRequest(`/projects/${projectId}/photos`, {
        method: 'POST',
        body: formData,
    });
}

export async function deletePhoto(projectId, photoId) {
    return apiRequest(`/projects/${projectId}/photos/${photoId}`, {
        method: 'DELETE',
    });
}
