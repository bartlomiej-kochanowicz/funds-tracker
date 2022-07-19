import { Column } from 'simple-flexbox';
import { useTranslation } from 'react-i18next';
import { FaPlus } from 'react-icons/fa';
import { Button, Heading, Spacer, Spreader, ThumbUp } from 'components/atoms';
import { DescribeText } from 'views/AddModelPortfolio/AddModelPortfolio.styles';

export const AddFirstInstrumentSuccess = () => {
  const { t } = useTranslation();

  return (
    <Column alignItems="center">
      <ThumbUp />

      <Spacer space="large" />

      <Heading>{t('add.instrument.success.title')}</Heading>

      <Spacer space="small" />

      <DescribeText
        fontSize="0.875"
        fontColor="darkGray"
        textAlign="center"
      >
        {t('add.instrument.success.description')}
      </DescribeText>

      <Spacer space="large" />

      <Button
        color="black"
        width="100%"
        size="large"
      >
        <FaPlus />
        <Spreader spread="tiny" />
        Add next one
      </Button>
    </Column>
  );
};
