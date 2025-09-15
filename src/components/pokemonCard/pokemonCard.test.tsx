import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PokemonCard from './pokemonCard';
import { mockPokemonData } from './mock';
import { numberFormation } from '../../services/common.service';

describe('PokemonCard component', () => {
  const onClick = jest.fn();

  it('renders with mock data', () => {
    render(<PokemonCard data={mockPokemonData} onClick={onClick} />);
    const pokemonName = screen.getByText(mockPokemonData.name);
    const pokemonId = screen.getByText(numberFormation(mockPokemonData.id));
    const pokemonImage = screen.getByAltText('Avatar');
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonId).toBeInTheDocument();
    expect(pokemonImage).toHaveAttribute('src', mockPokemonData.sprites.other.dream_world.front_default);
  });

  it('calls onClick handler when clicked', () => {
    render(<PokemonCard data={mockPokemonData} onClick={onClick} />);
    const cardElement = screen.getByRole('presentation');
    fireEvent.click(cardElement);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    const customClass = 'my-custom-card';
    const { container } = render(<PokemonCard data={mockPokemonData} onClick={onClick} className={customClass} />);
    expect(container.firstChild).toHaveClass(customClass);
  });

  it('uses fallback image if dream_world image is not available', () => {
    const modifiedData = {
      ...mockPokemonData,
      sprites: {
        ...mockPokemonData.sprites,
        other: {
          dream_world: {
            front_default: null,
          },
        },
      },
    };
    render(<PokemonCard data={modifiedData} onClick={onClick} />);
    const pokemonImage = screen.getByAltText('Avatar');
    expect(pokemonImage).toHaveAttribute('src', mockPokemonData.sprites.front_default);
  });

  it('uses placeholder image if no image is available', () => {
    const modifiedData = {
      ...mockPokemonData,
      sprites: {
        other: {
          dream_world: {
            front_default: null,
          },
        },
        front_default: null,
      },
    };
    render(<PokemonCard data={modifiedData} onClick={onClick} />);
    const pokemonImage = screen.getByAltText('Avatar');
    expect(pokemonImage).toHaveAttribute('src', 'https://via.placeholder.com/150');
  });
});
