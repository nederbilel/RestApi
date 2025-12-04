// server.js
// Express server setup with MongoDB connection using Mongoose.
// Provides CRUD REST API routes for the User model.
// Environment variables are loaded from config/.env.

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from config/.env
dotenv.config({ path: path.join(__dirname, 'config', '.env') });

// Import the User model (CommonJS export)
const User = require('./models/User');

const app = express();

// Middleware to parse incoming JSON bodies
app.use(express.json());

// Read env variables
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB (local or Atlas using MONGO_URI)
mongoose
  .connect(MONGO_URI, {
    // useNewUrlParser and useUnifiedTopology are defaults in Mongoose 6+
  })
  .then(() => {
    console.log('✅ Connected to MongoDB');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

// Routes for Users
// GET: Return all users
// POST: Add a new user to the database
app.post('/users', async (req, res) => {
  try {
    // Create a new User instance from request body
    const user = new User(req.body);
    // Save the user to the database
    const saved = await user.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create user', error: error.message });
  }
});
app.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params; // Get user id from URL params
    // Find user by id and delete
    const deleted = await User.findById(id);
    // if (!deleted) {
    //   return res.status(404).json({ message: 'User not found' });
    // }
    res.status(200).json({ message: 'User is', id: deleted._id });
  } catch (error) {
    res.status(400).json({ message: 'Failed to get user', error: error.message });
  }
});
app.get('/users', async (req, res) => {
  try {
    // Use Mongoose find to retrieve all users
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
});



// PUT: Edit a user by ID
app.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params; // Get user id from URL params
    // Find user by id and update with request body
    const updated = await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updated) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update user', error: error.message });
  }
});





// DELETE: Remove a user by ID
app.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params; // Get user id from URL params
    // Find user by id and delete
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted', id: deleted._id });
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete user', error: error.message });
  }
});

// Root route for basic health check
app.get('/', (req, res) => {
  res.send('User REST API is running');
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
