const Invoice = require('../models/Invoice');
const Project = require('../models/Project');
const pdfGenerator = require('../utils/pdfGenerator');
const stripeHelper = require('../utils/stripeHelper');

const createInvoice = async (req, res) => {
  try {
    const { projectId, items, total } = req.body;
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const invoice = new Invoice({
      project: projectId,
      items,
      total,
      issuedDate: new Date(),
      dueDate: new Date(new Date().setDate(new Date().getDate() + 30)), // due in 30 days
    });

    const savedInvoice = await invoice.save();

    // Generate PDF
    const pdfBuffer = await pdfGenerator.createInvoicePDF(savedInvoice);

    // TODO: Save PDF to a file storage service and get the URL
    const pdfUrl = 'URL_TO_SAVED_PDF';

    res.status(201).json({
      message: 'Invoice created successfully',
      invoice: savedInvoice,
      pdfUrl,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating invoice', error: error.message });
  }
};

const getInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const invoice = await Invoice.findById(id).populate('project');

    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    res.status(200).json(invoice);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching invoice', error: error.message });
  }
};

const payInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentMethodId } = req.body;

    const invoice = await Invoice.findById(id);

    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    // Process payment through Stripe
    const paymentIntent = await stripeHelper.createPaymentIntent(invoice.total, paymentMethodId);

    // Update invoice status to paid
    invoice.status = 'paid';
    await invoice.save();

    res.status(200).json({
      message: 'Payment successful',
      paymentIntent,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error processing payment', error: error.message });
  }
};

module.exports = {
  createInvoice,
  getInvoice,
  payInvoice,
};