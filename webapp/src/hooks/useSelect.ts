import {
  DeepRequired,
  FieldErrorsImpl,
  FieldValues,
  get,
  Path,
  PathValue,
  UseFormRegister,
} from 'react-hook-form';

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

  return {
    onChange,
    error: get(errors, name)?.message || undefined,
    ref,
    onBlur,
    ...rest,
  };
};
