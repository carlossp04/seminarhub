/** Calendar utilities without UI or timezone-sensitive date parsing. */
export function pad(number) {
  return String(number).padStart(2, '0');
}

export function toIsoDate(year, monthIndex, day) {
  return `${year}-${pad(monthIndex + 1)}-${pad(day)}`;
}

export function parseIsoDate(isoDate) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) {
    throw new Error('Expected ISO date YYYY-MM-DD');
  }
  const [year, month, day] = isoDate.split('-').map(Number);
  const candidate = new Date(Date.UTC(year, month - 1, day));
  if (candidate.getUTCFullYear() !== year || candidate.getUTCMonth() !== month - 1 || candidate.getUTCDate() !== day) {
    throw new Error('Invalid calendar date');
  }
  return { year, monthIndex: month - 1, day };
}

export function moveMonth(year, monthIndex, delta) {
  const date = new Date(Date.UTC(year, monthIndex + delta, 1));
  return { year: date.getUTCFullYear(), monthIndex: date.getUTCMonth() };
}

export function getCalendarDays(year, monthIndex) {
  const firstWeekdayMondayFirst = (new Date(Date.UTC(year, monthIndex, 1)).getUTCDay() + 6) % 7;
  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(Date.UTC(year, monthIndex, index + 1 - firstWeekdayMondayFirst));
    return {
      date: toIsoDate(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()),
      day: date.getUTCDate(),
      inMonth: date.getUTCFullYear() === year && date.getUTCMonth() === monthIndex,
    };
  });
}

export function getSeminarsOnDate(presentations, isoDate) {
  return presentations.filter((session) => session.date === isoDate);
}

export function getMonthSeminars(presentations, year, monthIndex) {
  const prefix = `${year}-${pad(monthIndex + 1)}-`;
  return presentations
    .filter((session) => session.date.startsWith(prefix))
    .sort((a, b) => (a.date + a.id).localeCompare(b.date + b.id));
}

export function formatFullDate(isoDate) {
  const { year, monthIndex, day } = parseIsoDate(isoDate);
  return new Intl.DateTimeFormat('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, monthIndex, day)));
}

export function formatMonth(year, monthIndex) {
  return new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' })
    .format(new Date(Date.UTC(year, monthIndex, 1)));
}

export function formatShortDate(isoDate) {
  const { year, monthIndex, day } = parseIsoDate(isoDate);
  return new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', timeZone: 'UTC' })
    .format(new Date(Date.UTC(year, monthIndex, day)));
}

/** Avoid treating even demonstration-data strings as trusted HTML. */
export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]);
}
