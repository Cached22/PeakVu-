import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import projectApi from '../api/projectApi';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectApi.get('/projects');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div id="projectList" className="project-list">
      <h2>Project List</h2>
      <ul>
        {projects.map((project) => (
          <li key={project._id}>
            <Link to={`/projects/${project._id}`}>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <span>Status: {project.status}</span>
            </Link>
          </li>
        ))}
      </ul>
      {projects.length === 0 && <p>No projects found.</p>}
    </div>
  );
};

export default ProjectList;