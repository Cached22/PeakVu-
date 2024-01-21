const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const { Invoice } = require('../models/Invoice');
const server = require('../server');

// Assertion style
chai.should();
chai.use(chaiHttp);

describe('Invoices API', () => {
  // Before each test we empty the database
  beforeEach((done) => {
    Invoice.deleteMany({}, (err) => {
      done();
    });
  });

  /**
   * Test the POST route to create an invoice
   */
  describe('POST /create-invoice', () => {
    it('It should POST a new invoice', (done) => {
      const invoice = {
        projectId: new mongoose.Types.ObjectId(),
        amount: 5000,
        status: 'pending',
        dueDate: new Date(),
      };
      chai.request(server)
        .post('/create-invoice')
        .send(invoice)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.should.have.property('projectId');
          response.body.should.have.property('amount').eq(5000);
          response.body.should.have.property('status').eq('pending');
          done();
        });
    });
  });

  /**
   * Test the GET route to retrieve an invoice by ID
   */
  describe('GET /invoices/:id', () => {
    it('It should GET an invoice by ID', (done) => {
      const invoice = new Invoice({
        projectId: new mongoose.Types.ObjectId(),
        amount: 5000,
        status: 'pending',
        dueDate: new Date(),
      });
      invoice.save((err, invoice) => {
        chai.request(server)
          .get('/invoices/' + invoice.id)
          .send(invoice)
          .end((err, response) => {
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('_id').eq(invoice.id);
            response.body.should.have.property('amount').eq(5000);
            response.body.should.have.property('status').eq('pending');
            done();
          });
      });
    });
  });

  /**
   * Test the PUT route to update an invoice
   */
  describe('PUT /invoices/:id', () => {
    it('It should PUT an existing invoice', (done) => {
      const invoice = new Invoice({
        projectId: new mongoose.Types.ObjectId(),
        amount: 5000,
        status: 'pending',
        dueDate: new Date(),
      });
      invoice.save((err, invoice) => {
        chai.request(server)
          .put('/invoices/' + invoice.id)
          .send({ amount: 5500, status: 'paid' })
          .end((err, response) => {
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('amount').eq(5500);
            response.body.should.have.property('status').eq('paid');
            done();
          });
      });
    });
  });

  /**
   * Test the DELETE route to delete an invoice
   */
  describe('DELETE /invoices/:id', () => {
    it('It should DELETE an existing invoice', (done) => {
      const invoice = new Invoice({
        projectId: new mongoose.Types.ObjectId(),
        amount: 5000,
        status: 'pending',
        dueDate: new Date(),
      });
      invoice.save((err, invoice) => {
        chai.request(server)
          .delete('/invoices/' + invoice.id)
          .end((err, response) => {
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('msg').eq('Invoice deleted successfully');
            done();
          });
      });
    });
  });
});