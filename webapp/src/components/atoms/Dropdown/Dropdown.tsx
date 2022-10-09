import { Fragment, useState } from 'react';
import { useLayer } from 'react-laag';
import { Trigger } from './Dropdown.styles';

interface DropdownProps {
  children: React.ReactNode;
  content: React.ReactNode;
}

export const Dropdown = ({ children, content }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { renderLayer, triggerProps, layerProps } = useLayer({
    isOpen,
    placement: 'bottom-center',
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

      {isOpen && renderLayer(<div {...layerProps}>{content}</div>)}
    </Fragment>
  );
};
