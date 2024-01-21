import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectList from '../../src/components/ProjectList';
import { BrowserRouter as Router } from 'react-router-dom';
import projectApi from '../../src/api/projectApi';
import { ProjectContextProvider } from '../../src/store/projectContext';

jest.mock('../../src/api/projectApi');

describe('ProjectList component', () => {
  beforeEach(() => {
    projectApi.fetchProjects.mockResolvedValue([
      { id: 1, title: 'Project 1', description: 'Description 1' },
      { id: 2, title: 'Project 2', description: 'Description 2' },
    ]);
  });

  test('should display a list of projects', async () => {
    render(
      <Router>
        <ProjectContextProvider>
          <ProjectList />
        </ProjectContextProvider>
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('Project 1')).toBeInTheDocument();
      expect(screen.getByText('Project 2')).toBeInTheDocument();
    });
  });

  test('should navigate to project detail when a project is clicked', async () => {
    render(
      <Router>
        <ProjectContextProvider>
          <ProjectList />
        </ProjectContextProvider>
      </Router>
    );

    await waitFor(() => {
      const projectItem = screen.getByText('Project 1');
      userEvent.click(projectItem);
      expect(window.location.pathname).toBe('/projects/1');
    });
  });

  test('should show a message when there are no projects', async () => {
    projectApi.fetchProjects.mockResolvedValue([]);

    render(
      <Router>
        <ProjectContextProvider>
          <ProjectList />
        </ProjectContextProvider>
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText('No projects found')).toBeInTheDocument();
    });
  });

  test('should show an error message when the projects cannot be fetched', async () => {
    const errorMessage = 'Failed to fetch projects';
    projectApi.fetchProjects.mockRejectedValue(new Error(errorMessage));

    render(
      <Router>
        <ProjectContextProvider>
          <ProjectList />
        </ProjectContextProvider>
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
});