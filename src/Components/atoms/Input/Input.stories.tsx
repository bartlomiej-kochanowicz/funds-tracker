import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Input as InputComponent } from 'components/atoms/Input';

export default {
  title: 'Atoms',
  component: InputComponent,
} as ComponentMeta<typeof InputComponent>;

const Template: ComponentStory<typeof InputComponent> = args => <InputComponent {...args} />;

export const Input = Template.bind({});

Input.args = {
  label: 'Test label',
  id: 'test-id',
  name: 'test-name',
};
