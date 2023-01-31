import { forwardRef, ForwardRefExoticComponent, Fragment, RefAttributes, useState } from 'react';
import { useLayer } from 'react-laag';
import { PlacementType } from 'react-laag/dist/PlacementType';
import { composeRefs } from 'utils/composeRefs';
import { Trigger } from './Dropdown.styles';

interface DropdownProps {
  placement?: PlacementType;
  children: React.ReactNode;
  content: ForwardRefExoticComponent<
    { handleToggle: () => void } & RefAttributes<HTMLUListElement>
  >;
  triggerOffset?: number;
}

export const Dropdown = forwardRef<HTMLButtonElement, DropdownProps>(
  (
    { placement = 'bottom-center', children, content: Content, triggerOffset = 5, ...rest },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

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
      onDisappear: disappearType => {
        if (disappearType === 'full') {
          setIsOpen(false);
        }
      },
      onOutsideClick: () => setIsOpen(false),
    });

    const handleToggle = () => setIsOpen(prev => !prev);

    return (
      <Fragment>
        <Trigger
          {...rest}
          {...triggerProps}
          onClick={handleToggle}
          ref={composeRefs(ref, triggerProps.ref)}
          type="button"
        >
          {children}
        </Trigger>

        {isOpen &&
          renderLayer(
            <Content
              {...layerProps}
              handleToggle={handleToggle}
            />,
          )}
      </Fragment>
    );
  },
);

Dropdown.displayName = 'Dropdown';
