import type { Meta, StoryObj } from '@storybook/react-webpack5';
import EvolutionChainCard from './evolutionChainCard';
import { mockPokemonData } from '../../pokemonCard/mock';

const meta: Meta<typeof EvolutionChainCard> = {
  title: 'Components/EvolutionChainCard',
  component: EvolutionChainCard,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: [mockPokemonData, mockPokemonData],
  },
};
