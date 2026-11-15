/** Static, fictional prompts for a reliable seminar demonstration. */
export const questionsByPresentation = Object.freeze({
  'frontend-frameworks': Object.freeze([
    'When is a frontend framework worth the added complexity?',
    'What should influence the choice between React, Vue and Angular?',
    'How would you measure the maintainability of a frontend application?',
  ]),
  containers: Object.freeze([
    'When does containerisation make development easier?',
    'What are the trade-offs of using containers in a small project?',
    'How do you keep container images secure and up to date?',
  ]),
  cicd: Object.freeze([
    'Should every successful change be deployed automatically to production?',
    'Is a CI/CD pipeline worthwhile for a small student project?',
    'What should a team do when a required automated test fails?',
    'Can a green CI pipeline guarantee that an application is bug-free?',
  ]),
  'web-security': Object.freeze([
    'Which security checks should run automatically in CI?',
    'How do you balance frequent releases with security reviews?',
    'What should happen when a vulnerable dependency is detected?',
  ]),
});

export function getSuggestedQuestions(presentationId) {
  return questionsByPresentation[presentationId] ?? [];
}
