import { escapeHtml, getCalendarDays, getSeminarsOnDate } from '../lib/calendar.js';

export function renderCalendarDays({ year, monthIndex, selectedDate, presentations }) {
  return getCalendarDays(year, monthIndex).map(({ date, day, inMonth }) => {
    const sessions = getSeminarsOnDate(presentations, date);
    const isSelected = date === selectedDate;
    const classes = [
      'day-cell', !inMonth && 'outside-month', sessions.length && 'has-session', isSelected && 'is-selected',
    ].filter(Boolean).join(' ');
    const labels = sessions.map((session) => session.title).join('; ');
    const ariaLabel = `${date}${labels ? `: ${labels}` : ': no scheduled presentation'}`;
    const eventSnippet = sessions.length
      ? `<span class="calendar-event" title="${escapeHtml(sessions[0].title)}"><span class="event-dot"></span><span class="event-text">${escapeHtml(sessions[0].shortTitle)}</span></span>`
      : '';
    const extra = sessions.length > 1 ? `<span class="extra-count">+${sessions.length - 1} more</span>` : '';
    return `<button type="button" class="${classes}" data-date="${date}" aria-label="${escapeHtml(ariaLabel)}" aria-pressed="${isSelected}">
      <span class="day-number">${day}</span>${eventSnippet}${extra}
    </button>`;
  }).join('');
}
