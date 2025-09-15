import React from 'react';
import { render, screen } from '@testing-library/react';
import ColorfulTag from './colorfulTag';
import { mockColorfulTagProps } from './mock';
import { getPokcolor } from '../../../constants/pokemon.types';

describe('ColorfulTag component', () => {
  it('renders with correct text and background color', () => {
    render(<ColorfulTag {...mockColorfulTagProps} />);
    
    const tagElement = screen.getByText(mockColorfulTagProps.text);
    expect(tagElement).toBeInTheDocument();
    
    expect(tagElement).toHaveStyle(`background: ${getPokcolor(mockColorfulTagProps.type)}`);
  });

  it('applies the provided className', () => {
    render(<ColorfulTag {...mockColorfulTagProps} />);
    const tagContainer = screen.getByText(mockColorfulTagProps.text).parentElement;
    if (mockColorfulTagProps.className) {
      expect(tagContainer).toHaveClass(mockColorfulTagProps.className);
    }
  });
});
