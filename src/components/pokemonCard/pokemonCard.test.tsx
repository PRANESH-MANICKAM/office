
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PokemonCard from './pokemonCard';
import { mockPokemonData } from './mock';
import { numberFormation } from '../../services/common.service';

describe('PokemonCard component', () => {
  const onClick = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render with mock data', () => {
    render(<PokemonCard data={mockPokemonData} onClick={onClick} />);

    expect(screen.getByText(mockPokemonData.name)).toBeInTheDocument();
    expect(screen.getByText(numberFormation(mockPokemonData.id))).toBeInTheDocument();
    const pokemonImage = screen.getByAltText('Avatar');
    expect(pokemonImage).toHaveAttribute('src', mockPokemonData.sprites.other.dream_world.front_default);
  });

  it('should call the onClick handler when clicked', async () => {
    render(<PokemonCard data={mockPokemonData} onClick={onClick} />);
    const cardElement = screen.getByRole('presentation');
    await userEvent.click(cardElement);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should apply a custom className', () => {
    const customClass = 'my-custom-card';
    const { container } = render(<PokemonCard data={mockPokemonData} onClick={onClick} className={customClass} />);
    expect(container.firstChild).toHaveClass(customClass);
  });

  it('should use the fallback image if the dream_world image is not available', () => {
    const modifiedData = {
      ...mockPokemonData,
      sprites: {
        ...mockPokemonData.sprites,
        other: {
          ...mockPokemonData.sprites.other,
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

  it('should use a placeholder image if no image is available', () => {
    const modifiedData = {
      ...mockPokemonData,
      sprites: {
        ...mockPokemonData.sprites,
        other: {
            ...mockPokemonData.sprites.other,
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
