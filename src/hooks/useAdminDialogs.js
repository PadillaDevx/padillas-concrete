/**
 * Custom hook for admin form dialogs using SweetAlert2
 */
import Swal from 'sweetalert2';
import { showFormDialog, showLoading, showSuccess, showError, showConfirm, showDeleteConfirm, showSessionExpired } from '../utils/alerts';

// Form HTML templates
const templates = {
    project: (data = {}) => `
        <input id="swal-title" class="swal2-input" placeholder="Project Title" value="${data.title || ''}" required>
        <input id="swal-location" class="swal2-input" placeholder="Location (e.g., Luverne, MN)" value="${data.location || ''}">
        <textarea id="swal-description" class="swal2-textarea" placeholder="Description (optional)">${data.description || ''}</textarea>
    `,

    user: (data = {}) => `
        <input id="swal-username" class="swal2-input" placeholder="Username" value="${data.username || ''}" required>
        <input id="swal-password" type="password" class="swal2-input" placeholder="${data.id ? 'New Password (leave empty to keep)' : 'Password (min 6 chars)'}">
        <select id="swal-role" class="swal2-select">
            <option value="user" ${data.role === 'user' ? 'selected' : ''}>User (Photos only)</option>
            <option value="admin" ${data.role === 'admin' ? 'selected' : ''}>Admin (Full access)</option>
        </select>
    `,

    credentials: (username = '') => `
        <input id="swal-username" type="text" class="swal2-input" placeholder="New Username (optional)" value="${username}">
        <input id="swal-current" type="password" class="swal2-input" placeholder="Current Password">
        <input id="swal-new" type="password" class="swal2-input" placeholder="New Password (min 6 chars)">
        <input id="swal-confirm" type="password" class="swal2-input" placeholder="Confirm New Password">
    `,

    setupAccount: (username = '') => `
        <p class="text-gray-400 mb-4 text-sm">Please change your default credentials before continuing.</p>
        <input id="swal-username" type="text" class="swal2-input" placeholder="New Username (min 3 chars)" value="${username}">
        <input id="swal-current" type="password" class="swal2-input" placeholder="Current Password (admin)">
        <input id="swal-new" type="password" class="swal2-input" placeholder="New Password (min 6 chars)">
        <input id="swal-confirm" type="password" class="swal2-input" placeholder="Confirm New Password">
    `,
};

// Form validators
const validators = {
    project: () => {
        const title = document.getElementById('swal-title').value.trim();
        if (!title) return { error: 'Title is required' };
        return {
            title,
            location: document.getElementById('swal-location').value.trim(),
            description: document.getElementById('swal-description').value.trim(),
        };
    },

    user: (isEdit = false) => {
        const username = document.getElementById('swal-username').value.trim();
        const password = document.getElementById('swal-password').value;
        const role = document.getElementById('swal-role').value;

        if (!username) return { error: 'Username is required' };
        if (!isEdit && !password) return { error: 'Password is required' };
        if (password && password.length < 6) return { error: 'Password must be at least 6 characters' };

        const result = { username, role };
        if (password) result.password = password;
        return result;
    },

    credentials: (currentUsername) => {
        const newUsername = document.getElementById('swal-username').value.trim();
        const current = document.getElementById('swal-current').value;
        const newPass = document.getElementById('swal-new').value;
        const confirm = document.getElementById('swal-confirm').value;

        if (!current || !newPass || !confirm) return { error: 'Password fields are required' };
        if (newUsername && newUsername.length < 3) return { error: 'Username must be at least 3 characters' };
        if (newPass.length < 6) return { error: 'Password must be at least 6 characters' };
        if (newPass !== confirm) return { error: 'Passwords do not match' };

        return {
            currentPassword: current,
            newPassword: newPass,
            newUsername: newUsername !== currentUsername ? newUsername : null,
        };
    },

    setupAccount: () => {
        const newUsername = document.getElementById('swal-username').value.trim();
        const current = document.getElementById('swal-current').value;
        const newPass = document.getElementById('swal-new').value;
        const confirm = document.getElementById('swal-confirm').value;

        if (!newUsername || !current || !newPass || !confirm) return { error: 'All fields are required' };
        if (newUsername.length < 3) return { error: 'Username must be at least 3 characters' };
        if (newPass.length < 6) return { error: 'Password must be at least 6 characters' };
        if (newPass !== confirm) return { error: 'Passwords do not match' };

        return { currentPassword: current, newPassword: newPass, newUsername };
    },
};

/**
 * Hook for admin dialogs
 */
export function useAdminDialogs({ onAuthError }) {

    const handleError = (error, fallbackMessage) => {
        if (error.isAuthError) {
            onAuthError?.();
            return;
        }
        showError('Error', error.message || fallbackMessage);
    };

    // Project dialogs
    const projectDialog = async (project = null) => {
        const isEdit = !!project;
        return showFormDialog({
            title: isEdit ? 'Edit Project' : 'Create New Project',
            html: templates.project(project || {}),
            confirmText: isEdit ? 'Save' : 'Create',
            preConfirm: () => {
                const result = validators.project();
                if (result.error) {
                    Swal.showValidationMessage(result.error);
                    return false;
                }
                return result;
            },
        });
    };

    const deleteProjectDialog = async (projectTitle) => {
        return showConfirm(
            'Delete Project?',
            `Are you sure you want to delete "${projectTitle}"? This will also delete all photos.`,
            'Yes, delete it'
        );
    };

    // User dialogs
    const userDialog = async (user = null) => {
        const isEdit = !!user;
        return showFormDialog({
            title: isEdit ? 'Edit User' : 'Create New User',
            html: templates.user(user || {}),
            confirmText: isEdit ? 'Save' : 'Create',
            preConfirm: () => {
                const result = validators.user(isEdit);
                if (result.error) {
                    Swal.showValidationMessage(result.error);
                    return false;
                }
                return result;
            },
        });
    };

    const deleteUserDialog = async (username) => {
        return showConfirm(
            'Delete User?',
            `Are you sure you want to delete "${username}"?`,
            'Yes, delete'
        );
    };

    // Credentials dialogs
    const credentialsDialog = async (currentUsername) => {
        return showFormDialog({
            title: 'Change Credentials',
            html: templates.credentials(currentUsername),
            confirmText: 'Save Changes',
            preConfirm: () => {
                const result = validators.credentials(currentUsername);
                if (result.error) {
                    Swal.showValidationMessage(result.error);
                    return false;
                }
                return result;
            },
        });
    };

    const setupAccountDialog = async (username) => {
        return showFormDialog({
            title: 'Setup Your Account',
            html: templates.setupAccount(username),
            confirmText: 'Save Changes',
            allowClose: false,
            preConfirm: () => {
                const result = validators.setupAccount();
                if (result.error) {
                    Swal.showValidationMessage(result.error);
                    return false;
                }
                return result;
            },
        });
    };

    // Photo dialogs
    const deletePhotoDialog = async (photoUrl) => {
        return showDeleteConfirm('Delete Photo?', photoUrl);
    };

    // Logout dialog
    const logoutDialog = async () => {
        return showConfirm('Logout?', 'Are you sure you want to logout?', 'Yes, logout');
    };

    return {
        projectDialog,
        deleteProjectDialog,
        userDialog,
        deleteUserDialog,
        credentialsDialog,
        setupAccountDialog,
        deletePhotoDialog,
        logoutDialog,
        handleError,
        showLoading,
        showSuccess,
        showError,
        showSessionExpired,
    };
}
