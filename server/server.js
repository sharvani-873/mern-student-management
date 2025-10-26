const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');
const studentRoutes = require('./routes/students');
const authRoutes = require('./routes/auth'); // <-- directly import router

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(compression());
app.use(morgan('dev'));

// Auth and student routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Serve React build
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
