import axios from 'axios';
import {
  PROJECTS_FETCH_SUCCESS,
  PROJECTS_FETCH_FAIL,
  PROJECT_CREATE_SUCCESS,
  PROJECT_CREATE_FAIL,
  PROJECT_UPDATE_SUCCESS,
  PROJECT_UPDATE_FAIL,
  PROJECT_DELETE_SUCCESS,
  PROJECT_DELETE_FAIL
} from './types';

const API_URL = '/api/projects';

export const fetchProjects = () => async dispatch => {
  try {
    const response = await axios.get(`${API_URL}`);
    dispatch({
      type: PROJECTS_FETCH_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: PROJECTS_FETCH_FAIL,
      payload: error.response.data.message || error.message
    });
  }
};

export const createProject = projectData => async dispatch => {
  try {
    const response = await axios.post(`${API_URL}`, projectData);
    dispatch({
      type: PROJECT_CREATE_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: PROJECT_CREATE_FAIL,
      payload: error.response.data.message || error.message
    });
  }
};

export const updateProject = (projectId, updateData) => async dispatch => {
  try {
    const response = await axios.put(`${API_URL}/${projectId}`, updateData);
    dispatch({
      type: PROJECT_UPDATE_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: PROJECT_UPDATE_FAIL,
      payload: error.response.data.message || error.message
    });
  }
};

export const deleteProject = projectId => async dispatch => {
  try {
    await axios.delete(`${API_URL}/${projectId}`);
    dispatch({
      type: PROJECT_DELETE_SUCCESS,
      payload: projectId
    });
  } catch (error) {
    dispatch({
      type: PROJECT_DELETE_FAIL,
      payload: error.response.data.message || error.message
    });
  }
};