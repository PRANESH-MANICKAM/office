import { IDetailsHeaderProps } from './types';
import { mockPokemonData } from '../../pokemonCard/mock';

export const mockSpeciesData = {
    flavor_text_entries: [
        {
            flavor_text: 'Pikachu that can generate powerful electricity have cheek sacs that are extra soft and super stretchy.',
            language: { name: 'en' },
        },
        {
            flavor_text: 'When it is angered, it immediately discharges the energy stored in the sacs on its cheeks.',
            language: { name: 'en' },
        },
    ],
    evolution_chain: { url: 'https://pokeapi.co/api/v2/evolution-chain/10/' },
    gender_rate: 4,
    egg_groups: [
        { name: 'fairy', url: 'https://pokeapi.co/api/v2/egg-group/6/' },
        { name: 'ground', url: 'https://pokeapi.co/api/v2/egg-group/5/' },
    ],
};

export const mockDetailsHeaderProps: IDetailsHeaderProps = {
    data: mockPokemonData,
    speciesData: mockSpeciesData,
    backClick: () => undefined,
    closeClick: () => undefined,
    forwordClick: () => undefined,
};
