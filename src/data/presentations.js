/**
 * Demonstration dataset. The 30 November CI/CD topic/date is the seminar
 * author's presentation; every other session below is fictional sample data.
 * This is NOT the university's official schedule.
 *
 * Dates are ISO strings so they stay stable across local timezones.
 */
export const presentations = Object.freeze([
  {
    id: 'frontend-frameworks',
    date: '2026-11-16',
    title: 'Modern Frontend Frameworks',
    shortTitle: 'Frontend frameworks',
    category: 'FRONTEND',
    description: 'A practical look at component-based web development, architecture, and choosing the right tools for a project.',
    tags: ['JavaScript', 'Architecture', 'Frameworks'],
  },
  {
    id: 'containers',
    date: '2026-11-23',
    title: 'Containers & Docker',
    shortTitle: 'Containers & Docker',
    category: 'DEVOPS',
    description: 'Understanding container images, reproducible environments, and how containerisation fits into web development.',
    tags: ['Docker', 'Environments', 'Tooling'],
  },
  {
    id: 'cicd',
    date: '2026-11-29',
    title: 'CI/CD: From Code to Production',
    shortTitle: 'CI/CD',
    category: 'DEVOPS',
    description: 'Explore how Continuous Integration and Continuous Deployment help teams test, build, and deliver web applications using GitHub Actions.',
    tags: ['GitHub Actions', 'Automation', 'CI/CD'],
  },
  {
    id: 'web-security',
    date: '2026-12-07',
    title: 'Web Application Security',
    shortTitle: 'Web security',
    category: 'SECURITY',
    description: 'Explore common web vulnerabilities and the everyday development practices that help teams reduce security risks.',
    tags: ['OWASP', 'Web security', 'Best practices'],
  },
]);
