import User from '../models/User.js';
import admin from '../services/firebase.js';
import authenticate from '../middleware/authenticate.js';
import express from 'express';

const router = express.Router();

router.post('/register', authenticate, async (req, res) => {
  const { email, password } = req.body;

  try {
    // Create user in Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    // Create the user in MongoDB atlas cloud db
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

    if (error.code) {
      console.log('Error code:', error.code);
      return res.status(400).json({
        error: error.code,
        message: error.message,
      });
    }


    res.status(500).json({
      message: 'Error creating user',
      error: error.message,
    });
  }
});


router.post('/login', authenticate, async (req, res) => {
  const { idToken } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    
    let user = await User.findOne({ firebaseUID: decodedToken.uid });
    
    if (!user) {
      user = new User({
        firebaseUID: decodedToken.uid,
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
