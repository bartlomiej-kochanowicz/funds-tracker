import { DeepMap, FieldError, Path, UseFormRegister } from 'react-hook-form';
import { get } from 'utils/get';

interface UseInputProps<Fields> {
  register: UseFormRegister<Fields>;
  name: Path<Fields>;
  errors: Partial<DeepMap<Fields, FieldError>>;
}

export const useInput = <Fields>({ register, name, errors }: UseInputProps<Fields>) => ({
  ...register(name),
  error: get(errors, name)?.message || null,
});
