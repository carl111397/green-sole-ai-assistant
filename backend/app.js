const express = require('express');
const cors = require('cors');  // ✅ Add CORS
require('dotenv').config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());  // ✅ Enable CORS
app.use(express.json());

// Routes
const assistantRouter = require('./assistant');  // Correct path to your router
app.use('/api/assistant', assistantRouter);  // ✅ Proper mounting

// Start server
app.listen(PORT, () => {
  console.log(`🌱 Backend running on http://localhost:${PORT}`);
});