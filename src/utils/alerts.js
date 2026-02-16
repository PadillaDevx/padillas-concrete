/**
 * SweetAlert2 utility wrapper
 * Provides reusable alert functions with dark theme
 */
import Swal from 'sweetalert2';

// Dark theme configuration
const darkThemeConfig = {
  background: '#1a1a1a',
  color: '#fff',
  confirmButtonColor: '#dc2626',
  cancelButtonColor: '#6b7280',
  customClass: {
    popup: 'border border-white/30 backdrop-blur-md',
    title: 'text-white',
    htmlContainer: 'text-gray-300',
    confirmButton: 'bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold',
    cancelButton: 'bg-gray-600 hover:bg-gray-700 px-6 py-3 rounded-lg font-semibold'
  }
};

/**
 * Show success alert
 * @param {string} title - Alert title
 * @param {string} text - Alert text
 */
export const showSuccess = (title, text) => {
  return Swal.fire({
    icon: 'success',
    title,
    text,
    ...darkThemeConfig,
    timer: 5000,
    timerProgressBar: true,
    showConfirmButton: true,
    confirmButtonText: 'OK'
  });
};

/**
 * Show error alert
 * @param {string} title - Alert title
 * @param {string} text - Alert text
 */
export const showError = (title, text) => {
  return Swal.fire({
    icon: 'error',
    title,
    text,
    ...darkThemeConfig,
    confirmButtonText: 'OK'
  });
};

/**
 * Show validation errors
 * @param {string} title - Alert title
 * @param {Array<string>} errors - Array of error messages
 */
export const showValidationErrors = (title, errors) => {
  const errorList = errors.map(error => `• ${error}`).join('<br>');
  return Swal.fire({
    icon: 'warning',
    title,
    html: errorList,
    ...darkThemeConfig,
    confirmButtonText: 'OK'
  });
};

/**
 * Show confirmation dialog
 * @param {string} title - Confirmation title
 * @param {string} text - Confirmation text
 * @returns {Promise<boolean>} True if confirmed
 */
export const showConfirmation = async (title, text) => {
  const result = await Swal.fire({
    icon: 'question',
    title,
    text,
    ...darkThemeConfig,
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'Cancel'
  });
  return result.isConfirmed;
};

/**
 * Show loading indicator
 * @param {string} title - Loading message
 */
export const showLoading = (title) => {
  Swal.fire({
    title,
    ...darkThemeConfig,
    allowOutsideClick: false,
    allowEscapeKey: false,
    showConfirmButton: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });
};

/**
 * Close any open alert
 */
export const closeAlert = () => {
  Swal.close();
};
