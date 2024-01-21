const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

describe('Analytics', () => {
  /*
    Assuming authentication is required to access analytics,
    we would need a valid token for testing.
    The token should be generated from the auth test suite
    and passed here. For the purpose of this example,
    we'll assume a token variable is available.
  */
  let token;

  before((done) => {
    // Mock login to get a valid token
    chai.request(server)
      .post('/login')
      .send({ username: 'testuser', password: 'testpass' })
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });

  describe('GET /analytics', () => {
    it('it should GET all the analytics data', (done) => {
      chai.request(server)
        .get('/analytics')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('mostUsedMaterials');
          res.body.should.have.property('averageProjectCosts');
          done();
        });
    });
  });

  // Add more tests as needed for other analytics endpoints
});