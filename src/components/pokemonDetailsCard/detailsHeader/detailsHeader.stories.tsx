import type { Meta, StoryObj } from '@storybook/react-webpack5';
import DetailsHeader from './detailsHeader';
import { mockPokemonData } from '../../pokemonCard/mock';
import { mockSpeciesData } from './mock';

const meta: Meta<typeof DetailsHeader> = {
  title: 'Components/DetailsHeader',
  component: DetailsHeader,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: mockPokemonData,
    speciesData: mockSpeciesData,
    backClick: () => undefined,
    closeClick: () => undefined,
    forwordClick: () => undefined,
  },
};
