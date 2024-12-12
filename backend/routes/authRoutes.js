import express from 'express';
import admin from '../services/firebase.js';
import authenticate from '../middleware/authenticate.js';
import User from '../models/User.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    const newUser = new User({
      firebaseUID: userRecord.uid,
      email,
      displayName: email.split('@')[0],
    });

    await newUser.save();

    res.status(201).json({
      message: 'User created successfully',
      user: userRecord,
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res
      .status(500)
      .json({ message: 'Error creating user', error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { idToken } = req.body;

  try {
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);

    let user = await User.findOne({ firebaseId: decodedToken.uid });

    if (!user) {
      user = new User({
        firebaseId: decodedToken.uid,
        email: decodedToken.email,
        name: decodedToken.name,
      });
      await user.save();
    }

    res.status(200).json({
      message: 'Login successful',
      user,
      token: idToken,
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

router.get('/profile', authenticate, async (req, res) => {
  try {
    res.status(200).json({
      message: 'User profile',
      user: req.user,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error retrieving user profile', error: error.message });
  }
});

export default router;
