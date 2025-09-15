import React from 'react';
import { render, screen } from '@testing-library/react';
import EvolutionChainCard from './evolutionChainCard';
import { IEvolutionChainCardProps } from './types';

jest.mock('../../pokemonCard/pokemonCard', () => {
    return jest.fn(({ data }) => {
        if (data && data.id) {
            return <div data-testid="pokemon-card">{JSON.stringify(data)}</div>;
        }
        return null;
    });
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

    // it('renders evolution chain cards', () => {
    //     // render(<EvolutionChainCard {...mockProps} />);

    //     const pokemonCards = screen.getAllByTestId('pokemon-card');
    //     expect(pokemonCards).toHaveLength(3);

    //     pokemonCards.forEach((card, index) => {
    //         expect(card).toHaveTextContent(JSON.stringify(mockProps.data[index]));
    //     });

    //     const rightArrows = screen.getAllByAltText('right arrow icon');
    //     expect(rightArrows).toHaveLength(2);
    // });

    it('does not render pokemon cards if data is not present', () => {
        render(<EvolutionChainCard data={[]} />);
        const pokemonCards = screen.queryAllByTestId('pokemon-card');
        expect(pokemonCards).toHaveLength(0);
    });
});
