import type { Meta, StoryObj } from '@storybook/react-webpack5';
import Loader from './loader';

const meta: Meta<typeof Loader> = {
  title: 'Components/Loader',
  component: Loader,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
