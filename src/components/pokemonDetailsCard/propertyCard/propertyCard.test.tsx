import React from 'react';
import { render, screen } from '@testing-library/react';
import PropertyCard from './propertyCard';
import { IPokemonData, IPokemonSpecies, IPokemonType } from '../../../interface/pokemon.interface';

const mockPokemon: IPokemonData = {
    abilities: [
        { ability: { name: 'static' } },
        { ability: { name: 'lightning-rod' } }
    ],
    height: 4,
    weight: 60,
    types: [{
        type: {
            name: 'electric'
        }
    }],
    stats: [],
    name: 'Pikachu',
    id: 25,
    sprites: {
        other: {
            dream_world: {
                front_default: ''
            }
        }
    }
};

const mockPokemonTypeData: IPokemonType = {
    damage_relations: {
        double_damage_from: [
            { name: 'ground' }
        ]
    }
};

const mockSpeciesData: IPokemonSpecies = {
    egg_groups: [
        { name: 'monster', url: '' },
        { name: 'water1', url: '' }
    ],
    flavor_text_entries: [],
    evolution_chain: { url: '' },
    gender_rate: 0
};

jest.mock('../../../constants/pokemon.types', () => ({
    getCamleCaseString: (str: string) => {
        return str.replace(/(-|_)/g, ' ').replace(
            /\w\S*/g,
            function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    },
    getPokcolor: () => '#fff'
}));

describe('PropertyCard', () => {
    it('should render correctly', () => {
        render(<PropertyCard data={mockPokemon} speciesData={mockSpeciesData} pokemonTypeData={mockPokemonTypeData} />);
        expect(screen.getByText('Height')).toBeInTheDocument();
        expect(screen.getByText('Weight')).toBeInTheDocument();
        expect(screen.getByText('Abilities')).toBeInTheDocument();
        expect(screen.getByText('Weak Against')).toBeInTheDocument();
    });

    it('should display abilities', () => {
        render(<PropertyCard data={mockPokemon} speciesData={mockSpeciesData} pokemonTypeData={mockPokemonTypeData} />);
        expect(screen.getByText('Static')).toBeInTheDocument();
        expect(screen.getByText('Lightning Rod')).toBeInTheDocument();
    });

    it('should display height and weight', () => {
        render(<PropertyCard data={mockPokemon} speciesData={mockSpeciesData} pokemonTypeData={mockPokemonTypeData} />);
        expect(screen.getByText('4')).toBeInTheDocument();
        expect(screen.getByText('6 Kg')).toBeInTheDocument();
    });

    it('should display weak against types', () => {
        render(<PropertyCard data={mockPokemon} speciesData={mockSpeciesData} pokemonTypeData={mockPokemonTypeData} />);
        expect(screen.getByText('Ground')).toBeInTheDocument();
    });

    it('should handle missing data gracefully', () => {
        const incompletePokemon: IPokemonData = {
            abilities: [],
            height: 0,
            weight: 0,
            types: [],
            stats: [],
            name: '',
            id: 0,
            sprites: { other: { dream_world: { front_default: '' } } }
        };
        const incompletePokemonTypeData: IPokemonType = {
            damage_relations: {
                double_damage_from: []
            }
        };
        const incompleteSpeciesData: IPokemonSpecies = {
            egg_groups: [],
            flavor_text_entries: [],
            evolution_chain: { url: '' },
            gender_rate: 0
        };
        render(<PropertyCard data={incompletePokemon} speciesData={incompleteSpeciesData} pokemonTypeData={incompletePokemonTypeData} />);
        expect(screen.getByText('Abilities')).toBeInTheDocument();
        expect(screen.getByText('Height')).toBeInTheDocument();
        expect(screen.getByText('Weight')).toBeInTheDocument();
        expect(screen.getByText('Weak Against')).toBeInTheDocument();
        // Check that no abilities or weaknesses are rendered
        expect(screen.queryByText('Static')).not.toBeInTheDocument();
        expect(screen.queryByText('Ground')).not.toBeInTheDocument();
    });
});