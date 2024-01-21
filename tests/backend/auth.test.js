const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../backend/server');
const User = require('../backend/models/User');
const jwtSecret = require('../backend/config/db').jwtSecret;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

chai.use(chaiHttp);
chai.should();

describe('Authentication', () => {
  beforeEach((done) => {
    // Before each test we empty the database
    User.deleteMany({}, (err) => {
      done();
    });
  });

  describe('/POST login', () => {
    it('it should authenticate a user and return a token', (done) => {
      const user = new User({
        username: 'testuser',
        password: bcrypt.hashSync('password', 10)
      });

      user.save((err, user) => {
        chai.request(server)
          .post('/login')
          .send({ username: 'testuser', password: 'password' })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('token');
            done();
          });
      });
    });

    it('it should not authenticate a user with wrong credentials', (done) => {
      chai.request(server)
        .post('/login')
        .send({ username: 'testuser', password: 'wrongpassword' })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('msg').eql('Invalid credentials');
          done();
        });
    });
  });

  describe('/GET dashboard', () => {
    it('it should GET the dashboard data for the authenticated user', (done) => {
      const user = new User({
        username: 'testuser',
        password: bcrypt.hashSync('password', 10)
      });

      user.save((err, user) => {
        const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: '1h' });

        chai.request(server)
          .get('/dashboard')
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('username').eql('testuser');
            done();
          });
      });
    });

    it('it should not GET dashboard data without a token', (done) => {
      chai.request(server)
        .get('/dashboard')
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('msg').eql('No token, authorization denied');
          done();
        });
    });
  });
});