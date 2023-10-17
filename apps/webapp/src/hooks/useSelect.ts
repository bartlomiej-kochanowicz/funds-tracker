import {
	DeepRequired,
	FieldErrorsImpl,
	FieldValues,
	get,
	Path,
	PathValue,
	UseFormRegister,
} from "react-hook-form";

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
	const { onChange: registerOnChange, onBlur, ref } = register(name);

	const onChange = (value: PathValue<Fields, Path<Fields>>) => {
		const e = {
			target: {
				name,
				value,
			},
		};

		registerOnChange(e);
	};

	const button = document.createElement("button");

	ref(button);

	return {
		onChange,
		error: get(errors, name)?.message || undefined,
		defaultValue: button.value,
		onBlur,
		...rest,
	};
};
