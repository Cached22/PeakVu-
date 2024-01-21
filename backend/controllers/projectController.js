const mongoose = require('mongoose');
const Project = require('../models/Project');
const { generateMaterialList } = require('../utils/gpt4Helper');

const createProject = async (req, res) => {
  try {
    const { title, description, images, notes } = req.body;
    const newProject = new Project({
      title,
      description,
      images,
      notes,
      user: req.user.id
    });
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(500).json({ message: 'Error creating project', error: error.message });
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user.id });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error: error.message });
  }
};

const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching project', error: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const { title, description, images, notes } = req.body;
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { title, description, images, notes },
      { new: true }
    );
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Error updating project', error: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project', error: error.message });
  }
};

const generateMaterialsListForProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    const materialsList = await generateMaterialList(project.description);
    res.status(200).json({ materialsList });
  } catch (error) {
    res.status(500).json({ message: 'Error generating materials list', error: error.message });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  generateMaterialsListForProject
};