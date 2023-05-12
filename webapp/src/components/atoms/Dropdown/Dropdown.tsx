import { useDropdownMenu } from 'hooks/useDropdownMenu';
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
        onClick?: MouseEventHandler<HTMLButtonElement>;
        ref: Ref<HTMLButtonElement>;
      }) => ReactNode);
  triggerOffset?: number;
}

export const Dropdown = forwardRef<HTMLButtonElement, DropdownProps>(
  ({ items, placement = 'bottom-center', children, triggerOffset = 5, ...rest }, ref) => {
    const { buttonProps, itemProps, isOpen } = useDropdownMenu(items.length);

    const { renderLayer, triggerProps, layerProps } = useLayer({
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
    });

    return (
      <Fragment>
        {typeof children === 'function' &&
          children({
            isOpen,
            ...rest,
            ...buttonProps,
            ref: mergeRefs(ref, triggerProps.ref, buttonProps.ref),
          })}

        {typeof children !== 'function' && (
          <Trigger
            {...rest}
            {...buttonProps}
            ref={mergeRefs(ref, triggerProps.ref, buttonProps.ref)}
            type="button"
          >
            {children}
          </Trigger>
        )}

        {renderLayer(
          isOpen && (
            <Menu
              role="menu"
              {...layerProps}
            >
              {items.map(({ value = '', label = '', divider, ...itemRest }, index) => (
                <Fragment key={value as Key}>
                  {(divider === 'top' || divider === 'both') && <Menu.Divider />}

                  <Menu.Item
                    {...itemRest}
                    {...itemProps[index]}
                  >
                    {label}
                  </Menu.Item>

                  {(divider === 'bottom' || divider === 'both') && <Menu.Divider />}
                </Fragment>
              ))}
            </Menu>
          ),
        )}
      </Fragment>
    );
  },
);

Dropdown.displayName = 'Dropdown';
