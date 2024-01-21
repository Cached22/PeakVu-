const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');
const authMiddleware = require('../middleware/authMiddleware');

// POST route to create a new invoice
router.post('/create-invoice', authMiddleware, invoiceController.createInvoice);

// GET route to retrieve a specific invoice by ID
router.get('/invoices/:id', authMiddleware, invoiceController.getInvoiceById);

// PUT route to update an existing invoice by ID
router.put('/invoices/:id', authMiddleware, invoiceController.updateInvoice);

// DELETE route to delete an invoice by ID
router.delete('/invoices/:id', authMiddleware, invoiceController.deleteInvoice);

// GET route to list all invoices for a user
router.get('/invoices', authMiddleware, invoiceController.getAllInvoicesForUser);

module.exports = router;