const express = require('express');
const connectDB = require('./config/database');

const app = express();

connectDB();



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));