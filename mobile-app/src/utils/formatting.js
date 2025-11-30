/**
 * Formatting utilities for common data transformations
 */

import { format, formatDistance, parseISO } from 'date-fns';

/**
 * Format date to readable string
 */
export const formatDate = (date, formatStr = 'dd MMM yyyy') => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return format(dateObj, formatStr);
  } catch (error) {
    console.error('Error formatting date:', error);
    return date;
  }
};

/**
 * Format time (HH:mm format)
 */
export const formatTime = (time) => {
  try {
    const date = typeof time === 'string' ? parseISO(time) : time;
    return format(date, 'HH:mm');
  } catch (error) {
    return time;
  }
};

/**
 * Format date and time together
 */
export const formatDateTime = (dateTime, formatStr = 'dd MMM yyyy HH:mm') => {
  try {
    const dateObj = typeof dateTime === 'string' ? parseISO(dateTime) : dateTime;
    return format(dateObj, formatStr);
  } catch (error) {
    return dateTime;
  }
};

/**
 * Format relative time (e.g., "2 hours ago")
 */
export const formatTimeAgo = (date) => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return formatDistance(dateObj, new Date(), { addSuffix: true });
  } catch (error) {
    return date;
  }
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text, maxLength = 20) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
};

/**
 * Capitalize first letter
 */
export const capitalize = (text) => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

/**
 * Format phone number
 */
export const formatPhone = (phone) => {
  if (!phone) return '';
  // Remove non-digits
  const cleaned = phone.replace(/\D/g, '');
  // Format as (XXX) XXX-XXXX
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  return phone;
};

/**
 * Format currency
 */
export const formatCurrency = (amount, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

/**
 * Format percentage
 */
export const formatPercentage = (value, decimals = 1) => {
  return `${(value * 100).toFixed(decimals)}%`;
};

/**
 * Format number with comma separators
 */
export const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * Mask email (show first letter and domain)
 */
export const maskEmail = (email) => {
  if (!email) return '';
  const [local, domain] = email.split('@');
  return `${local.charAt(0)}***@${domain}`;
};

/**
 * Get initials from name
 */
export const getInitials = (name) => {
  if (!name) return '';
  return name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .join('')
    .substring(0, 2);
};

/**
 * Convert attendance status to color
 */
export const getStatusColor = (status) => {
  const colors = {
    present: '#2ECC71',
    absent: '#FF4D4F',
    late: '#FFB020',
    excused: '#4A90E2',
  };
  return colors[status?.toLowerCase()] || '#AAB2BD';
};

/**
 * Convert attendance status to icon
 */
export const getStatusIcon = (status) => {
  const icons = {
    present: 'check-circle',
    absent: 'close-circle',
    late: 'time',
    excused: 'help-circle',
  };
  return icons[status?.toLowerCase()] || 'help-circle';
};

export default {
  formatDate,
  formatTime,
  formatDateTime,
  formatTimeAgo,
  truncateText,
  capitalize,
  formatPhone,
  formatCurrency,
  formatPercentage,
  formatNumber,
  maskEmail,
  getInitials,
  getStatusColor,
  getStatusIcon,
};
