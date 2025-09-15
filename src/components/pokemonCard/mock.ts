import { IPokemonCardProps } from './types';

export const mockPokemonData: IPokemonCardProps['data'] = {
  id: 25,
  name: 'Pikachu',
  types: [{ type: { name: 'electric' } }],
  sprites: {
    other: {
      dream_world: {
        front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg',
      },
    },
    front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
  },
  stats: [],
  height: 4,
  weight: 60,
};
