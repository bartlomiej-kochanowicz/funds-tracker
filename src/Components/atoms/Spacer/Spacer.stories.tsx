import { Column } from 'simple-flexbox';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Spacer as SpacerComponent } from 'components/atoms/Spacer';
import { Button } from 'components/atoms/Button';

export default {
  title: 'Atoms',
  component: SpacerComponent,
} as ComponentMeta<typeof SpacerComponent>;

const Template: ComponentStory<typeof SpacerComponent> = args => (
  <Column>
    <Button>Top</Button>

    <SpacerComponent {...args} />

    <Button>Bottom</Button>
  </Column>
);

export const Spacer = Template.bind({});

Spacer.args = {
  space: 'medium',
};
