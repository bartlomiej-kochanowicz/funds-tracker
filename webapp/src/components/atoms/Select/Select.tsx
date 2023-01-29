import {
  ForwardedRef,
  forwardRef,
  Fragment,
  Key,
  ReactNode,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { useLayer } from 'react-laag';
import { ChangeHandler } from 'react-hook-form';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Spreader } from 'components/atoms/Spreader';
import { Menu } from 'components/atoms/Menu';
import { composeRefs } from 'utils/composeRefs';
import { useUpdateEffect } from 'hooks/useUpdateEffect';
import { Error, StyledButton, StyledContent, Wrapper } from './Select.styles';

type Item<ValueType> = {
  value: ValueType;
  label: string;
};

interface SelectProps<ValueType> {
  options: Item<ValueType>[];
  placeholder?: string;
  defaultValue?: string;
  onChange?: (value: Item<ValueType>['value']) => void;
  onBlur?: (() => void) | ChangeHandler;
  customLabel?: (value: Item<ValueType>) => ReactNode;
  error?: string;
  width?: 'auto' | 'fit-content' | `${number}px` | `${number}%`;
  flexGrow?: number;
}

const SelectInner = <ValueType,>(
  {
    options,
    defaultValue,
    placeholder,
    onChange,
    onBlur,
    customLabel,
    error,
    width = 'auto',
    flexGrow,
  }: SelectProps<ValueType>,
  ref: ForwardedRef<HTMLButtonElement>,
) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const getDefaultSelected = (): Item<ValueType> | null =>
    defaultValue ? options.find(option => option.value === defaultValue) || null : null;

  const [selected, setSelected] = useState<Item<ValueType> | null>(getDefaultSelected());

  useUpdateEffect(() => {
    if (onChange && selected) onChange(selected.value);
  }, [selected]);

  const buttonRef = useRef<HTMLButtonElement>(null);

  const isInModal = Boolean(buttonRef.current?.closest('[data-modal="true"]'));

  useImperativeHandle(ref, () => buttonRef.current as HTMLButtonElement);

  const { renderLayer, triggerProps, layerProps } = useLayer({
    isOpen,
    placement: 'bottom-center',
    auto: true,
    container: isInModal
      ? (document.querySelector('[data-modal="true"]') as HTMLElement)
      : undefined,
    possiblePlacements: ['bottom-center', 'top-center'],
    triggerOffset: 5,
    onDisappear: disappearType => {
      if (disappearType === 'full') {
        setIsOpen(false);
      }
    },
    onOutsideClick: () => setIsOpen(false),
  });

  const handleOpen = () => setIsOpen(prev => !prev);

  const minMenuWidth = (
    buttonRef.current?.offsetWidth ? `${Number(buttonRef.current?.offsetWidth)}px` : undefined
  ) as `${number}px`;

  return (
    <Fragment>
      <Wrapper
        width={width}
        flexGrow={flexGrow}
      >
        <StyledButton
          type="button"
          onClick={handleOpen}
          onBlur={onBlur}
          ref={composeRefs(buttonRef, triggerProps.ref)}
          error={Boolean(error)}
        >
          <StyledContent isSelected={Boolean(selected)}>
            {/* Render default label when customLabel is not provided */}
            {!customLabel && selected && selected.label}

            {/* Render customLabel when customLabel is provided */}
            {customLabel && selected && customLabel(selected)}

            {/* Render placeholder when nothing is selected */}
            {!selected && placeholder}
          </StyledContent>

          <Spreader spread="small" />

          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </StyledButton>

        {error && <Error>{error}</Error>}
      </Wrapper>

      {isOpen &&
        renderLayer(
          <Menu
            minMenuWidth={minMenuWidth}
            isInModal={isInModal}
            {...layerProps}
          >
            {options.map(({ value, label, ...rest }) => {
              const handleSelect = () => {
                setSelected({ value, label, ...rest });

                setIsOpen(false);
              };

              return (
                <Menu.Item
                  onClick={handleSelect}
                  isSelected={selected?.value === value}
                  key={value as Key}
                >
                  {label}
                </Menu.Item>
              );
            })}
          </Menu>,
        )}
    </Fragment>
  );
};

export const Select = forwardRef(SelectInner) as (<ValueType>(
  props: SelectProps<ValueType> & {
    ref?: React.ForwardedRef<HTMLButtonElement>;
  },
) => ReturnType<typeof SelectInner>) & {
  displayName: string;
  defaultProps: Partial<SelectProps<unknown>>;
};

Select.displayName = 'Select';
