import React from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AppFilter from './filter';
import PokemonContext from '../../context/pokemonContext/pokmon.context';
import * as commonService from '../../services/common.service';

// Mock child components
jest.mock('./multiSelectdropDown/multiSelectdropDown', () => (props) => (
  <div>
    <label htmlFor={`${props.label}-input`}>{props.label}</label>
    <input
      id={`${props.label}-input`}
      data-testid={`${props.label}-input`}
      onChange={(e) => props.onChangeHandler(e.target.value ? e.target.value.split(',') : [])}
      onFocus={props.onOpenHandler}
      onBlur={props.onCloseHandler}
    />
    <button onClick={props.onCleanHandler}>Clear {props.label}</button>
  </div>
));

jest.mock('./search/search.filter', () => (props) => (
    <div>
      <label htmlFor="search-input">{props.label}</label>
      <input
        id="search-input"
        placeholder={props.placeholder}
        data-testid="search-input"
        onChange={(e) => props.onChangeHandler(e.target.value, { preventDefault: () => {} })}
      />
    </div>
  ));

describe('AppFilter', () => {
    let mockDispatch;
    let mockGetPokemonData;
    let mockSetAppLoading;
    let mockGetPokemonDetailsListByUrl;
    let mockIsFilterEnable;
    let mockContextValue;
    let getPokemonTypesSpy;
    let getPokemonGendersSpy;
    let getAllParallelCallSpy;

    beforeEach(async () => {
        jest.useFakeTimers();
        mockDispatch = jest.fn();
        mockGetPokemonData = jest.fn();
        mockSetAppLoading = jest.fn();
        mockGetPokemonDetailsListByUrl = jest.fn().mockResolvedValue([]);
        mockIsFilterEnable = jest.fn();

        mockContextValue = {
            state: {
                allPokemonsList: [
                    { name: 'Pikachu', url: 'url-to-pikachu' },
                    { name: 'Charmander', url: 'url-to-charmander' },
                ],
                pokemonsTypes: [{ label: 'Electric', value: 'electric-url' }],
                pokemonGenderList: [{ label: 'Male', value: 'male-url' }],
            },
            dispatch: mockDispatch,
            getPokemonData: mockGetPokemonData,
            setAppLoading: mockSetAppLoading,
            getPokemonDetailsListByUrl: mockGetPokemonDetailsListByUrl,
        };

        getPokemonTypesSpy = jest.spyOn(commonService, 'getPokemonTypes').mockResolvedValue({ results: [{ name: 'electric', url: 'electric-url' }] });
        getPokemonGendersSpy = jest.spyOn(commonService, 'getPokemonGenders').mockResolvedValue({ results: [{ name: 'male', url: 'male-url' }] });
        getAllParallelCallSpy = jest.spyOn(commonService, 'getAllParallelCall').mockResolvedValue([]);

        await act(async () => {
          render(
              <PokemonContext.Provider value={mockContextValue as any}>
                  <AppFilter isFilterEnable={mockIsFilterEnable} />
              </PokemonContext.Provider>
          );
        });

        await waitFor(() => {
            expect(getPokemonTypesSpy).toHaveBeenCalled();
            expect(getPokemonGendersSpy).toHaveBeenCalled();
        });
    });

    afterEach(() => {
        jest.useRealTimers();
        jest.clearAllMocks();
    });

    test('should render all filter components', () => {
        expect(screen.getByLabelText('Search By')).toBeInTheDocument();
        expect(screen.getByLabelText('Type')).toBeInTheDocument();
        expect(screen.getByLabelText('Gender')).toBeInTheDocument();
    });

    test('should call getPokemonTypes and getPokemonGenders on mount', () => {
        expect(getPokemonTypesSpy).toHaveBeenCalledTimes(1);
        expect(getPokemonGendersSpy).toHaveBeenCalledTimes(1);
    });

    test('should handle search input change', async () => {
        const searchInput = screen.getByLabelText('Search By');
        await act(async () => {
            fireEvent.change(searchInput, { target: { value: 'Pika' } });
            // Fast-forward timers
            jest.advanceTimersByTime(4100);
        });

        await waitFor(() => {
            expect(mockSetAppLoading).toHaveBeenCalledWith(true);
            expect(mockIsFilterEnable).toHaveBeenCalledWith(true);
            expect(mockGetPokemonDetailsListByUrl).toHaveBeenCalled();
        });
    });

    test('should handle type filter change', async () => {
        const typeInput = screen.getByLabelText('Type');
        await act(async () => {
            fireEvent.change(typeInput, { target: { value: 'electric-url' } });
        });

        await waitFor(() => {
            expect(mockIsFilterEnable).toHaveBeenCalledWith(true);
            expect(getAllParallelCallSpy).toHaveBeenCalledWith(['electric-url']);
        });
    });

    test('should handle gender filter change', async () => {
        const genderInput = screen.getByLabelText('Gender');
        await act(async () => {
            fireEvent.change(genderInput, { target: { value: 'male-url' } });
        });

        await waitFor(() => {
            expect(mockIsFilterEnable).toHaveBeenCalledWith(true);
            expect(getAllParallelCallSpy).toHaveBeenCalledWith(['male-url']);
        });
    });

    test('should call getPokemonData and isFilterEnable on clean type handler', async () => {
        const clearButton = screen.getByText('Clear Type');
        await act(async () => {
            fireEvent.click(clearButton);
        });
        expect(mockIsFilterEnable).toHaveBeenCalledWith(false);
        expect(mockGetPokemonData).toHaveBeenCalledWith(true);
    });

    test('should call getPokemonData and isFilterEnable on clean gender handler', async () => {
        const clearButton = screen.getByText('Clear Gender');
        await act(async () => {
            fireEvent.click(clearButton);
        });
        expect(mockIsFilterEnable).toHaveBeenCalledWith(false);
        expect(mockGetPokemonData).toHaveBeenCalledWith(true);
    });

});
