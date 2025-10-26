const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');

const studentRoutes = require('./routes/students');
const authRoutes = require('./routes/auth');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(compression());
app.use(morgan('dev'));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Serve React build (only if exists)
if (process.env.NODE_ENV === 'production') {
  const buildPath = path.join(__dirname, '../client/build');

  if (fs.existsSync(buildPath)) {
    app.use(express.static(buildPath));

    // Serve React for all non-API routes
    app.get(/^\/(?!api).*/, (req, res) => {
      res.sendFile(path.join(buildPath, 'index.html'));
    });
  } else {
    console.warn('React build folder not found. Skipping static serving.');
  }
}

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
