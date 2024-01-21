import axios from 'axios';

const API_URL = 'http://api.peakvuroofing.com';

const getProjects = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/projects`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

const getProjectById = async (projectId, token) => {
  try {
    const response = await axios.get(`${API_URL}/projects/${projectId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching project details:', error);
    throw error;
  }
};

const createProject = async (projectData, token) => {
  try {
    const response = await axios.post(`${API_URL}/projects`, projectData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating new project:', error);
    throw error;
  }
};

const updateProject = async (projectId, projectData, token) => {
  try {
    const response = await axios.put(`${API_URL}/projects/${projectId}`, projectData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
};

const deleteProject = async (projectId, token) => {
  try {
    const response = await axios.delete(`${API_URL}/projects/${projectId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};

export const projectApi = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};