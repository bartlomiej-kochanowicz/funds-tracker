import { Button, Input, Spreader } from 'components/atoms';
import {
  DeepRequired,
  FieldErrorsImpl,
  UseFieldArrayRemove,
  UseFormRegister,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FaTrash } from 'react-icons/fa';
import { Row } from 'simple-flexbox';
import { IntroductionCreatePortfoliosInput } from '__generated__/graphql';

interface PortfoliosFieldProps {
  register: UseFormRegister<IntroductionCreatePortfoliosInput>;
  errors: FieldErrorsImpl<DeepRequired<IntroductionCreatePortfoliosInput>>;
  index: number;
  remove: UseFieldArrayRemove;
}

export const PortfoliosField = ({ register, errors, index, remove }: PortfoliosFieldProps) => {
  const { t } = useTranslation();

  const handleRemoveField = () => remove(index);

  return (
    <Row>
      <Input
        placeholder={t('add.portfolios.input.placeholder')}
        flexGrow={1}
        {...register(`portfolios.${index}.name`)}
        error={errors.portfolios?.[index]?.name?.message}
      />

      <Spreader spread="tiny" />

      <Button
        color="secondary"
        onClick={handleRemoveField}
        boxShadow="none"
      >
        <FaTrash />
      </Button>
    </Row>
  );
};
