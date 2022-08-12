import { Column, Row } from 'simple-flexbox';
import { useTranslation } from 'react-i18next';
import { InstrumentSymbol, Spreader, Text } from 'components/atoms';
import { Instrument as InstrumentProps } from 'services/model-portfolio/instruments';
import { Wrapper } from './Instrument.styles';

export const Instrument = ({ name, type, percentage }: InstrumentProps) => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Row>
        <InstrumentSymbol type={type} />

        <Spreader spread="tiny" />

        <Column>
          <Text fontWeight="700">{name}</Text>

          <Text>{t(`selectors.instruments.${type}`)}</Text>
        </Column>
      </Row>

      <Text>{percentage}%</Text>
    </Wrapper>
  );
};
