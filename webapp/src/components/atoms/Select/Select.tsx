import { Icon } from 'components/atoms/Icon';
import { Menu } from 'components/atoms/Menu';
import { Spreader } from 'components/atoms/Spreader';
import { useDropdownMenu } from 'hooks/useDropdownMenu';
import { useUpdateEffect } from 'hooks/useUpdateEffect';
import {
  ForwardedRef,
  forwardRef,
  Fragment,
  Key,
  ReactNode,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
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
  $error?: string;
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
    $error,
    width = 'auto',
    flexGrow,
    triggerOffset = 5,
    placement = 'bottom-start',
    ...rest
  }: SelectProps<ValueType>,
  ref: ForwardedRef<HTMLButtonElement>,
) => {
  const getDefaultSelected = (): Item<ValueType> | null =>
    defaultValue ? items.find(item => item.value === defaultValue) || null : null;

  const [selectedItem, setSelectedItem] = useState<Item<ValueType> | null>(getDefaultSelected());

  const menuItems = useMemo(
    () =>
      items.map(({ value, ...menuItemRest }) => ({
        onClick: () => setSelectedItem(items.find(item => item.value === value) || null),
        value,
        ...menuItemRest,
      })),
    [items],
  );

  const { buttonProps, itemProps, isOpen, setIsOpen } = useDropdownMenu(menuItems);

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
          $error={Boolean($error)}
          {...rest}
          {...buttonProps}
          ref={mergeRefs(buttonRef, triggerProps.ref, buttonProps.ref)}
          type="button"
        >
          <StyledContent $isSelected={Boolean(selectedItem)}>
            {/* Render default label when customLabel is not provided */}
            {!customLabel && selectedItem && selectedItem.label}

            {/* Render customLabel when customLabel is provided */}
            {customLabel && selectedItem && customLabel(selectedItem)}

            {/* Render placeholder when nothing is selected */}
            {!selectedItem && placeholder}
          </StyledContent>

          <Spreader $spread="0.5" />

          <Icon icon={isOpen ? FaChevronUp : FaChevronDown} />
        </StyledButton>

        {$error && <Error role="alert">{$error}</Error>}
      </Wrapper>

      {renderLayer(
        isOpen && (
          <Menu
            isInModal={isInModal}
            role="menu"
            {...layerProps}
            style={{
              minWidth: triggerBounds?.width,
              ...layerProps.style,
            }}
          >
            {menuItems.map(({ value, label, onClick, ...itemRest }, index) => (
              <Menu.Item
                $isSelected={selectedItem?.value === value}
                key={value as Key}
                {...itemRest}
                onClick={() => {
                  onClick();

                  setIsOpen(false);
                }}
                {...itemProps[index]}
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
