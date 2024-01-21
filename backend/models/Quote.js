const mongoose = require('mongoose');

const QuoteSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  materials: [
    {
      materialName: String,
      quantity: Number,
      unitCost: Number,
      totalCost: Number
    }
  ],
  laborCost: {
    type: Number,
    required: true
  },
  totalCost: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Quote', QuoteSchema);