import test from 'node:test';
import assert from 'node:assert/strict';
import { presentations } from '../src/data/presentations.js';
import { getSuggestedQuestions } from '../src/data/questions.js';
import { renderSuggestedQuestions } from '../src/components/suggestedQuestions.js';

test('every presentation includes at least three suggested discussion questions', () => {
  for (const presentation of presentations) {
    const questions = getSuggestedQuestions(presentation.id);
    assert.ok(questions.length >= 3, `Missing questions for ${presentation.id}`);
    assert.ok(questions.every((question) => typeof question === 'string' && question.trim().length > 10));
  }
});

test('the CI/CD questions are shown in the new component', () => {
  const markup = renderSuggestedQuestions('cicd');
  assert.match(markup, /Questions worth asking/);
  assert.match(markup, /Should every successful change be deployed automatically/);
  assert.match(markup, /<li class="question-item">/);
});

test('the component handles empty or invalid selections safely', () => {
  assert.deepEqual(getSuggestedQuestions('does-not-exist'), []);
  assert.match(renderSuggestedQuestions(null), /Select a scheduled seminar/);
  assert.match(renderSuggestedQuestions('<script>alert(1)</script>'), /Select a scheduled seminar/);
});
