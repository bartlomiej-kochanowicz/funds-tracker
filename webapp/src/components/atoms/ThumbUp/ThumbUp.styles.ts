import { FaThumbsUp } from 'react-icons/fa';
import styled, { css, keyframes } from 'styled-components';

const scale = keyframes`
  0% {
    transform: scale(0);
  }
  1% {
    transform: scale(0);
  }
  20% {
    transform: scale(0);
  }
  35% {
    transform: scale(1.4);
  }
  40% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.15);
  }
  65% {
    transform: scale(1);
  }
  90% {
    transform: scale(1);
  }
  100% {
    transform: scale(1);
  }
`;

const scaleCircle = keyframes`
  0% {
    border-width: 90px;
    transform: scale(0);
  }

  15% {
    border-color: #f1c40f;
    border-width: 90px;
  }
  30% {
    border-color: #2ecc71;
    opacity: 1;
  }
  35% {
    border-color: #3f8cff;
  }
  50% {
    border-width: 0;
    transform: scale(1);
    opacity: 0.3;
  }
  100% {
    border-width: 0;
    transform: scale(1);
    opacity: 0;
  }
`;

const slideUp = keyframes`
  0% {
    transform: translateY(0) scale(1);
    opacity: 0;
  }
  20% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }

  55% {
    transform: translateY(-125px) scale(1);
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(-125px) scale(0);
  }
`;

const slideUpRight = keyframes`
  0% {
    @include transform(translate(0) scale(1));
    opacity: 0;
  }
  20% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  55% {
    transform: translate(125px, -80px) scale(1);
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translate(125px, -80px) scale(0);
  }
`;

const slideDownRight = keyframes`
  0% {
    @include transform(translate(0) scale(1));
    opacity: 0;
  }
  20% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }

  55% {
    transform: translate(125px, 80px) scale(1);
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translate(125px, 80px) scale(0);
  }
`;

const slideDown = keyframes`
  0% {
    transform: translateY(0) scale(1);
    opacity: 0;
  }
  20% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }

  55% {
    transform: translateY(125px) scale(1);
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateY(125px) scale(0);
  }
`;

const slideDownLeft = keyframes`
  0% {
    transform: translate(0) scale(1);
    opacity: 0;
  }
  20% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }

  55% {
    transform: translate(-125px, 80px) scale(1);
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translate(-125px, 80px) scale(0);
  }
`;

const slideUpLeft = keyframes`
  0% {
    transform: translate(0) scale(1);
    opacity: 0;
  }
  20% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }

  55% {
    transform: translate(-125px, -80px) scale(1);
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translate(-125px, -80px) scale(0);
  }
`;

export const Center = styled.div`
  max-width: 120px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  transform: translateY(-50%);

  &::after {
    display: block;
    content: '';
    clear: both;
  }
`;

export const Thumb = styled(FaThumbsUp)`
  color: ${({ theme }) => theme.colors.blue};
  font-size: 96px;
  text-decoration: none;
  animation-name: ${scale};
  animation-timing-function: ease-in-out;
  animation-duration: 2s;
`;

export const CircleWrapper = styled.div`
  transform: translate(-50%, -50%);
  position: absolute;
  top: 50%;
  left: 50%;
  pointer-events: none;
`;

export const CircleLg = styled.div`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.blue};
  opacity: 0;
  animation-name: ${scaleCircle};
  animation-timing-function: ease-in-out;
  animation-duration: 1.25s;
`;

export const DotsWrapper = styled.div`
  transform: translate(-50%, -50%) rotate(3deg);
  position: absolute;
  top: 50%;
  left: 50%;
  width: 220px;
  height: 220px;
  pointer-events: none;
`;

export const Dot = styled.div<{
  position: 'top' | 'topRight' | 'bottomRight' | 'bottom' | 'bottomLeft' | 'topLeft';
}>`
  width: 10px;
  height: 10px;
  position: absolute;
  border-radius: 50%;
  background: #00ccff;
  margin: 0 auto;
  top: 105px;
  left: 0;
  right: 0;
  opacity: 0;
  animation-timing-function: ease-in-out;
  animation-duration: 1.25s;

  ${({ position }) => {
    switch (position) {
      case 'top':
        return css`
          background-color: #0cfbab;
          animation-name: ${slideUp};
        `;
      case 'topRight':
        return css`
          background-color: #f3396b;
          animation-name: ${slideUpRight};
        `;
      case 'bottomRight':
        return css`
          background-color: #08d3fc;
          animation-name: ${slideDownRight};
        `;
      case 'bottom':
        return css`
          background-color: #fcdb17;
          animation-name: ${slideDown};
        `;
      case 'bottomLeft':
        return css`
          background-color: #9b59b6;
          animation-name: ${slideDownLeft};
        `;
      case 'topLeft':
        return css`
          background-color: #34495e;
          animation-name: ${slideUpLeft};
        `;
      default:
        return null;
    }
  }}
`;
