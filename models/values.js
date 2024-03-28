const mongoose = require('mongoose');

const valueSchema = mongoose.Schema(
  {
    temperature: {
      type: Number,
      required: [true]
    },
    humidity: {
      type: Number,
      required: [true]
    }
  },
  {
    timestamps: true
  }
);

const Values = mongoose.model('Values', valueSchema);

module.exports = Values;  
