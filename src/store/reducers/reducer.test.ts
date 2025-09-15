
import { reducer, initialState } from './reducer';

describe('reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, {} as any)).toEqual(initialState);
  });

  it('should handle ACTIONS.SET_POKEMON_LIST', () => {
    const action = {
      type: 'ACTIONS.SET_POKEMON_LIST',
      payload: [{ name: 'bulbasaur' }],
    };
    const expectedState = {
      ...initialState,
      pokemonsList: [{ name: 'bulbasaur' }],
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle ACTIONS.SET_ALL_POKEMON_LIST', () => {
    const action = {
      type: 'ACTIONS.SET_ALL_POKEMON_LIST',
      payload: [{ name: 'charmander' }],
    };
    const expectedState = {
      ...initialState,
      allPokemonsList: [{ name: 'charmander' }],
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle ACTIONS.SET_FILTERED_POKEMON_LIST', () => {
    const action = {
      type: 'ACTIONS.SET_FILTERED_POKEMON_LIST',
      payload: [{ name: 'squirtle' }],
    };
    const expectedState = {
      ...initialState,
      pokemonsList: [{ name: 'squirtle' }],
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle ACTIONS.SET_POKEMON_TYPE', () => {
    const action = {
      type: 'ACTIONS.SET_POKEMON_TYPE',
      payload: ['grass'],
    };
    const expectedState = {
      ...initialState,
      pokemonsTypes: ['grass'],
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle ACTIONS.SET_POKEMON_GENDER_LIST', () => {
    const action = {
      type: 'ACTIONS.SET_POKEMON_GENDER_LIST',
      payload: ['male'],
    };
    const expectedState = {
      ...initialState,
      pokemonGenderList: ['male'],
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle ACTIONS.SET_API_CALL_INPROGRESS', () => {
    const action = {
      type: 'ACTIONS.SET_API_CALL_INPROGRESS',
      payload: false,
    };
    const expectedState = {
      ...initialState,
      isLoading: false,
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle ACTIONS.SET_LOAD_MORE_API_CALL_INPROGRESS', () => {
    const action = {
      type: 'ACTIONS.SET_LOAD_MORE_API_CALL_INPROGRESS',
      payload: true,
    };
    const expectedState = {
      ...initialState,
      isLoadMoreInprogress: true,
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle ACTIONS.SET_POKEMON_BY_ID', () => {
    const action = {
      type: 'ACTIONS.SET_POKEMON_BY_ID',
      payload: { name: 'pikachu' },
    };
    const expectedState = {
      ...initialState,
      pokemonData: { name: 'pikachu' },
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle ACTIONS.RESET_POKEMON_DATA', () => {
    const state = {
      ...initialState,
      pokemonData: { name: 'pikachu' },
    };
    const action = {
      type: 'ACTIONS.RESET_POKEMON_DATA',
    };
    const expectedState = {
      ...state,
      pokemonData: null,
    };
    expect(reducer(state, action)).toEqual(expectedState);
  });

  it('should handle ACTIONS.SET_POKEMON_ID', () => {
    const action = {
      type: 'ACTIONS.SET_POKEMON_ID',
      payload: 25,
    };
    const expectedState = {
      ...initialState,
      pokemonSelectedId: 25,
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });
});
