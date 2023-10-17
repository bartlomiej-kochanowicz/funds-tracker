import { Control, FieldValues, Path, PathValue, useController } from "react-hook-form";

interface UseRegisterCombobox<FormType extends FieldValues, DefaultValue> {
	control: Control<FormType>;
	name: Path<FormType>;
	defaultValue?: DefaultValue;
}

export const useRegisterCombobox = <
	FormType extends FieldValues,
	DefaultValue extends PathValue<FormType, Path<FormType>>,
>({
	control,
	name,
	defaultValue,
}: UseRegisterCombobox<FormType, DefaultValue>) => {
	const {
		field: { value, onChange, ...rest },
	} = useController<FormType>({
		control,
		name,
		defaultValue,
	});

	return {
		...rest,
		onChange: (instrument: PathValue<FormType, Path<FormType>>) => onChange(instrument),
		defaultValue,
	};
};
