import { RadioButton } from "./RadioButton";
import { RadioGroup } from "./RadioGroup";

type RadioType = typeof RadioGroup;

interface IRadio extends RadioType {
	Button: typeof RadioButton;
}

export const Radio = Object.assign(RadioGroup, {
	Button: RadioButton,
}) as IRadio;
