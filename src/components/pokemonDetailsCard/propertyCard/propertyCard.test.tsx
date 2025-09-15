import React from 'react';
import { render, screen } from '@testing-library/react';
import PropertyCard from './propertyCard';

const mockPokemon = {
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
    }]
};

const mockPokemonTypeData = {
    damage_relations: {
        double_damage_from: [
            { name: 'ground' }
        ]
    }
};

const mockSpeciesData = {
    egg_groups: [
        { name: 'monster' },
        { name: 'water1' }
    ]
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
        const incompletePokemon = {
            abilities: [],
            height: 0,
            weight: 0,
            types: []
        };
        const incompletePokemonTypeData = {
            damage_relations: {
                double_damage_from: []
            }
        };
        const incompleteSpeciesData = {
            egg_groups: []
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