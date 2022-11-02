import { Button, Input, Spreader } from 'components/atoms';
import { useInput } from 'hooks/useInput';
import {
  DeepRequired,
  FieldErrorsImpl,
  UseFieldArrayRemove,
  UseFormRegister,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FaTrash } from 'react-icons/fa';
import { Row } from 'simple-flexbox';
import { DefaultValues } from 'views/Introduction/routes/Introduction/components/AddPortfoliosForm/AddPortfoliosForm.type';

interface PortfoliosFieldProps {
  register: UseFormRegister<DefaultValues>;
  errors: FieldErrorsImpl<DeepRequired<DefaultValues>>;
  index: number;
  remove: UseFieldArrayRemove;
}

export const PortfoliosField = ({ register, errors, index, remove }: PortfoliosFieldProps) => {
  const { t } = useTranslation();

  const nameInputProps = useInput<DefaultValues>({
    register,
    name: `portfolios.${index}.name`,
    errors,
  });

  const handleRemoveField = () => remove(index);

  return (
    <Row>
      <Input
        placeholder={t('common.input.name.placeholder')}
        flexGrow={1}
        {...nameInputProps}
      />

      <Spreader spread="tiny" />

      <Button
        borderRadius="secondary"
        color="secondary"
        onClick={handleRemoveField}
        boxShadow="none"
      >
        <FaTrash />
      </Button>
    </Row>
  );
};
