import { Radio, RadioGroup } from 'components/atoms/Radio';
import { Column } from 'simple-flexbox';

export const Dashboard = () => (
  <Column>
    <RadioGroup
      id="test"
      label="Test"
    >
      <Radio value="aa">aa</Radio>
      <Radio value="bb">bb</Radio>
      <Radio value="cc">dd</Radio>
    </RadioGroup>
  </Column>
);
