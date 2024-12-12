import express from 'express';
import cors from 'cors';
import connectDB from './db.js';
import footballRoutes from './routes/footballRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

// Middleware
app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
}));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ Aftermatch: 'available' });
});
app.use('/api/football', footballRoutes);
app.use('/api/auth', authRoutes);

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
    server = app.listen(5002);
    console.log('Server running on port 5002');
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
