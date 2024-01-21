import axios from 'axios';

const API_URL = '/api/projects';

// Fetch all projects
export const getProjects = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Fetch a single project by ID
export const getProjectById = async (projectId) => {
  try {
    const response = await axios.get(`${API_URL}/${projectId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Create a new project
export const createProject = async (projectData) => {
  try {
    const response = await axios.post(API_URL, projectData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Update an existing project
export const updateProject = async (projectId, projectData) => {
  try {
    const response = await axios.put(`${API_URL}/${projectId}`, projectData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Delete a project
export const deleteProject = async (projectId) => {
  try {
    const response = await axios.delete(`${API_URL}/${projectId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// Upload images and notes for a project
export const uploadProjectImagesAndNotes = async (projectId, formData) => {
  try {
    const response = await axios.post(`${API_URL}/upload/${projectId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};