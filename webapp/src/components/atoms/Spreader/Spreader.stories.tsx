import { Row } from 'simple-flexbox';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Spreader as SpreaderComponent } from 'components/atoms/Spreader';
import { Button } from 'components/atoms/Button';

export default {
  title: 'Atoms',
  component: SpreaderComponent,
} as ComponentMeta<typeof SpreaderComponent>;

const Template: ComponentStory<typeof SpreaderComponent> = args => (
  <Row>
    <Button>Left</Button>

    <SpreaderComponent {...args} />

    <Button>Right</Button>
  </Row>
);

export const Spreader = Template.bind({});

Spreader.args = {
  spread: 'medium',
};
