import { ForwardRefExoticComponent, Fragment, RefAttributes, useState } from 'react';
import { useLayer } from 'react-laag';
import { PlacementType } from 'react-laag/dist/PlacementType';
import { Trigger } from './Dropdown.styles';

interface DropdownProps {
  placement?: PlacementType;
  children: React.ReactNode;
  content: ForwardRefExoticComponent<RefAttributes<HTMLButtonElement>>;
}

export const Dropdown = ({ placement, children, content: Content }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { renderLayer, triggerProps, layerProps } = useLayer({
    isOpen,
    placement,
    auto: true,
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

  return (
    <Fragment>
      <Trigger
        {...triggerProps}
        onClick={handleOpen}
        type="button"
      >
        {children}
      </Trigger>

      {isOpen && renderLayer(<Content {...layerProps} />)}
    </Fragment>
  );
};

Dropdown.displayName = 'Dropdown';

Dropdown.defaultProps = {
  placement: 'bottom-center',
};
