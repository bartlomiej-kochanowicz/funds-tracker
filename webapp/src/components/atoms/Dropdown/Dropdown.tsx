import { useSelect } from 'downshift';
import { forwardRef, Fragment, Key, MouseEventHandler, ReactNode, Ref } from 'react';
import { IconType } from 'react-icons';
import { mergeRefs, useLayer } from 'react-laag';
import { PlacementType } from 'react-laag/dist/PlacementType';

import { Menu } from '../Menu';
import { Trigger } from './Dropdown.styles';

type ItemCommon = {
  value: string | number;
  label: string | ReactNode;
  divider?: 'top' | 'bottom' | 'both';
  icon?: IconType;
};

type ItemButton = ItemCommon & {
  onClick?: () => void;
  to?: undefined;
};

type ItemLink = ItemCommon & {
  to?: string;
  onClick?: undefined;
};

export type Item = ItemButton | ItemLink;

export type DropdownItems = Item[];

interface DropdownProps {
  items: Item[];
  placement?: PlacementType;
  children:
    | ReactNode
    | ((props: {
        isOpen?: boolean;
        onClick: MouseEventHandler<HTMLButtonElement>;
        ref: Ref<HTMLButtonElement>;
      }) => ReactNode);
  triggerOffset?: number;
}

export const Dropdown = forwardRef<HTMLButtonElement, DropdownProps>(
  ({ items, placement = 'bottom-center', children, triggerOffset = 5, ...rest }, ref) => {
    const itemToString = (item: Item | null) => String(item?.value) || '';

    const { isOpen, getToggleButtonProps, getMenuProps, highlightedIndex, getItemProps, reset } =
      useSelect({
        items,
        itemToString,
      });

    const { renderLayer, triggerProps, layerProps, triggerBounds } = useLayer({
      isOpen,
      placement,
      auto: true,
      possiblePlacements: [
        'top-start',
        'top-center',
        'top-end',
        'bottom-start',
        'bottom-center',
        'bottom-end',
      ],
      triggerOffset,
      onDisappear: reset,
    });

    return (
      <Fragment>
        {typeof children === 'function' &&
          children({
            isOpen,
            ...rest,
            ...getMenuProps(triggerProps),
            ref: mergeRefs(ref, triggerProps.ref),
            ...getToggleButtonProps(triggerProps),
          })}

        {typeof children !== 'function' && (
          <Trigger
            {...rest}
            ref={mergeRefs(ref, triggerProps.ref)}
            {...getToggleButtonProps(triggerProps)}
            type="button"
          >
            {children}
          </Trigger>
        )}

        {renderLayer(
          <Menu
            {...getMenuProps(layerProps)}
            style={{
              minWidth: triggerBounds?.width,
              display: isOpen ? 'block' : 'none',
              ...layerProps.style,
            }}
          >
            {isOpen &&
              items.map(({ value = '', label = '', divider, ...itemRest }, index) => (
                <Fragment key={value as Key}>
                  {(divider === 'top' || divider === 'both') && <Menu.Divider />}

                  <Menu.Item
                    {...itemRest}
                    {...getItemProps({ item: { value, label }, index })}
                    highlighted={highlightedIndex === index}
                  >
                    {label}
                  </Menu.Item>

                  {(divider === 'bottom' || divider === 'both') && <Menu.Divider />}
                </Fragment>
              ))}
          </Menu>,
        )}
      </Fragment>
    );
  },
);

Dropdown.displayName = 'Dropdown';
