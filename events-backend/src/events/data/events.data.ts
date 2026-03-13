export interface EventItem {
  id: string;
  title: string;
  date: string;
  location: string;
  shortDescription: string;
  description: string;
}

export const EVENTS_DATA: EventItem[] = [
  {
    id: '1',
    title: 'Frontend Meetup Kyiv',
    date: '2026-04-05T16:00:00.000Z',
    location: 'Kyiv',
    shortDescription: 'Hands-on meetup for frontend engineers.',
    description:
      'An event about modern React/Next.js stack, large-scale frontend architecture, and testing practices.',
  },
  {
    id: '2',
    title: 'NestJS Backend Workshop',
    date: '2026-04-12T10:30:00.000Z',
    location: 'Lviv',
    shortDescription: 'Intensive workshop on NestJS and API design.',
    description:
      'A one-day workshop on modular architecture, DTO validation, BullMQ queues, and backend best practices.',
  },
  {
    id: '3',
    title: 'DevOps for Developers',
    date: '2026-04-20T09:00:00.000Z',
    location: 'Online',
    shortDescription: 'CI/CD, Docker, and monitoring for teams.',
    description:
      'Overview of the full delivery lifecycle: Docker, GitHub Actions, infrastructure, observability, and alerting.',
  },
  {
    id: '4',
    title: 'TypeScript Deep Dive',
    date: '2026-04-27T15:00:00.000Z',
    location: 'Kharkiv',
    shortDescription: 'Advanced typing and TypeScript patterns.',
    description:
      'A deep dive into utility types, conditional types, type-safe API contracts, and improving team DX.',
  },
  {
    id: '5',
    title: 'Product Design Sprint',
    date: '2026-05-02T08:00:00.000Z',
    location: 'Dnipro',
    shortDescription: 'From idea to interactive prototype in one day.',
    description:
      'Practical design sprint facilitation, product hypothesis validation, and rapid solution testing.',
  },
  {
    id: '6',
    title: 'GraphQL in Production',
    date: '2026-05-09T13:00:00.000Z',
    location: 'Online',
    shortDescription: 'Building and maintaining GraphQL APIs in production.',
    description:
      'Schemas, resolvers, caching, load control, authorization, and observability in production environments.',
  },
  {
    id: '7',
    title: 'QA Automation Day',
    date: '2026-05-16T11:00:00.000Z',
    location: 'Odesa',
    shortDescription: 'Automated testing for web applications.',
    description:
      'Practical E2E, integration, and API testing scenarios with a focus on stable test pipelines.',
  },
  {
    id: '8',
    title: 'Mobile Architecture Forum',
    date: '2026-05-23T09:30:00.000Z',
    location: 'Kyiv',
    shortDescription: 'Architecture decisions for mobile teams.',
    description:
      'Discussion on scaling React Native/Flutter apps, state management, and release strategies.',
  },
  {
    id: '9',
    title: 'Data Engineering Basics',
    date: '2026-05-31T14:00:00.000Z',
    location: 'Online',
    shortDescription: 'Foundations of building data pipelines.',
    description:
      'ETL/ELT patterns, working with batch/streaming data, and tooling for product analytics.',
  },
  {
    id: '10',
    title: 'Security Essentials for APIs',
    date: '2026-06-07T12:00:00.000Z',
    location: 'Lviv',
    shortDescription: 'API security in modern web services.',
    description:
      'Topics include authentication, rate limiting, secure headers, log auditing, and incident case studies.',
  },
  {
    id: '11',
    title: 'AI Tools for Developers',
    date: '2026-06-14T16:30:00.000Z',
    location: 'Online',
    shortDescription: 'Practical use of AI in software development.',
    description:
      'Practical integration of AI assistants into SDLC, code review, documentation, and routine acceleration.',
  },
  {
    id: '12',
    title: 'System Design Evening',
    date: '2026-06-21T17:00:00.000Z',
    location: 'Kyiv',
    shortDescription: 'Designing scalable systems.',
    description:
      'Scaling patterns, distributed queues, caching, consistency trade-offs, and fault tolerance.',
  },
];
