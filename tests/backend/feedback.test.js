const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const { expect } = chai;
const server = require('../server');
const Feedback = require('../models/Feedback');

chai.use(chaiHttp);

describe('Feedback', () => {
  before((done) => {
    mongoose.connect(process.env.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, done);
  });

  after((done) => {
    mongoose.disconnect(done);
  });

  beforeEach((done) => {
    Feedback.deleteMany({}, done);
  });

  describe('/POST feedback', () => {
    it('it should POST feedback', (done) => {
      let feedback = {
        projectId: '5e9f8f8f8f8f8f8f8f8f8f8',
        content: 'Great job on the roof!',
        rating: 5
      };
      chai.request(server)
        .post('/feedback')
        .send(feedback)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          expect(res.body).to.have.property('message').eql(FEEDBACK_RECEIVED);
          expect(res.body.data).to.have.property('projectId');
          expect(res.body.data).to.have.property('content');
          expect(res.body.data).to.have.property('rating');
          done();
        });
    });
  });

  describe('/GET feedback', () => {
    it('it should GET all the feedback', (done) => {
      chai.request(server)
        .get('/feedback')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('array');
          done();
        });
    });
  });
});