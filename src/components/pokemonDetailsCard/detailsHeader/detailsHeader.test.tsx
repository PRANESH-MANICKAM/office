import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DetailsHeader from './detailsHeader';
import { mockDetailsHeaderProps } from './mock';
import { numberFormation } from '../../../services/common.service';

describe('DetailsHeader component', () => {
  it('renders pokemon name and ID', () => {
    render(<DetailsHeader {...mockDetailsHeaderProps} />);
    
    const nameElement = screen.getByRole('heading', { name: mockDetailsHeaderProps.data.name, level: 3 });
    expect(nameElement).toBeInTheDocument();
    
    const id = numberFormation(mockDetailsHeaderProps.data.id)
    const idElement = screen.getByRole('heading', { name: id, level: 3 });
    expect(idElement).toBeInTheDocument();
  });

  it('calls click handlers when icons are clicked', () => {
    render(<DetailsHeader {...mockDetailsHeaderProps} />);
    
    const backIcon = screen.getByAltText('back icon to go backword');
    fireEvent.click(backIcon);
    expect(mockDetailsHeaderProps.backClick).toHaveBeenCalled();
    
    const closeIcon = screen.getByAltText('close icon to go backword');
    fireEvent.click(closeIcon);
    expect(mockDetailsHeaderProps.closeClick).toHaveBeenCalled();
    
    const forwardIcon = screen.getByAltText('forword icon to go backword');
    fireEvent.click(forwardIcon);
    expect(mockDetailsHeaderProps.forwordClick).toHaveBeenCalled();
  });

  it('renders pokemon description and tooltip for long description', () => {
    const longDescriptionProps = {
        ...mockDetailsHeaderProps,
        speciesData: {
          ...mockDetailsHeaderProps.speciesData,
          flavor_text_entries: [
            { flavor_text: 'This is a very long description to trigger the tooltip. This is a very long description to trigger the tooltip. This is a very long description to trigger the tooltip. This is a very long description to trigger the tooltip. This is a very long description to trigger the tooltip. This is a very long description to trigger the tooltip. This is a very long description to trigger the tooltip. This is a very long description to trigger the tooltip. ', language: { name: 'en', url: '' }, version: { name: '' , url: ''} },
          ],
        },
      };
    render(<DetailsHeader {...longDescriptionProps} />);
    
    const descriptionElement = screen.getByText(/This is a very long description to trigger the tooltip/);
    expect(descriptionElement).toBeInTheDocument();
    
    const readMoreElement = screen.getByText('read more');
    expect(readMoreElement).toBeInTheDocument();
  });

  it('renders without tooltip for short description', () => {
    const shortDescriptionProps = {
      ...mockDetailsHeaderProps,
      speciesData: {
        ...mockDetailsHeaderProps.speciesData,
        flavor_text_entries: [
          { flavor_text: 'Short description.', language: { name: 'en', url: '' }, version: { name: '' , url: ''} },
        ],
      },
    };
    render(<DetailsHeader {...shortDescriptionProps} />);
    
    const readMoreElement = screen.queryByText('read more');
    expect(readMoreElement).not.toBeInTheDocument();
  });
  it('renders without description when speciesData is not available', () => {
    const propsWithoutSpeciesData = {
      ...mockDetailsHeaderProps,
      speciesData: undefined,
    };
    render(<DetailsHeader {...propsWithoutSpeciesData} />);
    const descriptionElement = screen.queryByText(/Pikachu that can generate powerful electricity/);
    expect(descriptionElement).not.toBeInTheDocument();
  });

  it('calls onKeyDown handlers when key is pressed on icons', () => {
    render(<DetailsHeader {...mockDetailsHeaderProps} />);
    const backIcon = screen.getByAltText('back icon to go backword');
    fireEvent.keyDown(backIcon, { key: 'Enter', code: 'Enter' });
    const closeIcon = screen.getByAltText('close icon to go backword');
    fireEvent.keyDown(closeIcon, { key: 'Enter', code: 'Enter' });
    const forwardIcon = screen.getByAltText('forword icon to go backword');
    fireEvent.keyDown(forwardIcon, { key: 'Enter', code: 'Enter' });
  });

  it('pokemon card is clicked', () => {
    render(<DetailsHeader {...mockDetailsHeaderProps} />);
    const pokemonCard = screen.getByAltText('Avatar').parentElement.parentElement;
    fireEvent.click(pokemonCard);
  });
});
