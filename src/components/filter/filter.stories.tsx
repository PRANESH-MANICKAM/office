import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import PokemonContext from '../../context/pokemonContext/pokmon.context';
import Filter from './filter';
import { mockPokemonContextValue } from './mock';

const meta: Meta<typeof Filter> = {
  title: 'Components/Filter',
  component: Filter,
  decorators: [
    (Story) => (
      <PokemonContext.Provider value={mockPokemonContextValue}>
        <Story />
      </PokemonContext.Provider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isFilterEnable: () => undefined,
  },
};
