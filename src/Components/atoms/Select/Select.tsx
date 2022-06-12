import { FC, Fragment, HTMLProps, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { useLayer } from 'react-laag';
import { darken } from 'color2k';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Spreader } from 'components/atoms/Spreader';
import { Menu } from 'components/atoms/Menu';
import { composeRefs } from 'utils/composeRefs';

const StyledButton = styled.button<HTMLProps<HTMLButtonElement>>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${({ theme }) => css`
    border-radius: ${theme.radius.secondary};
    border: 1px solid ${darken(theme.colors.lightGray, 0.05)};
    background-color: transparent;
    padding: 0.5rem 1.25rem;
    color: ${theme.colors.black};
    outline-color: ${theme.colors.blue};
    font-weight: ${theme.font.weight[500]};

    &:focus {
      background-color: ${darken(theme.colors.lightGray, 0.05)};
      color: ${theme.colors.blue};
      border: 1px solid ${theme.colors.blue};
    }

    &::placeholder {
      color: ${theme.colors.gray};
    }
  `}
`;

export const Select: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { renderLayer, triggerProps, layerProps } = useLayer({
    isOpen,
    overflowContainer: false,
    placement: 'bottom-center',
    auto: true,
    possiblePlacements: ['bottom-center', 'top-center'],
    onDisappear: disappearType => {
      if (disappearType === 'full') {
        setIsOpen(false);
      }
    },
    onOutsideClick: () => setIsOpen(false),
  });

  const handleOpen = () => setIsOpen(prev => !prev);

  const minMenuWidth = buttonRef.current?.offsetWidth ?? null;

  return (
    <Fragment>
      <StyledButton
        type="button"
        onClick={handleOpen}
        ref={composeRefs(buttonRef, triggerProps.ref)}
      >
        <span>Selected empty</span>

        <Spreader />

        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </StyledButton>

      {isOpen &&
        renderLayer(
          <Menu
            minMenuWidth={minMenuWidth}
            {...layerProps}
          >
            zajebiste menu
          </Menu>,
        )}
    </Fragment>
  );
};

Select.displayName = 'Select';
