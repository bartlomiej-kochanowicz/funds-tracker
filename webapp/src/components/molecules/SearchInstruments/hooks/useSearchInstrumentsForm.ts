import { SearchInstrumentsQuery } from '__generated__/graphql';
import {
  Control,
  FieldValues,
  Path,
  PathValue,
  useController,
  UseFormSetValue,
} from 'react-hook-form';

interface IUseSearchInstrumentsForm<FormType extends FieldValues> {
  control: Control<FormType>;
  name: Path<FormType>;
  setValue: UseFormSetValue<FormType>;
}

export const useSearchInstrumentsForm = <FormType extends FieldValues>({
  control,
  name,
  setValue,
}: IUseSearchInstrumentsForm<FormType>) => {
  const {
    field: { value, ref, ...searchInstrumentsProps },
  } = useController<FormType>({
    control,
    name,
  });

  return {
    ...searchInstrumentsProps,
    onChange: (instrument: SearchInstrumentsQuery['searchInstruments'][0]) =>
      setValue(name, instrument as PathValue<FormType, Path<FormType>>),
  };
};
