import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Select as SelectComponent } from 'components/atoms/Select';

export default {
  title: 'Atoms',
  component: SelectComponent,
} as ComponentMeta<typeof SelectComponent>;

const Template: ComponentStory<typeof SelectComponent> = args => <SelectComponent {...args} />;

export const Select = Template.bind({});

Select.args = {
  options: [
    { value: 'test-1', label: 'test-1' },
    { value: 'test-2', label: 'test-2' },
    { value: 'test-3', label: 'test-3' },
    { value: 'test-4', label: 'test-4' },
    { value: 'test-5', label: 'test-5' },
    { value: 'test-6', label: 'test-6' },
    { value: 'test-7', label: 'test-7' },
    { value: 'test-8', label: 'test-8' },
    { value: 'test-9', label: 'test-9' },
    { value: 'test-10', label: 'test-10' },
    { value: 'test-11', label: 'test-11' },
    { value: 'test-12', label: 'test-12' },
  ],
  defaultValue: 'test-1',
};
