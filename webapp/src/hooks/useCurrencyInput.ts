import { Control, FieldValues, Path, PathValue, useController } from 'react-hook-form';

interface IUseCurrencyInput<FormValues extends FieldValues> {
  control: Control<FormValues>;
  name: Path<FormValues>;
  defaultValue?: PathValue<FormValues, Path<FormValues>>;
}

export const useCurrencyInput = <FormValues extends FieldValues>({
  control,
  name,
  defaultValue,
}: IUseCurrencyInput<FormValues>) => {
  const {
    field: { ref, onChange, ...props },
  } = useController<FormValues>({
    name,
    control,
    defaultValue,
  });

  return {
    onValueChange: (value?: PathValue<FormValues, Path<FormValues>>) => {
      onChange(value || ('' as PathValue<FormValues, Path<FormValues>>));
    },
    ...props,
    value: props.value as string,
  };
};
