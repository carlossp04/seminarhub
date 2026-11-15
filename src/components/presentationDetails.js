import { escapeHtml, formatFullDate } from '../lib/calendar.js';

export function renderPresentationDetails(session, selectedDate) {
  if (!session) {
    return `<div class="details-empty"><div class="empty-illustration" aria-hidden="true">☰</div>
      <h3>No presentation selected</h3>
      <p>${selectedDate ? `There are no seminars scheduled on ${escapeHtml(formatFullDate(selectedDate))}.` : 'This month has no scheduled seminars.'}</p>
      <span>Choose a marked date in the calendar.</span>
    </div>`;
  }

  const [year, month, day] = session.date.split('-');
  const shortMonth = new Intl.DateTimeFormat('en-GB', { month: 'short', timeZone: 'UTC' })
    .format(new Date(Date.UTC(Number(year), Number(month) - 1, Number(day))));

  return `<div class="details-content">
    <div class="details-date-row">
      <div class="date-tile"><span>${escapeHtml(shortMonth.toUpperCase())}</span><strong>${Number(day)}</strong></div>
      <div class="details-date-text"><span>${escapeHtml(formatFullDate(session.date))}</span><strong>Seminar presentation</strong></div>
    </div>
    <span class="category-pill">${escapeHtml(session.category)}</span>
    <h3 id="details-heading" class="details-title">${escapeHtml(session.title)}</h3>
    <p class="details-description">${escapeHtml(session.description)}</p>
    <div class="details-divider"></div>
    <p class="details-label">SESSION FORMAT</p>
    <div class="session-format">
      <div><span class="format-symbol" aria-hidden="true">◉</span><span>Presentation</span><strong>45–60 min</strong></div>
      <div><span class="format-symbol" aria-hidden="true">↗</span><span>Group discussion</span><strong>30–45 min</strong></div>
    </div>
    <p class="details-label tag-heading">TOPICS</p>
    <div class="topic-tags">${session.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join('')}</div>
  </div>`;
}
