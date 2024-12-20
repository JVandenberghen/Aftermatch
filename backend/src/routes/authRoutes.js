import User from '../models/User.js';
import admin from '../services/firebase.js';
import express from 'express';

const router = express.Router();

/**
 * Creates a new user instance with the provided Firebase UID, email, and display name.
 *
 * @param {Object} newUser - The new user object.
 * @param {string} newUser.firebaseUID - The UID from Firebase for the user.
 * @param {string} newUser.email - The email address of the user.
 * @param {string} newUser.displayName - The display name of the user, derived from the email address.
 */
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


/**
 * Authenticates a user with an ID token obtained from Firebase.
 *
 * @param {Object} req - Express request object.
 * @param {string} req.headers.authorization - The ID token from Firebase, prefixed with 'Bearer '.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 *                            The response contains a JSON object with the user data and the ID token.
 * @throws {Error} - Throws an error if the request fails.
 */
router.post('/login', async (req, res) => {
  const idToken = req.headers.authorization.replace('Bearer ', '');

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

//TODO: profile is not yet implemented
router.get('/profile', async (req, res) => {
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
