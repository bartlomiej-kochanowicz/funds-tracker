import { IntroductionCreatePortfoliosInput } from '__generated__/graphql';
import { Button, Icon, Input, Spreader } from 'components/atoms';
import {
  DeepRequired,
  FieldErrorsImpl,
  UseFieldArrayRemove,
  UseFormRegister,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FaTrash } from 'react-icons/fa';
import { Row } from 'simple-flexbox';

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

      <Spreader $spread="0.25" />

      <Button
        color="secondary"
        onClick={handleRemoveField}
        boxShadow="none"
      >
        <Icon icon={FaTrash} />
      </Button>
    </Row>
  );
};
