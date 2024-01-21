const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

class PDFGenerator {
  constructor() {
    this.doc = new PDFDocument();
  }

  createInvoice(invoiceData, outputPath) {
    this.doc.pipe(fs.createWriteStream(outputPath));

    this.doc
      .fontSize(25)
      .text('Invoice', {
        align: 'center'
      });

    this.doc.moveDown();

    this.addInvoiceTable(invoiceData);

    this.doc.end();
  }

  createProposal(proposalData, outputPath) {
    this.doc.pipe(fs.createWriteStream(outputPath));

    this.doc
      .fontSize(25)
      .text('Proposal', {
        align: 'center'
      });

    this.doc.moveDown();

    this.addProposalDetails(proposalData);

    this.doc.end();
  }

  addInvoiceTable(invoiceData) {
    // You can define the table and its columns here
    // This is a placeholder for the logic to add the invoice table
    this.doc
      .fontSize(12)
      .text(`Invoice Number: ${invoiceData.invoiceNumber}`, {
        align: 'left'
      })
      .moveDown()
      .text(`Date: ${invoiceData.date}`, {
        align: 'left'
      })
      .moveDown()
      .text(`Total Amount: $${invoiceData.totalAmount}`, {
        align: 'left'
      });
    // Add more details and formatting as needed
  }

  addProposalDetails(proposalData) {
    // You can define the proposal details here
    // This is a placeholder for the logic to add the proposal details
    this.doc
      .fontSize(12)
      .text(`Proposal for: ${proposalData.clientName}`, {
        align: 'left'
      })
      .moveDown()
      .text(`Project Description: ${proposalData.projectDescription}`, {
        align: 'left'
      });
    // Add more details and formatting as needed
  }
}

module.exports = PDFGenerator;