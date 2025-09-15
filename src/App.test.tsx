
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock the lazy-loaded HomePage component
jest.mock('./pages/home/home.page', () => () => <div>Mock HomePage</div>);

describe('App component', () => {
  it('should render the loading fallback and then the HomePage', async () => {
    render(<App />);

    // Check for the loading fallback
    expect(screen.getByText('Loading')).toBeInTheDocument();

    // Wait for the HomePage to be loaded and check for its content
    const homePage = await screen.findByText('Mock HomePage');
    expect(homePage).toBeInTheDocument();
  });
});
