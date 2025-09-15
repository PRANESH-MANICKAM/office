import type { Meta, StoryObj } from '@storybook/react-webpack5';
import AppMultiSelectDropDown from './multiSelectdropDown';

const meta: Meta<typeof AppMultiSelectDropDown> = {
  title: 'Components/MultiSelectDropDown',
  component: AppMultiSelectDropDown,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Select',
    data: [{label: 'Option 1', value: '1'}, {label: 'Option 2', value: '2'}],
    onChangeHandler: () => undefined,
    isOpen: false,
    onOpenHandler: () => undefined,
    onCloseHandler: () => undefined,
    onCleanHandler: () => undefined,
  },
};
