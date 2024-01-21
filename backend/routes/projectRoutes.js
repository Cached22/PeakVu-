const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authMiddleware = require('../middleware/authMiddleware');

// POST endpoint to create a new project
router.post('/', authMiddleware, projectController.createProject);

// GET endpoint to retrieve all projects for the authenticated user
router.get('/', authMiddleware, projectController.getAllProjects);

// GET endpoint to retrieve a single project by its ID
router.get('/:id', authMiddleware, projectController.getProjectById);

// PUT endpoint to update a project by its ID
router.put('/:id', authMiddleware, projectController.updateProject);

// DELETE endpoint to delete a project by its ID
router.delete('/:id', authMiddleware, projectController.deleteProject);

// POST endpoint to upload images and notes for a project
router.post('/upload/:projectId', authMiddleware, projectController.uploadImagesAndNotes);

module.exports = router;