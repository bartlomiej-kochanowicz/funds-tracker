import {
	createContext,
	createRef,
	FC,
	KeyboardEvent,
	MouseEvent,
	ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";

interface IUseRadioGroup {
	values: string[];
	onChange?: (value: string) => void;
	defaultValue?: string;
}

const useRadioGroup = ({ values, onChange, defaultValue }: IUseRadioGroup) => {
	const redioRefs = useMemo(
		() => new Map(values.map(value => [value, createRef<HTMLDivElement>()])),
		[values],
	);

	const firstRadioButton = redioRefs.get(values[0]);
	const lastRadioButton = redioRefs.get(values[values.length - 1]);

	const setChecked = useCallback(
		(target: HTMLDivElement, value: string, focus: boolean = true) => {
			redioRefs.forEach(ref => {
				if (ref.current) {
					ref.current.setAttribute("aria-checked", "false");
					ref.current.tabIndex = -1;
				}
			});

			target.setAttribute("aria-checked", "true");
			target.tabIndex = 0;

			if (focus) {
				target.focus();
			}

			if (onChange && focus) {
				onChange(value);
			}
		},
		[onChange, redioRefs],
	);

	const [isDefaultChecked, setIsDefaultChecked] = useState(false);

	useEffect(() => {
		if (defaultValue && !isDefaultChecked) {
			const target = redioRefs.get(defaultValue)?.current;

			if (target) {
				setChecked(target, defaultValue, false);
				setIsDefaultChecked(true);
			}
		}
	}, [defaultValue, setChecked, redioRefs, setIsDefaultChecked, isDefaultChecked]);

	const setCheckedToPreviousItem = (target: HTMLDivElement) => {
		if (target === firstRadioButton?.current) {
			setChecked(
				lastRadioButton?.current as HTMLDivElement,
				(lastRadioButton?.current as HTMLDivElement).getAttribute("value") as string,
			);
		} else {
			setChecked(
				target.previousElementSibling as HTMLDivElement,
				(target.previousElementSibling as HTMLDivElement).getAttribute("value") as string,
			);
		}
	};

	const setCheckedToNextItem = (target: HTMLDivElement) => {
		if (target === lastRadioButton?.current) {
			setChecked(
				firstRadioButton?.current as HTMLDivElement,
				(firstRadioButton?.current as HTMLDivElement).getAttribute("value") as string,
			);
		} else {
			setChecked(
				target.nextElementSibling as HTMLDivElement,
				(target.nextElementSibling as HTMLDivElement).getAttribute("value") as string,
			);
		}
	};

	const register = (value: string) => {
		const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
			const tgt = event.target as HTMLDivElement;
			let flag = false;

			switch (event.key) {
				case " ":
				case "Enter":
					setChecked(tgt, value);
					flag = true;
					break;

				case "Up":
				case "ArrowUp":
				case "Left":
				case "ArrowLeft":
					setCheckedToPreviousItem(tgt);
					flag = true;
					break;

				case "Down":
				case "ArrowDown":
				case "Right":
				case "ArrowRight":
					setCheckedToNextItem(tgt);
					flag = true;
					break;

				default:
					break;
			}

			if (flag) {
				event.stopPropagation();
				event.preventDefault();
			}
		};

		const onClick = (event: MouseEvent<HTMLDivElement>) => {
			const tgt = event.currentTarget;

			setChecked(tgt, value);
		};

		return {
			onKeyDown,
			onClick,
			ref: redioRefs.get(value),
			value,
		};
	};

	return { setChecked, setCheckedToPreviousItem, setCheckedToNextItem, register };
};

type RadioGroupContextType = ReturnType<typeof useRadioGroup>;

const RadioGroupContext = createContext<RadioGroupContextType | null>(null);

export const useRadioGroupContext = () => {
	const value = useContext(RadioGroupContext);

	if (!value) {
		throw new Error("useColorThemeContext must be used inside ColorThemeProvider");
	}

	return value;
};

type ProviderProps = {
	children: ReactNode;
	values: string[];
	onChange?: (value: string) => void;
	defaultValue?: string;
};

export const RadioGroupProvider: FC<ProviderProps> = ({
	children,
	values,
	onChange,
	defaultValue,
}) => {
	const value = useRadioGroup({ values, onChange, defaultValue });

	return <RadioGroupContext.Provider value={value}>{children}</RadioGroupContext.Provider>;
};
