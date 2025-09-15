import type { Meta, StoryObj } from '@storybook/react-webpack5';
import PropertyCard from './propertyCard';
import { mockPokemonData } from '../../pokemonCard/mock';
import { mockSpeciesData } from '../detailsHeader/mock';
import { mockPokemonTypeData } from './mock';

const meta: Meta<typeof PropertyCard> = {
  title: 'Components/PropertyCard',
  component: PropertyCard,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: mockPokemonData,
    speciesData: mockSpeciesData,
    pokemonTypeData: mockPokemonTypeData,
  },
};
