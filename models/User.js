// models/User.js
// Defines the Mongoose schema and model for the User collection.
// This model will be used in server.js to perform CRUD operations.

// Use CommonJS to be compatible with server.js `require`
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define a simple User schema. Adjust fields as needed.
// Added basic validation and timestamps for createdAt/updatedAt.
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    age: {
      type: Number,
      min: 0,
    },
  },
  { timestamps: true }
);

// Export the User model so it can be imported in server.js
module.exports = mongoose.model('User', UserSchema);
