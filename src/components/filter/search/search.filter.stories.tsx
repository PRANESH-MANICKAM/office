import type { Meta, StoryObj } from '@storybook/react-webpack5';
import SearchFilter from './search.filter';

const meta: Meta<typeof SearchFilter> = {
  title: 'Components/SearchFilter',
  component: SearchFilter,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Search...',
    label: 'Search',
    onChangeHandler: () => undefined,
  },
};
