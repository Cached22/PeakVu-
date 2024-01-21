import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Analytics from '../src/components/Analytics';
import analyticsApi from '../src/api/analyticsApi';

jest.mock('../src/api/analyticsApi');

describe('Analytics Component', () => {
  test('renders Analytics component with data', async () => {
    const mockData = {
      mostUsedMaterials: ['Shingles', 'Underlayment', 'Nails'],
      averageProjectCost: 5000,
      totalProjects: 20
    };

    analyticsApi.retrieveAnalyticsData.mockResolvedValue(mockData);

    render(<Analytics />);

    await waitFor(() => {
      expect(screen.getByText('Most Used Materials')).toBeInTheDocument();
      expect(screen.getByText('Shingles')).toBeInTheDocument();
      expect(screen.getByText('Underlayment')).toBeInTheDocument();
      expect(screen.getByText('Nails')).toBeInTheDocument();
      expect(screen.getByText('Average Project Cost: $5000')).toBeInTheDocument();
      expect(screen.getByText('Total Projects: 20')).toBeInTheDocument();
    });
  });

  test('handles error when fetching data', async () => {
    const errorMessage = 'Error fetching analytics data';
    analyticsApi.retrieveAnalyticsData.mockRejectedValue(new Error(errorMessage));

    render(<Analytics />);

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
});