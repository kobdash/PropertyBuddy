const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = async (userId) => {
  try {
    const token = await jwt.sign({ userId }, '2y9z2#fdj4hA#sdfj1#3fkDsd', { expiresIn: '1h' });
    return token;
  } catch (error) {
    throw error;
  }
};

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    const token = await generateToken(user._id);
    res.json({ token, username }); // Return both token and username
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = await generateToken(user._id);
    res.json({ token, username }); // Return both token and username
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

