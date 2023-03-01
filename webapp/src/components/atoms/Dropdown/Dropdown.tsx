import { AnimatePresence, HTMLMotionProps } from 'framer-motion';
import { dropdownAnimation } from 'helpers/dropdownAnimation';
import { forwardRef, ForwardRefExoticComponent, Fragment, ReactNode, useState } from 'react';
import { useLayer } from 'react-laag';
import { PlacementType } from 'react-laag/dist/PlacementType';
import { composeRefs } from 'utils/composeRefs';

import { Trigger } from './Dropdown.styles';

interface DropdownProps {
  placement?: PlacementType;
  children: ReactNode | (({ isOpen }: { isOpen?: boolean }) => ReactNode);
  content: ForwardRefExoticComponent<{ handleToggle: () => void } & HTMLMotionProps<'ul'>>;
  triggerOffset?: number;
}

export const Dropdown = forwardRef<HTMLButtonElement, DropdownProps>(
  (
    { placement = 'bottom-center', children, content: Content, triggerOffset = 5, ...rest },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const { renderLayer, triggerProps, layerProps, layerSide } = useLayer({
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

    const anmimationDirection = layerSide.includes('top') ? 5 : -5;

    return (
      <Fragment>
        <Trigger
          {...rest}
          {...triggerProps}
          onClick={handleToggle}
          ref={composeRefs(ref, triggerProps.ref)}
          type="button"
        >
          {typeof children === 'function' && children({ isOpen })}

          {typeof children !== 'function' && children}
        </Trigger>

        {renderLayer(
          <AnimatePresence>
            {isOpen && (
              <Content
                {...layerProps}
                handleToggle={handleToggle}
                {...dropdownAnimation(anmimationDirection)}
              />
            )}
          </AnimatePresence>,
        )}
      </Fragment>
    );
  },
);

Dropdown.displayName = 'Dropdown';
