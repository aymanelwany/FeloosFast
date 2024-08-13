const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the FloosFast API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth'
    }
  });
});

// Auth routes
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
