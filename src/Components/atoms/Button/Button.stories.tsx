import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button as ButtonComponent } from 'components/atoms/Button';

export default {
  title: 'Atoms',
  component: ButtonComponent,
} as ComponentMeta<typeof ButtonComponent>;

const Template: ComponentStory<typeof ButtonComponent> = args => <ButtonComponent {...args} />;

export const Button = Template.bind({});

Button.args = {
  children: 'Get Started Now',
  size: 'medium',
  type: 'button',
  color: 'blue',
  fontWeight: 400,
};
