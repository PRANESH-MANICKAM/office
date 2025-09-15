import type { Meta, StoryObj } from '@storybook/react-webpack5';
import Header from './header';

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
