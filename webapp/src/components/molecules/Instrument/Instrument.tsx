import { FC } from 'react';
import { Column, Row } from 'simple-flexbox';
import { useTranslation } from 'react-i18next';
import { InstrumentSymbol, Spreader, Text } from 'components/atoms';
import type { InstrumentType } from 'types/instrument.type';
import { Wrapper } from './Instrument.styles';

interface InstrumentProps {
  name: string;
  type: InstrumentType;
  percentage: number;
}

export const Instrument: FC<InstrumentProps> = ({ name, type, percentage }) => {
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
