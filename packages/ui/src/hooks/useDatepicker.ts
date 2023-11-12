import { CalendarDate, CalendarDateTime, ZonedDateTime } from "@internationalized/date";
import { DateValue } from "react-aria";
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
		value: value as DateValue | null,
		onChange: (date: CalendarDate | CalendarDateTime | ZonedDateTime) => {
			setValue(name, date as PathValue<FormType, Path<FormType>>);
		},
	};
};
