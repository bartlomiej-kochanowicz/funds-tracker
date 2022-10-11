import { useState } from 'react';
import { Handle, spring, StyledButton } from './Toggle.styles';

interface ToggleProps {
  isToggled?: boolean;
  onToggle?: (isToggled: boolean) => void;
}

export const Toggle = ({ isToggled: defaultState = false, onToggle }: ToggleProps) => {
  const [isToggled, setIsToggled] = useState(defaultState);

  const handleToggle = () =>
    setIsToggled(prev => {
      onToggle?.(!prev);

      return !prev;
    });

  return (
    <StyledButton
      isToggled={isToggled}
      onClick={handleToggle}
    >
      <Handle
        layout
        transition={spring}
      />
    </StyledButton>
  );
};

Toggle.displayName = 'Toggle';

Toggle.defaultProps = {
  isToggled: false,
  onToggle: () => {},
};
