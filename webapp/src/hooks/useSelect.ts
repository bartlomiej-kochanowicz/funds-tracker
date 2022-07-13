import {
  DeepMap,
  FieldError,
  Path,
  PathValue,
  UseFormClearErrors,
  UseFormSetValue,
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { get } from 'utils/get';

interface UseSelectProps<Fields> {
  setValue: UseFormSetValue<Fields>;
  name: Path<Fields>;
  defaultValues: Fields;
  errors: Partial<DeepMap<Fields, FieldError>>;
  clearErrors: UseFormClearErrors<Fields>;
}

export const useSelect = <Fields>({
  setValue,
  name,
  defaultValues,
  errors,
  clearErrors,
}: UseSelectProps<Fields>) => {
  const onChange = (value: PathValue<Fields, Path<Fields>>) => {
    setValue(name, value);

    clearErrors(name);
  };

  const { t } = useTranslation();

  return {
    onChange,
    defaultValue: get(defaultValues, name) as keyof Fields,
    error: t(get(errors, name)?.message) || null,
  };
};
