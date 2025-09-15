
import React from 'react';
import { render, screen } from '@testing-library/react';
import EvolutionChainCard from './evolutionChainCard';
import { IEvolutionChainCardProps } from './types';

// Mocking PokemonCard component which is a default export
jest.mock('../../pokemonCard/pokemonCard', () => (props) => {
    // a simple mock that renders the pokemon name and has the test id
    return <div data-testid="pokemon-card">{props.data.name}</div>;
});


describe('EvolutionChainCard', () => {
    const mockPokemon = {
        id: 1,
        name: 'Pikachu',
        types: [{ type: { name: 'electric' } }],
        sprites: {
            other: {
                dream_world: {
                    front_default: 'some-url.svg'
                }
            },
            front_default: 'some-other-url.png'
        }
    };

    const mockProps: IEvolutionChainCardProps = {
        data: [
            { ...mockPokemon, id: 1, name: 'Pichu' },
            { ...mockPokemon, id: 2, name: 'Pikachu' },
            { ...mockPokemon, id: 3, name: 'Raichu' }
        ]
    };

    it('renders evolution chain cards', () => {
        render(<EvolutionChainCard {...mockProps} />);

        const pokemonCards = screen.getAllByTestId('pokemon-card');
        expect(pokemonCards).toHaveLength(3);

        // Check if the names are rendered correctly.
        expect(pokemonCards[0]).toHaveTextContent('Pichu');
        expect(pokemonCards[1]).toHaveTextContent('Pikachu');
        expect(pokemonCards[2]).toHaveTextContent('Raichu');

        const rightArrows = screen.getAllByAltText('right arrow icon');
        expect(rightArrows).toHaveLength(2);
    });

    it('does not render pokemon cards if data is not present', () => {
        render(<EvolutionChainCard data={[]} />);
        const pokemonCards = screen.queryAllByTestId('pokemon-card');
        expect(pokemonCards).toHaveLength(0);
    });

    it('should return null when data is not an array', () => {
        const { container } = render(<EvolutionChainCard data={null as any} />);
        expect(container.firstChild).toBeNull();
    });
});
