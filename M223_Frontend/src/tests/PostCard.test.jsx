import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PostCard from '../modules/PostCard';
import { expect, test } from 'vitest';

/**
 * Test to make sure post details are shown correctly.
 */
const mockPost = {
  id: 1,
  title: 'Pikachu Spotted!',
  content: 'Found one near the power plant.',
  user: { username: 'AshKetchum' },
  createdAt: new Date().toISOString(),
  comments: [{}, {}]
};

test('PostCard renders post data correctly', () => {
  render(
    <BrowserRouter>
      <PostCard post={mockPost} />
    </BrowserRouter>
  );

  expect(screen.getByText('Pikachu Spotted!')).toBeDefined();
  expect(screen.getByText(/AshKetchum/)).toBeDefined();
  expect(screen.getByText(/View Comments \(2\)/)).toBeDefined();
});
