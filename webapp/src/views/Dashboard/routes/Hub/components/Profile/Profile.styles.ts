import styled, { keyframes } from 'styled-components';

const waving = keyframes`
	0% { transform: rotate( 0.0deg) }
   10% { transform: rotate(14.0deg) }
   20% { transform: rotate(-8.0deg) }
   30% { transform: rotate(14.0deg) }
   40% { transform: rotate(-4.0deg) }
   50% { transform: rotate(10.0deg) }
   60% { transform: rotate( 0.0deg) }
  100% { transform: rotate( 0.0deg) }
`;

export const WavingHand = styled.img`
  animation-name: ${waving};
  animation-duration: 2.5s;
  animation-iteration-count: 1;
  transform-origin: 70% 70%;
  display: inline-block;
`;
