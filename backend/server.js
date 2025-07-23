const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Order = require('./Order');
const app = express();
const Note = require('./Note');

// Middleware to handle CORS and JSON parsing
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
require('dotenv').config();
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

// POST /api/orders - save all table orders
// POST /api/orders - replace all orders with new ones
app.post('/api/orders', async (req, res) => {
  try {
    const tables = req.body;
    console.log("Received tables:", tables);
    // Optional: Validate input
    if (!Array.isArray(tables)) {
      return res.status(400).json({ error: 'Invalid format' });
    }

    // 1. Remove all existing orders
    await Order.deleteMany({});

    // 2. Insert the new orders
    const savedOrders = await Order.insertMany(tables);
    console.log("Saved orders:", savedOrders);
    res.status(200).json(savedOrders);
  } catch (error) {
    console.error("Error saving orders:", error);
    res.status(500).json({ error: 'Failed to save orders' });
  }
});

// GET /api/orders - fetch all orders
app.get('/api/orders', async ( req , res) => {
  try {
    const allOrders = await Order.find();
    res.status(200).json(allOrders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

app.post('/api/notes', async (req, res) => {
  try {
    const { tableName, note } = req.body;
    console.log("Received note for table:", tableName, "Note:", note);
     // Create and save the note
    const newNote = new Note({ tableName, note });
    await newNote.save();

    res.status(201).json({ message: 'Note saved successfully.', note: newNote });
  } catch (error) {
    console.error("Error saving note:", error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.get('/api/notes', async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.get('/health', async (req, res) => {
  const isConnected = mongoose.connection.readyState === 1; // 1 = connected

  if (isConnected) {
    res.status(200).json({ status: 'ok', db: 'connected' });
  } else {
    res.status(503).json({ status: 'fail', db: 'disconnected' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});