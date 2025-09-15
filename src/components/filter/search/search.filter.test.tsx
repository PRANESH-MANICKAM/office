import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchFilter from './search.filter';

describe('SearchFilter component', () => {
  const onChangeHandler = jest.fn();

  it('renders with a label', () => {
    render(<SearchFilter label="Search" onChangeHandler={onChangeHandler} />);
    const labelElement = screen.getByText('Search');
    expect(labelElement).toBeInTheDocument();
  });

  it('renders with a placeholder', () => {
    render(<SearchFilter placeholder="Search here..." onChangeHandler={onChangeHandler} />);
    const inputElement = screen.getByPlaceholderText('Search here...');
    expect(inputElement).toBeInTheDocument();
  });

  it('calls onChangeHandler when the input value changes', () => {
    render(<SearchFilter onChangeHandler={onChangeHandler} />);
    const inputElement = screen.getByRole('textbox');
    fireEvent.change(inputElement, { target: { value: 'test' } });
    expect(onChangeHandler).toHaveBeenCalled();
  });

  it('applies the provided inputClass', () => {
    render(<SearchFilter inputClass="my-custom-class" onChangeHandler={onChangeHandler} />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveClass('my-custom-class');
  });

  it('renders the search icon', () => {
    render(<SearchFilter onChangeHandler={onChangeHandler} />);
    const searchIcon = screen.getByRole('button');
    expect(searchIcon).toBeInTheDocument();
  });
});
