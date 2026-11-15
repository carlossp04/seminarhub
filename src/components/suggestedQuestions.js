import { escapeHtml } from '../lib/calendar.js';
import { getSuggestedQuestions } from '../data/questions.js';

/** Render a read-only component, without forms, accounts or external services. */
export function renderSuggestedQuestions(presentationId) {
  const questions = getSuggestedQuestions(presentationId);

  return `<div class="questions-shell">
    <div class="questions-heading">
      <div>
        <span class="section-kicker">DISCUSSION PREPARATION</span>
        <h2 id="questions-heading">Questions worth asking<span class="title-period">.</span></h2>
        <p>Ideas to help students take part in the discussion after each seminar.</p>
      </div>
      <span class="questions-badge">NEW FEATURE</span>
    </div>
    ${questions.length
      ? `<ol class="question-list">${questions.map((question, index) => `
          <li class="question-item">
            <span class="question-number" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span>
            <p class="question-text">${escapeHtml(question)}</p>
          </li>`).join('')}</ol>`
      : '<p class="questions-empty">Select a scheduled seminar to see suggested discussion questions.</p>'}
  </div>`;
}
