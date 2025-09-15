import type { Meta, StoryObj } from '@storybook/react-webpack5';
import StatCard from './statCard';
import { mockStats } from './mock';

const meta: Meta<typeof StatCard> = {
  title: 'Components/StatCard',
  component: StatCard,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    stats: mockStats,
  },
};
