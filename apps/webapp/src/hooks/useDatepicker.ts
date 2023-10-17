import {
	Control,
	FieldValues,
	Path,
	PathValue,
	useController,
	UseFormSetValue,
} from "react-hook-form";

interface IUseDatepicker<FormType extends FieldValues> {
	control: Control<FormType>;
	name: Path<FormType>;
	setValue: UseFormSetValue<FormType>;
}

export const useDatepicker = <FormType extends FieldValues>({
	control,
	name,
	setValue,
}: IUseDatepicker<FormType>) => {
	const {
		field: { value, ref, ...datepickerProps },
	} = useController<FormType>({
		control,
		name,
	});

	return {
		...datepickerProps,
		selected: value as Date | null,
		onChange: (date: Date | null) => setValue(name, date as PathValue<FormType, Path<FormType>>),
	};
};
