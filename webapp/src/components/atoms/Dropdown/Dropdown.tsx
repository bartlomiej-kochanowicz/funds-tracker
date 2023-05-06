import { AnimatePresence, HTMLMotionProps } from 'framer-motion';
import {
  forwardRef,
  ForwardRefExoticComponent,
  Fragment,
  MouseEventHandler,
  ReactNode,
  Ref,
  useState,
} from 'react';
import { LayerProps, mergeRefs, TriggerProps, useLayer } from 'react-laag';
import { PlacementType } from 'react-laag/dist/PlacementType';

import { Trigger } from './Dropdown.styles';

export type ContentProps = LayerProps & TriggerProps & { handleToggle: () => void };

interface DropdownProps {
  placement?: PlacementType;
  children:
    | ReactNode
    | ((props: {
        isOpen?: boolean;
        onClick: MouseEventHandler<HTMLButtonElement>;
        ref: Ref<HTMLButtonElement>;
      }) => ReactNode);
  content:
    | ForwardRefExoticComponent<{ handleToggle: () => void } & HTMLMotionProps<'ul'>>
    | ((props: ContentProps) => ReactNode);
  triggerOffset?: number;
}

export const Dropdown = forwardRef<HTMLButtonElement, DropdownProps>(
  ({ placement = 'bottom-center', children, content, triggerOffset = 5, ...rest }, ref) => {
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

    const Content = content as ForwardRefExoticComponent<
      { handleToggle: () => void } & HTMLMotionProps<'ul'>
    >;

    return (
      <Fragment>
        {typeof children === 'function' &&
          children({
            isOpen,
            ...rest,
            ...triggerProps,
            onClick: handleToggle,
            ref: mergeRefs(ref, triggerProps.ref),
          })}

        {typeof children !== 'function' && (
          <Trigger
            {...rest}
            {...triggerProps}
            onClick={handleToggle}
            ref={mergeRefs(ref, triggerProps.ref)}
            type="button"
          >
            {children}
          </Trigger>
        )}

        {renderLayer(
          <AnimatePresence>
            {isOpen && (
              <Fragment>
                {typeof content === 'function' &&
                  content({
                    ...layerProps,
                    handleToggle,
                  })}

                {typeof content !== 'function' && (
                  <Content
                    {...layerProps}
                    handleToggle={handleToggle}
                  />
                )}
              </Fragment>
            )}
          </AnimatePresence>,
        )}
      </Fragment>
    );
  },
);

Dropdown.displayName = 'Dropdown';
