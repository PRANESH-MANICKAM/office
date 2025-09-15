
import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import DetailPage from './details.page';
import * as commonService from '../../services/common.service';

// Mock the child components
jest.mock('../../components/pokemonDetailsCard/detailsHeader/detailsHeader', () => (props) => (
  <div data-testid="details-header">
    <button onClick={props.forwordClick}>forward</button>
    <button onClick={props.backClick}>backward</button>
    <button onClick={props.closeClick}>close</button>
  </div>
));
jest.mock('../../components/pokemonDetailsCard/propertyCard/propertyCard', () => () => <div data-testid="property-card" />);
jest.mock('../../components/pokemonDetailsCard/statCard/statCard', () => () => <div data-testid="stat-card" />);
jest.mock('../../components/pokemonDetailsCard/evolutionChainCard/evolutionChainCard', () => () => <div data-testid="evolution-chain-card" />);

const mockPokemonData = (id) => ({
  id: id,
  name: 'pokemon-' + id,
  stats: [],
  height: 7,
  weight: 69,
  abilities: [],
  types: [],
});

const mockPokemonSpecies = {
  flavor_text_entries: [],
  gender_rate: 4,
  evolution_chain: { url: '' },
};

const mockPokemonType = {
  damage_relations: {},
};

describe('DetailPage', () => {
  const toggleModal = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(commonService, 'getPokemonDataById').mockImplementation(async (id) => mockPokemonData(id));
    jest.spyOn(commonService, 'getSpeciesDataById').mockResolvedValue(mockPokemonSpecies as any);
    jest.spyOn(commonService, 'getPokemonTypesById').mockResolvedValue(mockPokemonType as any);
  });

  it('should render loader initially and then the pokemon details', async () => {
    render(<DetailPage isCardSelected={true} toggleModal={toggleModal} pokemonId={1} offset={10} />);
    await screen.findByTestId('details-header');

    expect(screen.getByTestId('details-header')).toBeInTheDocument();
    expect(screen.getByTestId('property-card')).toBeInTheDocument();
    expect(screen.getByTestId('stat-card')).toBeInTheDocument();
    expect(screen.getByTestId('evolution-chain-card')).toBeInTheDocument();
  });

  it('should handle forward and backward clicks', async () => {
    render(<DetailPage isCardSelected={true} toggleModal={toggleModal} pokemonId={2} offset={10} />);

    await screen.findByTestId('details-header');
    expect(commonService.getPokemonDataById).toHaveBeenCalledWith(2);

    act(() => {
      fireEvent.click(screen.getByText('forward'));
    });

    await waitFor(() => expect(commonService.getPokemonDataById).toHaveBeenCalledWith(3));
    await screen.findByTestId('details-header');

    act(() => {
      fireEvent.click(screen.getByText('backward'));
    });
    
    await waitFor(() => expect(commonService.getPokemonDataById).toHaveBeenCalledWith(2));
    await screen.findByTestId('details-header');
  });

  it('should not allow backward click on first pokemon', async () => {
    render(<DetailPage isCardSelected={true} toggleModal={toggleModal} pokemonId={1} offset={10} />);
    await screen.findByTestId('details-header');
    expect(commonService.getPokemonDataById).toHaveBeenCalledTimes(1);

    act(() => {
      fireEvent.click(screen.getByText('backward'));
    });

    await new Promise(r => setTimeout(r, 200));
    expect(commonService.getPokemonDataById).toHaveBeenCalledTimes(1);
  });

  it('should not allow forward click on last pokemon', async () => {
    render(<DetailPage isCardSelected={true} toggleModal={toggleModal} pokemonId={10} offset={10} />);
    await screen.findByTestId('details-header');
    expect(commonService.getPokemonDataById).toHaveBeenCalledTimes(1);
    
    act(() => {
      fireEvent.click(screen.getByText('forward'));
    });

    await new Promise(r => setTimeout(r, 200));
    expect(commonService.getPokemonDataById).toHaveBeenCalledTimes(1);
  });

  it('should close the modal when close button is clicked', async () => {
    render(<DetailPage isCardSelected={true} toggleModal={toggleModal} pokemonId={1} offset={10} />);
    await screen.findByTestId('details-header');

    act(() => {
      fireEvent.click(screen.getByText('close'));
    });

    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });
});
