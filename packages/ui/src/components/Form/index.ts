import {
	Form as FormComponent,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	useFormField,
} from "./Form";

type FormType = typeof FormComponent;

interface IForm extends FormType {
	Control: typeof FormControl;
	Description: typeof FormDescription;
	Field: typeof FormField;
	Item: typeof FormItem;
	Label: typeof FormLabel;
	Message: typeof FormMessage;
}

export const Form = Object.assign(FormComponent, {
	Control: FormControl,
	Description: FormDescription,
	Field: FormField,
	Item: FormItem,
	Label: FormLabel,
	Message: FormMessage,
}) as IForm;

export { useFormField };
