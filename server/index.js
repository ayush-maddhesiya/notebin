const express = require('express');
const connectDB = require('./config/database');
const authRoutes = require('./routes/auth');
const app = express();

connectDB();

app.use('/auth', authRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));