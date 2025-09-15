import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './header';

describe('Header component', () => {
  it('renders children correctly', () => {
    const childText = 'Hello, World!';
    render(<Header>{childText}</Header>);
    const childElement = screen.getByText(childText);
    expect(childElement).toBeInTheDocument();
  });

  it('has the correct class name', () => {
    render(<Header>Test</Header>);
    const headerElement = screen.getByRole('banner');
    expect(headerElement).toHaveClass('header');
  });

  it('renders multiple children', () => {
    render(
      <Header>
        <h1>Main Title</h1>
        <h2>Subtitle</h2>
      </Header>
    );
    const mainTitle = screen.getByText('Main Title');
    const subtitle = screen.getByText('Subtitle');
    expect(mainTitle).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
  });

  it('renders without children', () => {
    render(<Header></Header>);
    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeEmptyDOMElement();
  });
});
