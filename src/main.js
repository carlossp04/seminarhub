import { presentations } from './data/presentations.js';
import { parseIsoDate, moveMonth, formatMonth, getMonthSeminars, getSeminarsOnDate } from './lib/calendar.js';
import { renderCalendarDays } from './components/calendarView.js';
import { renderPresentationDetails } from './components/presentationDetails.js';
import { renderProgrammeList } from './components/programmeList.js';
import { renderSuggestedQuestions } from './components/suggestedQuestions.js';

// Deliberate fixed start: the live demo must look identical at every rehearsal.
const state = {
  year: 2026,
  monthIndex: 10, // November (0-based)
  selectedDate: '2026-11-30',
  selectedId: 'cicd',
};

const calendarDays = document.querySelector('#calendar-days');
const calendarTitle = document.querySelector('#calendar-title');
const details = document.querySelector('#presentation-details');
const programme = document.querySelector('#programme-list');
const programmeHeading = document.querySelector('#programme-heading');
const programmeCount = document.querySelector('#programme-count');
const suggestedQuestions = document.querySelector('#suggested-questions');

function render() {
  const monthSessions = getMonthSeminars(presentations, state.year, state.monthIndex);
  const selected = presentations.find((session) => session.id === state.selectedId) ?? null;
  const monthLabel = formatMonth(state.year, state.monthIndex);

  calendarTitle.textContent = monthLabel;
  calendarDays.innerHTML = renderCalendarDays({ ...state, presentations });
  details.innerHTML = renderPresentationDetails(selected, state.selectedDate);
  suggestedQuestions.innerHTML = renderSuggestedQuestions(selected?.id);
  programme.innerHTML = renderProgrammeList(monthSessions, state.selectedId);
  programmeHeading.setAttribute('aria-label', `${monthLabel} programme`);
  programmeCount.textContent = `${monthSessions.length} ${monthSessions.length === 1 ? 'session' : 'sessions'}`;
}

function selectSession(session) {
  state.selectedId = session.id;
  state.selectedDate = session.date;
  const { year, monthIndex } = parseIsoDate(session.date);
  state.year = year;
  state.monthIndex = monthIndex;
  render();
}

function selectDate(isoDate) {
  const { year, monthIndex } = parseIsoDate(isoDate);
  state.year = year;
  state.monthIndex = monthIndex;
  state.selectedDate = isoDate;
  state.selectedId = getSeminarsOnDate(presentations, isoDate)[0]?.id ?? null;
  render();
}

function changeMonth(amount) {
  const next = moveMonth(state.year, state.monthIndex, amount);
  state.year = next.year;
  state.monthIndex = next.monthIndex;
  const first = getMonthSeminars(presentations, state.year, state.monthIndex)[0];
  state.selectedId = first?.id ?? null;
  state.selectedDate = first?.date ?? null;
  render();
}

document.querySelector('#previous-month').addEventListener('click', () => changeMonth(-1));
document.querySelector('#next-month').addEventListener('click', () => changeMonth(1));

calendarDays.addEventListener('click', (event) => {
  const dateButton = event.target.closest('button[data-date]');
  if (dateButton) selectDate(dateButton.dataset.date);
});

programme.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-session-id]');
  if (!button) return;
  const session = presentations.find(({ id }) => id === button.dataset.sessionId);
  if (session) selectSession(session);
});

render();
