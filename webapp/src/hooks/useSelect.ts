import { DeepMap, FieldError, Path, PathValue, UseFormSetValue } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { get } from 'utils/get';

interface UseSelectProps<Fields> {
  setValue: UseFormSetValue<Fields>;
  name: Path<Fields>;
  defaultValues: Fields;
  errors: Partial<DeepMap<Fields, FieldError>>;
}

export const useSelect = <Fields>({
  setValue,
  name,
  defaultValues,
  errors,
}: UseSelectProps<Fields>) => {
  const onChange = (value: PathValue<Fields, Path<Fields>>) => {
    setValue(name, value);
  };

  const { t } = useTranslation();

  return {
    onChange,
    defaultValue: get(defaultValues, name),
    error: t(get(errors, name)?.message) || null,
  };
};
