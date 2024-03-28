const express = require('express');
const mongoose = require('mongoose');
const Values = require('./models/values');
require('dotenv').config();

const app = express();

app.use(express.json());

app.get('/addvalues', async (req, res) => {
  const data= {
      temperature: Number(req.query.temperature),
      humidity: Number(req.query.humidity)
    }
  const createdValue = await Values.create(data);
  res.status(200).json(createdValue);
});

// Read operation (GET all values)
app.get('/values', async (req, res) => {
  try {
    const allValues = await Values.find();
    res.status(200).json(allValues);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Read operation (GET a specific value by ID)
app.get('/values/:id', async (req, res) => {
  try {
    const value = await Values.findById(req.params.id);
    if (!value) {
      return res.status(404).json({ message: 'Value not found' });
    }
    res.status(200).json(value);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Update operation (PUT)
app.put('/values/:id', async (req, res) => {
  try {
    const updatedValue = await Values.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedValue);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Delete operation (DELETE)
app.delete('/values/:id', async (req, res) => {
  try {
    const deletedValue = await Values.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedValue);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.Port, () => {
      console.log('Node API is running on port 3000');
    });
  })
  .catch((error) => {
    console.log(error);
  });
