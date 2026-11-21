import { format, parseISO } from "date-fns";

/**
 * Format a date in a human-readable format
 * @param {Date|string} date The date to format
 * @param {string} formatStr The format string (default: 'MMMM d, yyyy')
 * @returns {string} The formatted date
 */
export function formatDate(date, formatStr = "MMMM d, yyyy") {
  if (!date) return "";

  // If date is a string, parse it
  const dateObj = typeof date === "string" ? parseISO(date) : date;

  // Re-anchor to local midnight using UTC components, so displaying
  // doesn't shift the date backward due to timezone conversion
  const adjustedDate = new Date(
    dateObj.getUTCFullYear(),
    dateObj.getUTCMonth(),
    dateObj.getUTCDate()
  );

  return format(adjustedDate, formatStr);
}

/**
 * Check if a date is in the future
 * @param {Date|string} date The date to check
 * @returns {boolean} True if the date is in the future
 */
export function isFutureDate(date) {
  if (!date) return false;

  // If date is a string, parse it
  const dateObj = typeof date === "string" ? parseISO(date) : date;

  return dateObj > new Date();
}

/**
 * Check if a date is in the past
 * @param {Date|string} date The date to check
 * @returns {boolean} True if the date is in the past
 */
export function isPastDate(date) {
  if (!date) return false;

  // If date is a string, parse it
  const dateObj = typeof date === "string" ? parseISO(date) : date;

  return dateObj < new Date();
}

export function formatDateRange(start, end) {
  if (!start) return "";
  if (!end) return formatDate(start);

  const s = typeof start === "string" ? parseISO(start) : start;
  const e = typeof end === "string" ? parseISO(end) : end;

  const sameYear = s.getUTCFullYear() === e.getUTCFullYear();
  const sameMonth = sameYear && s.getUTCMonth() === e.getUTCMonth();

  if (sameMonth) return `${formatDate(s, "MMMM d")} & ${formatDate(e, "d, yyyy")}`;
  if (sameYear) return `${formatDate(s, "MMMM d")} & ${formatDate(e, "MMMM d, yyyy")}`;
  return `${formatDate(s)} & ${formatDate(e)}`;
}