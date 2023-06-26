import { on } from 'events';
import {
  Control,
  FieldValues,
  Path,
  PathValue,
  useController,
  UseFormSetValue,
} from 'react-hook-form';

interface IUseRadio<FormType extends FieldValues> {
  control: Control<FormType>;
  name: Path<FormType>;
  setValue: UseFormSetValue<FormType>;
  onChange?: (newValue: string) => void;
}

export const useRadio = <FormType extends FieldValues>({
  control,
  name,
  setValue,
  onChange,
}: IUseRadio<FormType>) => {
  useController<FormType>({
    control,
    name,
  });

  return {
    id: name,
    onChange: (newValue: string) => {
      if (onChange) onChange(newValue);

      setValue(name, newValue as PathValue<FormType, Path<FormType>>);
    },
  };
};
