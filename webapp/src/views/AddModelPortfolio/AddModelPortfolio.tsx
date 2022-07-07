// import styled from 'styled-components';
import { Column } from 'simple-flexbox';
import { Input, Select, Spacer } from 'components/atoms';
import instruments from 'constants/selectors/instruments';
import { useTranslation } from 'react-i18next';
import { Checkbox } from 'components/atoms/Checkbox';
import { FullscreenClear } from 'layouts/FullscreenClear';

export const AddModelPortfolio = () => {
  const { t } = useTranslation(['common', 'selectors']);

  const options = instruments.map(({ label, ...rest }) => ({
    label: t(`selectors:${label}`),
    ...rest,
  }));

  return (
    <FullscreenClear
      alignItems="center"
      justifyContent="center"
    >
      <form>
        <Column>
          <Input placeholder="Name" />

          <Spacer />

          <Select
            options={options}
            placeholder="Select the instrument"
          />

          <Spacer />

          <Checkbox
            id="test"
            name="test"
            label="test"
          />
        </Column>
      </form>
    </FullscreenClear>
  );
};
