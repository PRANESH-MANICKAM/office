
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import * as commonService from './services/common.service';

// Mock the lazy-loaded HomePage component
jest.mock('./pages/home/home.page', () => () => <div>Mock HomePage</div>);

describe('App component', () => {
  // FIX: We need to mock the API call made in the App's useEffect hook.
  // This prevents a real network request during the test.
  beforeEach(() => {
    jest.spyOn(commonService, 'getPokemonData').mockResolvedValue([]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the loading fallback and then the HomePage', async () => {
    render(<App />);

    // Check for the loading fallback
    expect(screen.getByText('Loading')).toBeInTheDocument();

    // Wait for the HomePage to be loaded and check for its content
    await waitFor(() => {
      const homePage = screen.getByText('Mock HomePage');
      expect(homePage).toBeInTheDocument();
    });
  });
});
