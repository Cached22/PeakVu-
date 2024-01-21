import React, { useState } from 'react';
import axios from 'axios';
import { pdfGenerator } from '../utils/pdfGenerator';

const ProposalForm = () => {
  const [projectDetails, setProjectDetails] = useState({
    projectName: '',
    clientName: '',
    address: '',
    projectDescription: '',
    estimatedCost: '',
  });
  const [proposalCreated, setProposalCreated] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setProjectDetails({ ...projectDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('/create-proposal', projectDetails);
      if (response.data) {
        pdfGenerator(response.data);
        setProposalCreated(true);
      }
    } catch (error) {
      console.error('Error creating proposal:', error);
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Create Proposal</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="projectName">Project Name:</label>
        <input
          type="text"
          id="projectName"
          name="projectName"
          value={projectDetails.projectName}
          onChange={handleChange}
          required
        />

        <label htmlFor="clientName">Client Name:</label>
        <input
          type="text"
          id="clientName"
          name="clientName"
          value={projectDetails.clientName}
          onChange={handleChange}
          required
        />

        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={projectDetails.address}
          onChange={handleChange}
          required
        />

        <label htmlFor="projectDescription">Project Description:</label>
        <textarea
          id="projectDescription"
          name="projectDescription"
          value={projectDetails.projectDescription}
          onChange={handleChange}
          required
        />

        <label htmlFor="estimatedCost">Estimated Cost:</label>
        <input
          type="number"
          id="estimatedCost"
          name="estimatedCost"
          value={projectDetails.estimatedCost}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Proposal'}
        </button>
      </form>
      {proposalCreated && <p>Proposal created successfully!</p>}
    </div>
  );
};

export default ProposalForm;