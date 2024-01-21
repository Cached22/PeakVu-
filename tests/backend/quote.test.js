const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const Quote = require('../models/Quote');

// Assertion style
chai.should();
chai.use(chaiHttp);

describe('Quotes API', () => {

    /**
     * Test the POST route for generating a quote
     */
    describe('POST /quote', () => {
        it('It should POST a new quote', (done) => {
            const quoteData = {
                projectId: '5f40a6baac77a903d8f682c6',
                materialCosts: 5000,
                laborCosts: 2000,
                totalCost: 7000,
                taxRate: 0.08,
                finalQuote: 7560
            };
            chai.request(server)
                .post('/quote')
                .send(quoteData)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('projectId');
                    response.body.should.have.property('materialCosts').eq(5000);
                    response.body.should.have.property('laborCosts').eq(2000);
                    response.body.should.have.property('totalCost').eq(7000);
                    response.body.should.have.property('taxRate').eq(0.08);
                    response.body.should.have.property('finalQuote').eq(7560);
                    done();
                });
        });
    });

    /**
     * Test the GET route to fetch current material prices
     */
    describe('GET /materials', () => {
        it('It should GET all the current material prices', (done) => {
            chai.request(server)
                .get('/materials')
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    done();
                });
        });
    });

    /**
     * Test the GET route to fetch a specific quote
     */
    describe('GET /quote/:id', () => {
        it('It should GET a quote by ID', (done) => {
            const quoteId = '5f40a6baac77a903d8f682c6';
            chai.request(server)
                .get('/quote/' + quoteId)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('_id').eq(quoteId);
                    done();
                });
        });
    });

    /**
     * Test the PUT route to update a quote
     */
    describe('PUT /quote/:id', () => {
        it('It should PUT an existing quote', (done) => {
            const quoteId = '5f40a6baac77a903d8f682c6';
            const updatedQuote = {
                materialCosts: 5500,
                laborCosts: 2500,
                totalCost: 8000,
                taxRate: 0.08,
                finalQuote: 8640
            };
            chai.request(server)
                .put('/quote/' + quoteId)
                .send(updatedQuote)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('materialCosts').eq(5500);
                    response.body.should.have.property('laborCosts').eq(2500);
                    response.body.should.have.property('totalCost').eq(8000);
                    response.body.should.have.property('finalQuote').eq(8640);
                    done();
                });
        });
    });

    /**
     * Test the DELETE route to delete a quote
     */
    describe('DELETE /quote/:id', () => {
        it('It should DELETE an existing quote', (done) => {
            const quoteId = '5f40a6baac77a903d8f682c6';
            chai.request(server)
                .delete('/quote/' + quoteId)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('message').eq('Quote deleted successfully');
                    done();
                });
        });
    });

});