import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Select as SelectComponent } from 'components/atoms/Select';

export default {
  title: 'Atoms',
  component: SelectComponent,
} as ComponentMeta<typeof SelectComponent>;

const Template: ComponentStory<typeof SelectComponent> = args => <SelectComponent {...args} />;

export const Select = Template.bind({});

Select.args = {};
