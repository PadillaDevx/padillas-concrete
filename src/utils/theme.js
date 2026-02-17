/**
 * Theme constants - centralized styling configuration
 */

// Brand colors
export const colors = {
    primary: '#dc2626',      // red-600
    primaryHover: '#b91c1c', // red-700
    secondary: '#6b7280',    // gray-500
    success: '#16a34a',      // green-600
    warning: '#d97706',      // amber-600
    danger: '#dc2626',       // red-600
    info: '#2563eb',         // blue-600

    // UI colors
    bgDark: '#111827',       // gray-900
    bgCard: '#1f2937',       // gray-800
    border: '#374151',       // gray-700
    textPrimary: '#ffffff',
    textSecondary: '#9ca3af', // gray-400
    textMuted: '#6b7280',    // gray-500
};

// SweetAlert2 dark theme configuration
export const swalDarkTheme = {
    background: colors.bgCard,
    color: colors.textPrimary,
    confirmButtonColor: colors.primary,
    cancelButtonColor: colors.secondary,
    customClass: {
        popup: 'border border-gray-700',
        confirmButton: 'px-6 py-2.5 rounded-lg font-semibold',
        cancelButton: 'px-6 py-2.5 rounded-lg font-semibold',
    },
};

// Common button styles (Tailwind classes)
export const buttonStyles = {
    primary: 'bg-red-600 hover:bg-red-700 text-white font-semibold transition-colors',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white font-semibold transition-colors',
    ghost: 'text-gray-400 hover:text-white hover:bg-gray-700 transition-colors',
    danger: 'text-gray-400 hover:text-red-500 hover:bg-gray-700 transition-colors',
    link: 'text-red-500 hover:text-red-400 transition-colors',
};

// Common input styles
export const inputStyles = {
    base: 'w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition',
};
