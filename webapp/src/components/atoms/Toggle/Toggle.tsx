import { useState } from 'react';

import { Handle, spring, StyledButton } from './Toggle.styles';

interface ToggleProps {
  defaultValue?: boolean;
  onChange?: (isToggled: boolean) => void;
}

export const Toggle = ({ defaultValue = false, onChange }: ToggleProps) => {
  const [isToggled, setIsToggled] = useState(defaultValue);

  const handleToggle = () =>
    setIsToggled(prev => {
      onChange?.(!prev);

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
