import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import Login from './Login';

// Mock axios
jest.mock('axios');

// Mock useNavigate
const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Login Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  test('renders login form', () => {
    render(
      <Router>
        <Login setUser={() => {}} />
      </Router>
    );
    
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  test('submits form with user credentials', async () => {
    axios.post.mockResolvedValue({ data: { username: 'testuser' } });

    render(
      <Router>
        <Login setUser={() => {}} />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining('/api/users/login'),
        { username: 'testuser', password: 'password123' }
      );
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(mockedUsedNavigate).toHaveBeenCalledWith('/logged-in');
    });
  });

  test('displays error message on login failure', async () => {
    axios.post.mockRejectedValue({ response: { data: 'Invalid credentials' } });

    render(
      <Router>
        <Login setUser={() => {}} />
      </Router>
    );

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });
  });
});