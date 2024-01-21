import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import Login from '../../src/components/Login';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('axios');

describe('Login Component', () => {
  it('renders the login form', () => {
    render(
      <Router>
        <Login />
      </Router>
    );

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('allows the user to login successfully', async () => {
    const fakeUserResponse = {
      data: { token: 'fake-jwt-token' },
    };
    axios.post.mockResolvedValueOnce(fakeUserResponse);

    render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('/login', {
        username: 'testuser',
        password: 'password',
      });
    });

    // Check if token is stored in localStorage (or however you are storing the token)
    expect(localStorage.getItem('token')).toBe('fake-jwt-token');
  });

  it('displays an error message when login fails', async () => {
    axios.post.mockRejectedValueOnce(new Error('Invalid Credentials'));

    render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Invalid Credentials');
    });
  });
});