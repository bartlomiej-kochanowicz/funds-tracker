import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Loader as LoaderComponent } from 'components/atoms/Loader';

export default {
  title: 'Atoms',
  component: LoaderComponent,
} as ComponentMeta<typeof LoaderComponent>;

const Template: ComponentStory<typeof LoaderComponent> = args => <LoaderComponent {...args} />;

export const Loader = Template.bind({});

Loader.args = {
  size: 'medium',
  color: 'gray',
};
