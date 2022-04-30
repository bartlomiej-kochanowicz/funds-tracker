import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Text as TextComponent } from 'components/atoms/Text';

export default {
  title: 'Atoms',
  component: TextComponent,
} as ComponentMeta<typeof TextComponent>;

const Template: ComponentStory<typeof TextComponent> = args => <TextComponent {...args} />;

export const Text = Template.bind({});

Text.args = {
  children: 'Get Started Now',
  fontWeight: 400,
  fontColor: 'blue',
  fontSize: 'medium',
  lineHeight: '1',
  display: 'block',
};
