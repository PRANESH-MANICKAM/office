import { IPokemonContext } from '../../interface/pokemon.interface';

export const mockPokemonContextValue: IPokemonContext = {
  state: {
    allPokemonsList: [
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
      { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
    ],
    pokemonsTypes: [
      { label: 'Normal', value: 'https://pokeapi.co/api/v2/type/1/' },
      { label: 'Fighting', value: 'https://pokeapi.co/api/v2/type/2/' },
    ],
    pokemonGenderList: [
      { label: 'Male', value: 'https://pokeapi.co/api/v2/gender/2/' },
      { label: 'Female', value: 'https://pokeapi.co/api/v2/gender/1/' },
    ],
    pokemonsList: [],
    pokemonSelectedId: null,
    pokemonData: undefined,
    isLoading: false,
    isLoadMoreInprogress: false,
    filterPokemonList: [],
  },
  dispatch: () => undefined,
  getPokemonData: () => undefined,
  getPokemonDetailsListByUrl: () => Promise.resolve([]),
  setAppLoading: () => undefined,
};
