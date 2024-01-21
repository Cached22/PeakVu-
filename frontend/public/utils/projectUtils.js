import axios from 'axios';
import { projectApi } from '../api/projectApi';

export const getProjectList = async () => {
  try {
    const response = await axios.get(projectApi.getProjects);
    return response.data;
  } catch (error) {
    console.error('Error fetching project list:', error);
    throw error;
  }
};

export const getProjectDetails = async (projectId) => {
  try {
    const response = await axios.get(`${projectApi.getProjectDetails}/${projectId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching project details:', error);
    throw error;
  }
};

export const createProject = async (projectData) => {
  try {
    const response = await axios.post(projectApi.createProject, projectData);
    return response.data;
  } catch (error) {
    console.error('Error creating new project:', error);
    throw error;
  }
};

export const updateProject = async (projectId, projectData) => {
  try {
    const response = await axios.put(`${projectApi.updateProject}/${projectId}`, projectData);
    return response.data;
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
};

export const deleteProject = async (projectId) => {
  try {
    const response = await axios.delete(`${projectApi.deleteProject}/${projectId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};