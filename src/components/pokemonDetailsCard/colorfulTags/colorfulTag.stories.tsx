import type { Meta, StoryObj } from '@storybook/react-webpack5';
import ColorfulTag from './colorfulTag';

const meta: Meta<typeof ColorfulTag> = {
  title: 'Components/ColorfulTag',
  component: ColorfulTag,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "Fire",
    type: "fire"
  },
};
