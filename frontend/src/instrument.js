import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: process.env.SENTRY_FRONTEND_DSN,  
  tracesSampleRate: 1.0,
});

export default Sentry;
