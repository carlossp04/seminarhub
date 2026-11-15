import test from 'node:test';
import assert from 'node:assert/strict';
import { presentations } from '../src/data/presentations.js';
import {
  getCalendarDays, getMonthSeminars, getSeminarsOnDate, moveMonth,
  parseIsoDate, formatFullDate, escapeHtml,
} from '../src/lib/calendar.js';

test('November 2026 calendar starts on a Monday and shows all 42 cells', () => {
  const days = getCalendarDays(2026, 10);
  assert.equal(days.length, 42);
  assert.equal(days[0].date, '2026-10-26');
  assert.equal(days.at(-1).date, '2026-12-06');
  assert(days.find((day) => day.date === '2026-11-30')?.inMonth);
});

test('the November dataset includes the CI/CD seminar on the correct date', () => {
  const sessions = getMonthSeminars(presentations, 2026, 10);
  assert.equal(sessions.length, 3);
  assert.equal(getSeminarsOnDate(presentations, '2026-11-30')[0]?.id, 'cicd');
  assert.equal(getSeminarsOnDate(presentations, '2026-11-29').length, 0);
});

test('moving between months correctly handles year boundaries', () => {
  assert.deepEqual(moveMonth(2026, 11, 1), { year: 2027, monthIndex: 0 });
  assert.deepEqual(moveMonth(2026, 0, -1), { year: 2025, monthIndex: 11 });
});

test('ISO date parsing rejects impossible dates', () => {
  assert.deepEqual(parseIsoDate('2026-11-30'), { year: 2026, monthIndex: 10, day: 30 });
  assert.throws(() => parseIsoDate('2026-02-30'));
  assert.throws(() => parseIsoDate('30/11/2026'));
});

test('formatted dates remain stable across timezones', () => {
  assert.equal(formatFullDate('2026-11-30'), 'Monday, 30 November 2026');
});

test('display strings are escaped before insertion into HTML', () => {
  assert.equal(escapeHtml('<script>"test" & x</script>'), '&lt;script&gt;&quot;test&quot; &amp; x&lt;/script&gt;');
});

test('presentation IDs and dates are unique and valid', () => {
  const ids = presentations.map(({ id }) => id);
  assert.equal(new Set(ids).size, ids.length);
  presentations.forEach(({ date }) => assert.doesNotThrow(() => parseIsoDate(date)));
});
