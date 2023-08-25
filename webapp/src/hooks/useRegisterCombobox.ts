import { Control, FieldValues, Path, PathValue, useController } from 'react-hook-form';

interface UseRegisterCombobox<FormType extends FieldValues> {
  control: Control<FormType>;
  name: Path<FormType>;
}

export const useRegisterCombobox = <FormType extends FieldValues>({
  control,
  name,
}: UseRegisterCombobox<FormType>) => {
  const {
    field: { value, onChange, ...rest },
  } = useController<FormType>({
    control,
    name,
  });

  return {
    ...rest,
    onChange: (instrument: PathValue<FormType, Path<FormType>>) => onChange(instrument),
  };
};
