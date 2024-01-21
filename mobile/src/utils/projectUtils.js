import { projectApi } from '../api/projectApi';

const getProjectList = async (userId) => {
  try {
    const response = await projectApi.get(`/projects/user/${userId}`);
    if (response.status === 200) {
      return response.data.projects;
    } else {
      throw new Error('Failed to fetch projects');
    }
  } catch (error) {
    console.error('Error fetching project list:', error);
    throw error;
  }
};

const getProjectDetails = async (projectId) => {
  try {
    const response = await projectApi.get(`/projects/${projectId}`);
    if (response.status === 200) {
      return response.data.project;
    } else {
      throw new Error('Failed to fetch project details');
    }
  } catch (error) {
    console.error('Error fetching project details:', error);
    throw error;
  }
};

const uploadProjectImages = async (projectId, images) => {
  const formData = new FormData();
  images.forEach((image) => {
    formData.append('images', image);
  });

  try {
    const response = await projectApi.post(`/upload/${projectId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading images:', error);
    throw error;
  }
};

const addProjectNotes = async (projectId, notes) => {
  try {
    const response = await projectApi.post(`/projects/${projectId}/notes`, { notes });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to add notes to project');
    }
  } catch (error) {
    console.error('Error adding notes to project:', error);
    throw error;
  }
};

export {
  getProjectList,
  getProjectDetails,
  uploadProjectImages,
  addProjectNotes
};