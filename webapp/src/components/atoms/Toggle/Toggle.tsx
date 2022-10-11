import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { useState } from 'react';

const StyledDiv = styled.button<{ isToggled: boolean }>`
  width: 50px;
  height: 30px;
  display: flex;
  justify-content: flex-start;
  border-radius: 22px;
  padding: 3px;
  cursor: pointer;
  transition: background-color 250ms ease;
  border: 0;

  ${({ theme, isToggled }) => css`
    background-color: ${theme.colors.gray400};
    outline-color: ${theme.colors.blue};

    ${isToggled &&
    css`
      justify-content: flex-end;
      background-color: ${theme.colors.success};
    `}
  `}
`;

const Handle = styled(motion.div)`
  width: 24px;
  height: 24px;
  border-radius: 50%;

  ${({ theme }) => css`
    background-color: ${theme.colors.white};
  `}
`;

const spring = {
  type: 'spring',
  stiffness: 700,
  damping: 30,
};

export const Toggle = () => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => setIsToggled(prev => !prev);

  return (
    <StyledDiv
      isToggled={isToggled}
      onClick={handleToggle}
    >
      <Handle
        layout
        transition={spring}
      />
    </StyledDiv>
  );
};
