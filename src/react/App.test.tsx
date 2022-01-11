import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { Environment } from '../types';

describe('App', () => {
  test('renders play button', () => {
    render(<App environment={Environment.Test} />);
    const playButton = screen.getByText(/play/i);
    expect(playButton).toBeInTheDocument();
  });
});
