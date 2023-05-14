import { forwardRef, useState } from 'react';

import { Handle, spring, StyledButton } from './Toggle.styles';

interface ToggleProps {
  defaultValue?: boolean;
  onChange?: (isToggled: boolean) => void;
}

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  ({ defaultValue = false, onChange, ...rest }) => {
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
        role="switch"
        aria-checked={isToggled}
        {...rest}
      >
        <Handle
          layout
          transition={spring}
        />
      </StyledButton>
    );
  },
);

Toggle.displayName = 'Toggle';
