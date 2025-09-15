import React from 'react';
import { render, screen } from '@testing-library/react';
import Apploader from './loader';

describe('Apploader component', () => {
  it('renders the loader with default props', () => {
    render(<Apploader />);
    const loaderElement = screen.getByText('Loading...');
    expect(loaderElement).toBeInTheDocument();
  });

  it('renders with a custom className', () => {
    const customClass = 'my-custom-loader';
    const { container } = render(<Apploader className={customClass} />);
    expect(container.firstChild).toHaveClass(customClass);
  });
});
