import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Analytics = () => {
  const [analyticsData, setAnalyticsData] = useState({
    mostUsedMaterials: [],
    averageProjectCost: 0,
    totalProjects: 0
  });
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get('/analytics', {
          headers: {
            Authorization: `Bearer ${auth.token}`
          }
        });
        setAnalyticsData(response.data);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      }
    };

    if (auth.token) {
      fetchAnalytics();
    }
  }, [auth.token]);

  return (
    <div>
      <h1>Analytics Dashboard</h1>
      <div>
        <h2>Most Used Materials</h2>
        <ul>
          {analyticsData.mostUsedMaterials.map((material, index) => (
            <li key={index}>{material}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Average Project Cost</h2>
        <p>${analyticsData.averageProjectCost.toFixed(2)}</p>
      </div>
      <div>
        <h2>Total Projects</h2>
        <p>{analyticsData.totalProjects}</p>
      </div>
    </div>
  );
};

export default Analytics;