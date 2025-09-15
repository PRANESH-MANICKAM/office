import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import AppMultiSelectDropDown from './multiSelectdropDown';
import { IAppMultiSelectDropDownProps } from './types';

describe('AppMultiSelectDropDown', () => {
    const mockOnChangeHandler = jest.fn();
    const mockOnOpenHandler = jest.fn();
    const mockOnCloseHandler = jest.fn();
    const mockOnCleanHandler = jest.fn();
    const mockData = [
        { label: 'Type 1', value: 'type1' },
        { label: 'Type 2', value: 'type2' },
    ];

    const defaultProps: IAppMultiSelectDropDownProps = {
        label: 'Pokemon Types',
        onChangeHandler: mockOnChangeHandler,
        data: mockData,
        isOpen: false,
        onOpenHandler: mockOnOpenHandler,
        onCloseHandler: mockOnCloseHandler,
        onCleanHandler: mockOnCleanHandler,
        placeholder: 'Select types',
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should render the label and placeholder', () => {
        render(<AppMultiSelectDropDown {...defaultProps} />);
        expect(screen.getByText('Pokemon Types')).toBeInTheDocument();
        expect(screen.getByText('Select types')).toBeInTheDocument();
    });

    test('should apply "is-dropdown-open" class when isOpen is true', () => {
        const { container } = render(<AppMultiSelectDropDown {...defaultProps} isOpen={true} />);
        expect(container.querySelector('.check-picker-wrap')).toHaveClass('is-dropdown-open');
    });

    test('should not apply "is-dropdown-open" class when isOpen is false', () => {
        const { container } = render(<AppMultiSelectDropDown {...defaultProps} isOpen={false} />);
        expect(container.querySelector('.check-picker-wrap')).not.toHaveClass('is-dropdown-open');
    });

    test('should call onOpenHandler when dropdown is opened', async () => {
        render(<AppMultiSelectDropDown {...defaultProps} />);
        const combobox = screen.getByRole('combobox');
        fireEvent.click(combobox);
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 300)); // wait for animation
        });
        expect(mockOnOpenHandler).toHaveBeenCalledTimes(1);
    });

    test('should display options when opened', async () => {
        render(<AppMultiSelectDropDown {...defaultProps} />);
        const combobox = screen.getByRole('combobox');
        fireEvent.click(combobox);
        
        const listbox = await screen.findByRole('listbox');
        expect(listbox).toBeInTheDocument();
        expect(screen.getByText('Type 1')).toBeInTheDocument();
        expect(screen.getByText('Type 2')).toBeInTheDocument();
    });

    test('should call onChangeHandler when an option is clicked', async () => {
        render(<AppMultiSelectDropDown {...defaultProps} />);
        const combobox = screen.getByRole('combobox');
        fireEvent.click(combobox);

        const option = await screen.findByText('Type 1');
        fireEvent.click(option);

        expect(mockOnChangeHandler).toHaveBeenCalledWith(['type1']);
    });
    
    test('should call onCloseHandler when dropdown is closed by pressing escape', async () => {
        render(<AppMultiSelectDropDown {...defaultProps} />);
        const combobox = screen.getByRole('combobox');
        fireEvent.click(combobox); 
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 300)); // wait for animation
        });
        fireEvent.keyDown(combobox, { key: 'Escape', code: 'Escape' });
        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 300)); // wait for animation
        });
        expect(mockOnCloseHandler).toHaveBeenCalledTimes(1);
    });

    test('should call onCleanHandler when clean button is clicked', async () => {
        render(<AppMultiSelectDropDown {...defaultProps} />);
        const combobox = screen.getByRole('combobox');
        fireEvent.click(combobox);
        
        const option = await screen.findByText('Type 1');
        fireEvent.click(option);
        
        const clearButton = screen.getByLabelText('Clear');
        fireEvent.click(clearButton);
        
        expect(mockOnCleanHandler).toHaveBeenCalledTimes(1);
    });
});
