// import styled from 'styled-components';
import { Row } from 'simple-flexbox';
import { Input, Select, Spreader } from 'components/atoms';
import instruments from 'constants/selectors/instruments';
import { useTranslation } from 'react-i18next';
import { Checkbox } from 'components/atoms/Checkbox';

export const AddModelPortfolio = () => {
  const { t } = useTranslation(['common', 'selectors']);

  const options = instruments.map(({ label, ...rest }) => ({
    label: t(`selectors:${label}`),
    ...rest,
  }));

  return (
    <div>
      <form>
        <Row>
          <Input placeholder="Name" />

          <Spreader />

          <Select
            options={options}
            placeholder="Select the instrument"
          />

          <Spreader />

          <Checkbox
            id="test"
            name="test"
            label="test"
          />
        </Row>
      </form>
    </div>
  );
};
