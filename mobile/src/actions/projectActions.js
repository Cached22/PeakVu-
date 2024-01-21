import { PROJECT_CREATED, AUTH_SUCCESS } from '../utils/messageNames';
import projectApi from '../api/projectApi';

export const createProject = (projectData, token) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };
    const response = await projectApi.post('/projects', projectData, config);
    dispatch({
      type: PROJECT_CREATED,
      payload: response.data
    });
  } catch (error) {
    // Handle the error, possibly dispatch another action with the error message
    console.error('Error creating project:', error.response ? error.response.data : error.message);
  }
};

export const fetchProjects = token => async dispatch => {
  try {
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
    const response = await projectApi.get('/projects', config);
    dispatch({
      type: AUTH_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    // Handle the error, possibly dispatch another action with the error message
    console.error('Error fetching projects:', error.response ? error.response.data : error.message);
  }
};

// Add more actions as needed for handling other CRUD operations on projects
