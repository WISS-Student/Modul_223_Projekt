import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import CreatePost from '../modules/CreatePost';
import PrivateRoute from '../components/PrivateRoute'
import { expect, test, vi } from 'vitest';


/**
 * Testing log in status.
 * Simulating as a guest user.
 */
vi.mock('../contexts/AuthContext', () => ({
  useAuth: vi.fn(),
}));

test('PrivateRoute redirects unauthenticated users to login', () => {
  useAuth.mockReturnValue({ user: null });

  render(
    <MemoryRouter initialEntries={['/create-post']}>
      <Routes>
        <Route path="/login" element={<div>Please Login</div>} />
        <Route
          path="/create-post"
          element={
            <PrivateRoute>
              <CreatePost />
            </PrivateRoute>
          }
        />
      </Routes>
    </MemoryRouter>
  );

  expect(screen.getByText('Please Login')).toBeDefined();
  expect(screen.queryByText('Create New Post')).toBeNull();
});