import { RadioGroup as RadioGroupComponent, RadioGroupItem } from "./RadioGroup";

type RadioGroupType = typeof RadioGroupComponent;

interface IRadioGroup extends RadioGroupType {
	Item: typeof RadioGroupItem;
}

export const RadioGroup = Object.assign(RadioGroupComponent, {
	Item: RadioGroupItem,
}) as IRadioGroup;
