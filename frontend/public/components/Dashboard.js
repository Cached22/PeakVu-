import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProjectList from './ProjectList';
import { dashboardContainer } from '../utils/authUtils'; // Assuming this is a utility for styling or constants

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/dashboard', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setProjects(response.data.projects);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate('/login');
        }
        // Handle other errors such as 500, etc.
      }
    };

    fetchProjects();
  }, [navigate]);

  return (
    <div id={dashboardContainer}>
      <h1>Dashboard</h1>
      <ProjectList projects={projects} />
    </div>
  );
};

export default Dashboard;