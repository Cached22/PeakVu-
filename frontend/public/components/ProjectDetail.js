import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ProjectUtils from '../utils/projectUtils';

const ProjectDetail = () => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`/projects/${id}`);
        setProject(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) return <div>Loading project details...</div>;
  if (error) return <div>Error fetching project: {error}</div>;

  return (
    <div>
      <h1>Project Details</h1>
      {project && (
        <div>
          <h2>{project.name}</h2>
          <p>{project.description}</p>
          <div>
            <h3>Photos</h3>
            {project.photos.map((photo, index) => (
              <img key={index} src={photo.url} alt={`Project ${project.name} - ${index}`} />
            ))}
          </div>
          <div>
            <h3>Notes</h3>
            <p>{project.notes}</p>
          </div>
          <button onClick={() => ProjectUtils.generateQuote(project)}>Generate Quote</button>
          <button onClick={() => ProjectUtils.createInvoice(project)}>Create Invoice</button>
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;