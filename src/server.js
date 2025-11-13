require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const planRoutes = require('./routes/planRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/plans', planRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Travel Planner API');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
