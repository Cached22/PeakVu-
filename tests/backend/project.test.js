const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const server = require('../server');
const Project = require('../models/Project');

// Assertion style
chai.should();
chai.use(chaiHttp);

describe('Projects API', () => {
  // Before each test we empty the database
  beforeEach((done) => {
    Project.deleteMany({}, (err) => {
      done();
    });
  });

  /**
   * Test the GET route
   */
  describe('GET /projects', () => {
    it('it should GET all the projects', (done) => {
      chai.request(server)
        .get('/projects')
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('array');
          response.body.length.should.be.eql(0);
          done();
        });
    });
  });

  /**
   * Test the POST route
   */
  describe('POST /project', () => {
    it('it should POST a new project', (done) => {
      const project = {
        title: 'New Roof Installation',
        description: 'Installing a new roof for a residential building',
        status: 'pending'
      };
      chai.request(server)
        .post('/project')
        .send(project)
        .end((err, response) => {
          response.should.have.status(201);
          response.body.should.be.a('object');
          response.body.should.have.property('title');
          response.body.should.have.property('description');
          response.body.should.have.property('status');
          done();
        });
    });
  });

  /**
   * Test the GET (by id) route
   */
  describe('GET /projects/:id', () => {
    it('it should GET a project by the given id', (done) => {
      const project = new Project({
        title: 'Roof Repair',
        description: 'Repairing the damaged sections of the roof',
        status: 'in-progress'
      });
      project.save((err, project) => {
        chai.request(server)
          .get('/projects/' + project.id)
          .send(project)
          .end((err, response) => {
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('title');
            response.body.should.have.property('description');
            response.body.should.have.property('status');
            response.body.should.have.property('_id').eql(project.id);
            done();
          });
      });
    });
  });

  /**
   * Test the PATCH route
   */
  describe('PATCH /projects/:id', () => {
    it('it should UPDATE a project given the id', (done) => {
      const project = new Project({
        title: 'Roof Inspection',
        description: 'Inspecting the roof for potential issues',
        status: 'completed'
      });
      project.save((err, project) => {
        chai.request(server)
          .patch('/projects/' + project.id)
          .send({ status: 'in-progress' })
          .end((err, response) => {
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('status').eql('in-progress');
            done();
          });
      });
    });
  });

  /**
   * Test the DELETE route
   */
  describe('DELETE /projects/:id', () => {
    it('it should DELETE a project given the id', (done) => {
      const project = new Project({
        title: 'Gutter Replacement',
        description: 'Replacing old gutters with new ones',
        status: 'pending'
      });
      project.save((err, project) => {
        chai.request(server)
          .delete('/projects/' + project.id)
          .end((err, response) => {
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('message').eql('Project successfully deleted');
            response.body.result.should.have.property('ok').eql(1);
            response.body.result.should.have.property('n').eql(1);
            done();
          });
      });
    });
  });
});