/**
 * Spam prevention utilities
 */

/**
 * Rate limiter to prevent form spam
 * Uses localStorage to track submission timestamps
 */
class RateLimiter {
  constructor(key, maxAttempts = 3, windowMs = 60000) {
    this.key = key;
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
  }

  /**
   * Check if user is allowed to submit
   * @returns {Object} Object with allowed boolean and remainingTime
   */
  checkLimit() {
    const now = Date.now();
    const attempts = this.getAttempts();
    
    // Remove old attempts outside the time window
    const recentAttempts = attempts.filter(time => now - time < this.windowMs);
    
    if (recentAttempts.length >= this.maxAttempts) {
      const oldestAttempt = Math.min(...recentAttempts);
      const remainingTime = this.windowMs - (now - oldestAttempt);
      return {
        allowed: false,
        remainingTime: Math.ceil(remainingTime / 1000) // in seconds
      };
    }
    
    return { allowed: true, remainingTime: 0 };
  }

  /**
   * Record a new submission attempt
   */
  recordAttempt() {
    const now = Date.now();
    const attempts = this.getAttempts();
    const recentAttempts = attempts.filter(time => now - time < this.windowMs);
    recentAttempts.push(now);
    this.saveAttempts(recentAttempts);
  }

  /**
   * Get attempts from localStorage
   * @returns {Array<number>} Array of timestamps
   */
  getAttempts() {
    try {
      const stored = localStorage.getItem(this.key);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  /**
   * Save attempts to localStorage
   * @param {Array<number>} attempts - Array of timestamps
   */
  saveAttempts(attempts) {
    try {
      localStorage.setItem(this.key, JSON.stringify(attempts));
    } catch {
      // Silently fail if localStorage is not available
    }
  }

  /**
   * Clear all attempts
   */
  clear() {
    try {
      localStorage.removeItem(this.key);
    } catch {
      // Silently fail if localStorage is not available
    }
  }
}

// Export singleton instance for contact form
export const contactFormLimiter = new RateLimiter('contact_form_attempts', 3, 60000);

/**
 * Validate honeypot field (should be empty for legitimate users)
 * @param {string} value - Honeypot field value
 * @returns {boolean} True if valid (empty)
 */
export const validateHoneypot = (value) => {
  return !value || value.trim() === '';
};
