import { Fragment } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { Button, Heading, Input, Select, Spacer, Spreader, Checkbox } from 'components/atoms';
import { Column, Row } from 'simple-flexbox';
import { useTranslation } from 'react-i18next';
import instruments from 'constants/selectors/instruments';
/* import { useAddModelPortfolioContext } from 'views/AddModelPortfolio/context'; */
import { useSelect } from 'hooks/useSelect';
import { DescribeText } from './DescribeText';

export const AddInstrumentForm = () => {
  const { t } = useTranslation();

  const options = instruments.map(({ label, ...rest }) => ({
    label: t(label),
    ...rest,
  }));

  /* const { updateState, actions } = useAddModelPortfolioContext(); */

  const onSubmit = async (values: typeof defaultValues) => {
    console.log(values);

    await new Promise(resolve => {
      setTimeout(resolve, 3000);
    });

    // updateState(actions.CHANGE_ADD_FIRST_SUCCESS);
  };

  const defaultValues = { instrumentName: '', instrumentType: 'stocks' };

  const { register, setValue, handleSubmit } = useForm({
    defaultValues,
    // resolver: yupResolver(validationSchema),
  });

  const instrumentTypeSelectProps = useSelect<typeof defaultValues>({
    setValue,
    name: 'instrumentType',
    defaultValue: defaultValues.instrumentType,
  });

  return (
    <Fragment>
      <Heading textAlign="center">Create your model portfolio</Heading>

      <Spacer space="small" />

      <DescribeText
        fontSize="0.875"
        fontColor="darkGray"
        textAlign="center"
      >
        Here you can provide the financial instruments you want to be exposed to or just your
        passives(like money on banking account / saving accounts).
      </DescribeText>

      <Spacer space="large" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Column>
          <Input
            placeholder="Name oy your instrument"
            {...register('instrumentName')}
          />

          <Spacer />

          <Select
            options={options}
            placeholder="Select type"
            {...instrumentTypeSelectProps}
          />

          <Spacer />

          <Checkbox label="Want to take into account in rebalance report" />

          <Spacer />

          <Input
            placeholder="Percentage of your portfolio"
            type="number"
            unit="percentage"
            min="0"
            max="100"
          />

          <Spacer space="large" />

          <Row justifyContent="flex-end">
            <Button
              type="submit"
              color="black"
            >
              <FaPlus />
              <Spreader spread="tiny" />
              Add instrument
            </Button>
          </Row>
        </Column>
      </form>
    </Fragment>
  );
};
