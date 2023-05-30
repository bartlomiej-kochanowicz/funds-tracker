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
}

export const useRadio = <FormType extends FieldValues>({
  control,
  name,
  setValue,
}: IUseRadio<FormType>) => {
  useController<FormType>({
    control,
    name,
  });

  return {
    id: name,
    onChange: (newValue: string) => setValue(name, newValue as PathValue<FormType, Path<FormType>>),
  };
};
