import React from 'react';
import { render, screen } from '@testing-library/react';
import Apploader from './loader';

describe('Apploader component', () => {
  it('should render the loader', () => {
    render(<Apploader />);
    const loaderElement = screen.getByText('Loading...');
    expect(loaderElement).toBeInTheDocument();
  });

  it('should apply a custom className', () => {
    const customClass = 'my-custom-loader';
    render(<Apploader className={customClass} />);
    const loaderElement = screen.getByTestId('app-loader');
    expect(loaderElement).toHaveClass(customClass);
  });

  it('should have the default app-loader class', () => {
    render(<Apploader />);
    const loaderElement = screen.getByTestId('app-loader');
    expect(loaderElement).toHaveClass('app-loader');
  });
});
