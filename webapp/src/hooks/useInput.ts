import {
  DeepRequired,
  FieldErrorsImpl,
  FieldValues,
  Path,
  UseFormRegister,
  get,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface UseInputProps<Fields extends FieldValues> {
  register: UseFormRegister<Fields>;
  name: Path<Fields>;
  errors?: FieldErrorsImpl<DeepRequired<Fields>>;
}

export const useInput = <Fields extends FieldValues>({
  register,
  name,
  errors,
}: UseInputProps<Fields>) => {
  const { t } = useTranslation();

  return {
    ...register(name),
    error: t(get(errors, name)?.message) || undefined,
  };
};
