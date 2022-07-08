import { Column } from 'simple-flexbox';
import { useTranslation } from 'react-i18next';
import { Heading, Input, Select, Spacer } from 'components/atoms';
import instruments from 'constants/selectors/instruments';
import { Checkbox } from 'components/atoms/Checkbox';
import { FullscreenClear } from 'layouts/FullscreenClear';
import { StyledText } from './AddModelPortfolio.styles';

export const AddModelPortfolio = () => {
  const { t } = useTranslation();

  const options = instruments.map(({ label, ...rest }) => ({
    label: t(label),
    ...rest,
  }));

  return (
    <FullscreenClear
      alignItems="center"
      justifyContent="center"
    >
      <Heading textAlign="center">Create your model portfolio</Heading>

      <Spacer space="small" />

      <StyledText
        fontSize="0.875"
        fontColor="darkGray"
        textAlign="center"
      >
        Here you can provide the financial instruments you want to be exposed to or just your
        passives(like money on banking account / saving accounts).
      </StyledText>

      <Spacer space="large" />

      <form>
        <Column>
          <Input placeholder="Name oy your instrument" />

          <Spacer />

          <Select
            options={options}
            placeholder="Select type"
          />

          <Spacer />

          <Checkbox
            id="test"
            name="test"
            label="Want to take into account in rebalance report"
          />

          <Spacer />

          <Input
            placeholder="Percentage of your portfolio"
            type="number"
            min="0"
            max="100"
          />
        </Column>
      </form>
    </FullscreenClear>
  );
};
