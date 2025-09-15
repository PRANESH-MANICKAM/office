import type { Meta, StoryObj } from '@storybook/react-webpack5';
import PokemonCard from './pokemonCard';
import { mockPokemonData } from './mock';

const meta: Meta<typeof PokemonCard> = {
  title: 'Components/PokemonCard',
  component: PokemonCard,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: mockPokemonData,
    onClick: () => undefined,
  },
};
