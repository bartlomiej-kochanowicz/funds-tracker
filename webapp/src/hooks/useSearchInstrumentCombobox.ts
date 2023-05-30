import { SearchInstrumentQuery } from '__generated__/graphql';
import {
  Control,
  FieldValues,
  Path,
  PathValue,
  useController,
  UseFormSetValue,
} from 'react-hook-form';

interface IUseSearchInstrumentCombobox<FormType extends FieldValues> {
  control: Control<FormType>;
  name: Path<FormType>;
  setValue: UseFormSetValue<FormType>;
}

export const useSearchInstrumentCombobox = <FormType extends FieldValues>({
  control,
  name,
  setValue,
}: IUseSearchInstrumentCombobox<FormType>) => {
  const {
    field: { value, ref, ...searchInstrumentProps },
  } = useController<FormType>({
    control,
    name,
  });

  return {
    ...searchInstrumentProps,
    onChange: (instrument: SearchInstrumentQuery['searchInstrument'][0]) =>
      setValue(name, instrument as PathValue<FormType, Path<FormType>>),
  };
};
