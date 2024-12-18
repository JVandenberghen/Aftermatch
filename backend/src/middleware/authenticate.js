import admin from '../services/firebase.js';

const authenticate = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;

    if (req.originalUrl === '/api/auth/login' || req.originalUrl === '/api/auth/register') {
      console.log('User already logged in.');
      return res.status(400).json({ message: 'You are already logged in.' });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized', error: error.message });
  }
};

export default authenticate;
