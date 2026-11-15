import { escapeHtml, formatShortDate } from '../lib/calendar.js';

export function renderProgrammeList(sessions, selectedId) {
  if (sessions.length === 0) {
    return `<div class="programme-empty">There are no scheduled presentations this month. Use the calendar arrows to explore another month.</div>`;
  }
  return sessions.map((session, index) => `<button class="programme-row ${session.id === selectedId ? 'row-active' : ''}" type="button" data-session-id="${escapeHtml(session.id)}" aria-label="View ${escapeHtml(session.title)}">
    <span class="row-counter">${String(index + 1).padStart(2, '0')}</span>
    <span class="row-main"><strong>${escapeHtml(session.title)}</strong><span>${escapeHtml(session.category)} <span class="row-bullet">·</span> Seminar presentation</span></span>
    <span class="row-date">${escapeHtml(formatShortDate(session.date))}</span>
    <span class="row-arrow" aria-hidden="true">↗</span>
  </button>`).join('');
}
