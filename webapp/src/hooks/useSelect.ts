import { Path, PathValue, UseFormSetValue } from 'react-hook-form';

interface UseSelectProps<Fields> {
  setValue: UseFormSetValue<Fields>;
  name: Path<Fields>;
  defaultValue: Fields[keyof Fields];
}

export const useSelect = <Fields>({ setValue, name, defaultValue }: UseSelectProps<Fields>) => {
  const onChange = (value: PathValue<Fields, Path<Fields>>) => {
    setValue(name, value);
  };

  return { onChange, defaultValue };
};
