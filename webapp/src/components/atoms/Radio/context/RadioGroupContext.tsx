import {
  createContext,
  createRef,
  FC,
  KeyboardEvent,
  MouseEvent,
  ReactNode,
  useContext,
  useMemo,
} from 'react';

const useRadioGroup = (values: string[]) => {
  const redioRefs = useMemo(
    () => new Map(values.map(value => [value, createRef<HTMLDivElement>()])),
    [values],
  );

  const firstRadioButton = redioRefs.get(values[0]);
  const lastRadioButton = redioRefs.get(values[values.length - 1]);

  const setChecked = (target: HTMLDivElement) => {
    redioRefs.forEach(ref => {
      if (ref.current) {
        ref.current.setAttribute('aria-checked', 'false');
        ref.current.tabIndex = -1;
      }
    });

    target.setAttribute('aria-checked', 'true');
    target.tabIndex = 0;
    target.focus();
  };

  const setCheckedToPreviousItem = (target: HTMLDivElement) => {
    if (target === firstRadioButton?.current) {
      setChecked(lastRadioButton?.current as HTMLDivElement);
    } else {
      setChecked(target.previousElementSibling as HTMLDivElement);
    }
  };

  const setCheckedToNextItem = (target: HTMLDivElement) => {
    if (target === lastRadioButton?.current) {
      setChecked(firstRadioButton?.current as HTMLDivElement);
    } else {
      setChecked(target.nextElementSibling as HTMLDivElement);
    }
  };

  const register = (value: string) => {
    const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      const tgt = event.target as HTMLDivElement;
      let flag = false;

      switch (event.key) {
        case ' ':
        case 'Enter':
          setChecked(tgt);
          flag = true;
          break;

        case 'Up':
        case 'ArrowUp':
        case 'Left':
        case 'ArrowLeft':
          setCheckedToPreviousItem(tgt);
          flag = true;
          break;

        case 'Down':
        case 'ArrowDown':
        case 'Right':
        case 'ArrowRight':
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

      setChecked(tgt);
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
    throw new Error('useColorThemeContext must be used inside ColorThemeProvider');
  }

  return value;
};

type ProviderProps = {
  children: ReactNode;
  values: string[];
};

export const RadioGroupProvider: FC<ProviderProps> = ({ children, values }) => {
  const value = useRadioGroup(values);

  return <RadioGroupContext.Provider value={value}>{children}</RadioGroupContext.Provider>;
};
