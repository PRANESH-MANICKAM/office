import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HomePage from './home.page';
import PokemonContext from '../../context/pokemonContext/pokmon.context';
import { IPokemonContext, IPokemonList } from '../../interface/pokemon.interface';

// Mock child components
jest.mock('../../components/header/header', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div data-testid="header">{children}</div>,
}));
jest.mock('../../components/filter/filter', () => ({
  __esModule: true,
  default: ({ isFilterEnable }: { isFilterEnable: (isEnable: boolean) => void }) => (
    <div data-testid="app-filter">
      <button onClick={() => isFilterEnable(true)}>Enable Filter</button>
      <button onClick={() => isFilterEnable(false)}>Disable Filter</button>
    </div>
  ),
}));
jest.mock('../../components/pokemonCard/pokemonCard', () => ({
  __esModule: true,
  default: ({ data, onClick }: { data: any, onClick: () => void }) => (
    <div data-testid="pokemon-card" onClick={onClick}>
      {data.name}
    </div>
  ),
}));
jest.mock('../details/details.page', () => ({
  __esModule: true,
  default: ({ pokemonId }: { pokemonId: number }) => <div data-testid="detail-page">Pokemon ID: {pokemonId}</div>,
}));
jest.mock('../../components/loader/loader', () => ({
  __esModule: true,
  default: () => <div data-testid="app-loader">Loading...</div>,
}));

const mockPokemonContext: IPokemonContext = {
  state: {
    pokemonsList: [],
    isLoading: false,
    isLoadMoreInprogress: false,
    allPokemonsList: [],
    pokemonSelectedId: null,
    pokemonData: null,
    pokemonsTypes: [],
    pokemonGenderList: [],
    // FIX: The component expects filterPokemonList to be an array.
    // Providing a default empty array prevents a crash when the test runs.
    filterPokemonList: [],
  },
  dispatch: jest.fn(),
  getPokemonData: jest.fn(),
  getPokemonDetailsListByUrl: jest.fn(),
  setAppLoading: jest.fn(),
};

const renderHomePage = (contextValue: IPokemonContext) => {
  return render(
    <PokemonContext.Provider value={contextValue}>
      <HomePage />
    </PokemonContext.Provider>
  );
};

describe('HomePage', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render loader when context is not available', () => {
        render(
            <PokemonContext.Provider value={null}>
              <HomePage />
            </PokemonContext.Provider>
          );
        expect(screen.getByTestId('app-loader')).toBeInTheDocument();
    });

    it('should render header and filter components', () => {
        renderHomePage(mockPokemonContext);
        expect(screen.getByTestId('header')).toBeInTheDocument();
        expect(screen.getByTestId('app-filter')).toBeInTheDocument();
    });

    it('should display "No data found" when pokemonsList is empty', () => {
        renderHomePage(mockPokemonContext);
        expect(screen.getByText('No data found')).toBeInTheDocument();
    });

    it('should display loader when isLoading is true', () => {
        renderHomePage({ ...mockPokemonContext, state: { ...mockPokemonContext.state, isLoading: true } });
        expect(screen.getByTestId('app-loader')).toBeInTheDocument();
    });

    describe('with pokemon data', () => {
        const pokemons: IPokemonList[] = [
          { id: 1, name: 'Bulbasaur', url: '' },
          { id: 2, name: 'Ivysaur', url: '' },
        ];
        const contextWithData: IPokemonContext = {
          ...mockPokemonContext,
          state: {
            ...mockPokemonContext.state,
            pokemonsList: pokemons,
          },
        };

        it('should render pokemon cards', () => {
          renderHomePage(contextWithData);
          expect(screen.getAllByTestId('pokemon-card')).toHaveLength(2);
          expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
          expect(screen.getByText('Ivysaur')).toBeInTheDocument();
        });

        it('should show "Load more" button and handle click', async () => {
          renderHomePage(contextWithData);
          const loadMoreButton = screen.getByText('Load more');
          expect(loadMoreButton).toBeInTheDocument();
          await userEvent.click(loadMoreButton);
          expect(mockPokemonContext.getPokemonData).toHaveBeenCalledTimes(1);
        });

        it('should show loader when loading more', () => {
          renderHomePage({ ...contextWithData, state: { ...contextWithData.state, isLoadMoreInprogress: true } });
          expect(screen.getByTestId('app-loader')).toBeInTheDocument();
        });

        it('should open details page on card click', async () => {
          renderHomePage(contextWithData);
          const pokemonCard = screen.getByText('Bulbasaur');
          await userEvent.click(pokemonCard);
          expect(screen.getByTestId('detail-page')).toBeInTheDocument();
          expect(screen.getByText('Pokemon ID: 1')).toBeInTheDocument();
        });
    });

    describe('filter functionality', () => {
        const pokemons: IPokemonList[] = [
            { id: 1, name: 'Bulbasaur', url: '' },
            { id: 2, name: 'Ivysaur', url: '' },
          ];
          const contextWithData: IPokemonContext = {
            ...mockPokemonContext,
            state: {
              ...mockPokemonContext.state,
              pokemonsList: pokemons,
            },
          };

        it('should hide "Load more" button when filter is enabled', async () => {
            renderHomePage(contextWithData);
          const enableFilterButton = screen.getByText('Enable Filter');
          await userEvent.click(enableFilterButton);
          expect(screen.queryByText('Load more')).not.toBeInTheDocument();
        });

        it('should show "Load more" button when filter is disabled', async () => {
            renderHomePage(contextWithData);
            const enableFilterButton = screen.getByText('Enable Filter');
            await userEvent.click(enableFilterButton);
            const disableFilterButton = screen.getByText('Disable Filter');
            await userEvent.click(disableFilterButton);
            expect(screen.getByText('Load more')).toBeInTheDocument();
          });
    });
});
