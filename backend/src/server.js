import * as Sentry from '@sentry/node';
if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: process.env.SENTRY_BACKEND_DSN,
    tracesSampleRate: 1.0,
    environment: process.env.NODE_ENV,
  });
  Sentry.setupExpressErrorHandler(app);
}
import './instrument.js';
import authRoutes from './routes/authRoutes.js';
import connectDB from './db.js';
import cors from 'cors';
import express from 'express';
import footballRoutes from './routes/footballRoutes.js';



const app = express();

// Middleware
app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  }),
);
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ Aftermatch: 'available' });
});
app.use('/api/football', footballRoutes);
app.use('/api/auth', authRoutes);


app.use(function onError(err, req, res, _next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(res.sentry + '\n');
});

let server;
if (process.env.NODE_ENV !== 'test') {
  connectDB();

  const PORT = 5000;
  server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

const startServer = async () => {
  try {
    // Start the server and wait for it to be ready
    server = app.listen(process.env.PORT || 5002, () => {
      console.log(`Server running on port ${process.env.PORT || 5002}`);
    });

    // Wait for the server to actually start listening before initializing Sentry
    await new Promise((resolve, reject) => {
      server.on('listening', resolve);
      server.on('error', reject);
    });
  } catch (err) {
    console.error('Error starting server:', err);
    throw err;
  }
};


const stopServer = async () => {
  if (server) {
    await new Promise((resolve, reject) => {
      server.close((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
};

export { app, startServer, stopServer };
