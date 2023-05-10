import { Icon } from 'components/atoms/Icon';
import { Menu } from 'components/atoms/Menu';
import { Spreader } from 'components/atoms/Spreader';
import { useSelect } from 'downshift';
import { useUpdateEffect } from 'hooks/useUpdateEffect';
import {
  ForwardedRef,
  forwardRef,
  Fragment,
  Key,
  ReactNode,
  useImperativeHandle,
  useRef,
} from 'react';
import { ChangeHandler } from 'react-hook-form';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { mergeRefs, useLayer } from 'react-laag';
import { PlacementType } from 'react-laag/dist/PlacementType';

import { Error, StyledButton, StyledContent, Wrapper } from './Select.styles';

type Item<ValueType> = {
  value: ValueType;
  label: string;
};

interface SelectProps<ValueType> {
  items: Item<ValueType>[];
  placeholder?: string;
  defaultValue?: string;
  onChange?: (value: Item<ValueType>['value']) => void;
  onBlur?: (() => void) | ChangeHandler;
  customLabel?: (value: Item<ValueType>) => ReactNode;
  error?: string;
  width?: 'auto' | 'fit-content' | `${number}px` | `${number}%`;
  flexGrow?: number;
  triggerOffset?: number;
  placement?: PlacementType;
}

const SelectInner = <ValueType,>(
  {
    items,
    defaultValue,
    placeholder,
    onChange,
    onBlur,
    customLabel,
    error,
    width = 'auto',
    flexGrow,
    triggerOffset = 5,
    placement = 'bottom-start',
  }: SelectProps<ValueType>,
  ref: ForwardedRef<HTMLButtonElement>,
) => {
  const itemToString = (item: Item<ValueType> | null) => item?.label || '';

  const getDefaultSelected = (): Item<ValueType> | null =>
    defaultValue ? items.find(item => item.value === defaultValue) || null : null;

  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    items,
    itemToString,
    defaultSelectedItem: getDefaultSelected(),
  });

  useUpdateEffect(() => {
    if (onChange && selectedItem) {
      onChange(selectedItem.value);
    }
  }, [selectedItem]);

  const buttonRef = useRef<HTMLButtonElement>(null);

  const isInModal = Boolean(buttonRef.current?.closest('[data-modal="true"]'));

  useImperativeHandle(ref, () => buttonRef.current as HTMLButtonElement);

  const { renderLayer, triggerProps, layerProps, triggerBounds } = useLayer({
    isOpen,
    placement,
    auto: true,
    container: isInModal
      ? (document.querySelector('[data-modal="true"]') as HTMLElement)
      : undefined,
    possiblePlacements: [
      'top-start',
      'top-center',
      'top-end',
      'bottom-start',
      'bottom-center',
      'bottom-end',
    ],
    triggerOffset,
  });

  return (
    <Fragment>
      <Wrapper
        width={width}
        flexGrow={flexGrow}
      >
        <StyledButton
          onBlur={onBlur}
          ref={mergeRefs(buttonRef, triggerProps.ref)}
          error={Boolean(error)}
          {...getToggleButtonProps(triggerProps)}
          type="button"
        >
          <StyledContent isSelected={Boolean(selectedItem)}>
            {/* Render default label when customLabel is not provided */}
            {!customLabel && selectedItem && selectedItem.label}

            {/* Render customLabel when customLabel is provided */}
            {customLabel && selectedItem && customLabel(selectedItem)}

            {/* Render placeholder when nothing is selected */}
            {!selectedItem && placeholder}
          </StyledContent>

          <Spreader spread="0.5" />

          <Icon icon={isOpen ? FaChevronUp : FaChevronDown} />
        </StyledButton>

        {error && <Error role="alert">{error}</Error>}
      </Wrapper>

      {renderLayer(
        isOpen && (
          <Menu
            isInModal={isInModal}
            {...getMenuProps(layerProps)}
            style={{
              minWidth: triggerBounds?.width,
              ...layerProps.style,
            }}
          >
            {items.map(({ value, label, ...rest }, index) => (
              <Menu.Item
                isSelected={selectedItem?.value === value}
                key={value as Key}
                {...getItemProps({ item: { value, label, ...rest }, index })}
                highlighted={highlightedIndex === index}
              >
                {label}
              </Menu.Item>
            ))}
          </Menu>
        ),
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
