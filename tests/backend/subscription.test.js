const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const { expect } = chai;
const server = require('../server');
const Subscription = require('../models/Subscription');
const { stripeSecretKey } = require('../config/db');
const stripe = require('stripe')(stripeSecretKey);

chai.use(chaiHttp);

describe('Subscriptions', () => {
  before((done) => {
    mongoose.connect(process.env.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, done);
  });

  after((done) => {
    mongoose.disconnect(done);
  });

  describe('POST /create-subscription', () => {
    it('should create a new subscription', (done) => {
      const subscriptionData = {
        userId: 'testUserId',
        planId: 'plan_H5g3Lb35E8',
        startDate: new Date(),
      };

      chai.request(server)
        .post('/create-subscription')
        .send(subscriptionData)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('subscriptionId');
          done();
        });
    });
  });

  describe('GET /subscriptions/:userId', () => {
    it('should get subscription details for a user', (done) => {
      const userId = 'testUserId';

      chai.request(server)
        .get(`/subscriptions/${userId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

  // Additional tests can be added here for other subscription-related functionalities
});