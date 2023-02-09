import {
  DeepRequired,
  FieldErrorsImpl,
  FieldValues,
  Path,
  PathValue,
  UseFormRegister,
  get,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface UseSelectProps<Fields extends FieldValues> {
  register: UseFormRegister<Fields>;
  name: Path<Fields>;
  errors: FieldErrorsImpl<DeepRequired<Fields>>;
}

export const useSelect = <Fields extends FieldValues>({
  register,
  name,
  errors,
  ...rest
}: UseSelectProps<Fields>) => {
  const { onChange: registerOnChange, ref, onBlur } = register(name);

  const onChange = (value: PathValue<Fields, Path<Fields>>) => {
    const e = {
      target: {
        name,
        value,
      },
    };

    registerOnChange(e);
  };

  const { t } = useTranslation();

  return {
    onChange,
    error: t(get(errors, name)?.message) || undefined,
    ref,
    onBlur,
    ...rest,
  };
};
