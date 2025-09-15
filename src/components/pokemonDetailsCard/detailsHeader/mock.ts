import { IDetailsHeaderProps } from './types';
import { mockPokemonData } from '../../pokemonCard/mock';

export const mockSpeciesData = {
    flavor_text_entries: [
        {
            flavor_text: 'Pikachu that can generate powerful electricity have cheek sacs that are extra soft and super stretchy.',
            language: { name: 'en', url: '' },
            version: { name: 'alpha-sapphire', url: '' }
        },
        {
            flavor_text: 'When it is angered, it immediately discharges the energy stored in the sacs on its cheeks.',
            language: { name: 'en', url: '' },
            version: { name: 'black', url: '' }
        },
    ],
};

export const mockDetailsHeaderProps: IDetailsHeaderProps = {
    data: mockPokemonData,
    speciesData: mockSpeciesData,
    backClick: jest.fn(),
    closeClick: jest.fn(),
    forwordClick: jest.fn(),
};