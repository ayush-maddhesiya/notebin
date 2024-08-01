const express = require('express');
const { getCurrentUser, login, signup } = require('../controllers/userController');
const app = express.Router();

// Login
app.post("/login", login);

// Signup
app.post("/signup",signup);

// Get Current User (Protected Route)
app.get("/me/:token", getCurrentUser);

module.exports = app;