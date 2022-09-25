import { DeepMap, FieldError, FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { get } from 'utils/get';

interface UseInputProps<Fields extends FieldValues> {
  register: UseFormRegister<Fields>;
  name: Path<Fields>;
  errors: Partial<DeepMap<Fields, FieldError>>;
}

export const useInput = <Fields extends FieldValues>({
  register,
  name,
  errors,
}: UseInputProps<Fields>) => {
  const { t } = useTranslation();

  return {
    ...register(name),
    error: t(get(errors, name)?.message) || null,
  };
};
