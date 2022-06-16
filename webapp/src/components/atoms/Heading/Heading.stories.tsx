import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Heading as HeadingComponent } from 'components/atoms/Heading';

export default {
  title: 'Atoms',
  component: HeadingComponent,
} as ComponentMeta<typeof HeadingComponent>;

const Template: ComponentStory<typeof HeadingComponent> = args => <HeadingComponent {...args} />;

export const Heading = Template.bind({});

Heading.args = {
  children: 'Heading',
};
