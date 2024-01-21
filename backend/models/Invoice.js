const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  customerDetails: {
    name: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true }
  },
  invoiceNumber: {
    type: String,
    required: true
  },
  issueDate: {
    type: Date,
    default: Date.now
  },
  dueDate: {
    type: Date,
    required: true
  },
  items: [
    {
      description: { type: String, required: true },
      quantity: { type: Number, required: true },
      unitCost: { type: Number, required: true }
    }
  ],
  subtotal: {
    type: Number,
    required: true
  },
  taxRate: {
    type: Number,
    required: true
  },
  taxes: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'overdue'],
    default: 'pending'
  },
  notes: {
    type: String
  }
});

module.exports = mongoose.model('Invoice', InvoiceSchema);