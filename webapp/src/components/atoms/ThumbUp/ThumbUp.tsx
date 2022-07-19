import { Center, CircleLg, CircleWrapper, Thumb, DotsWrapper, Dot } from './ThumbUp.styles';

export const ThumbUp = () => (
  <Center>
    <Thumb />
    <CircleWrapper>
      <CircleLg />
    </CircleWrapper>

    <DotsWrapper>
      <Dot position="top" />

      <Dot position="topRight" />

      <Dot position="bottomRight" />

      <Dot position="bottom" />

      <Dot position="bottomLeft" />

      <Dot position="topLeft" />
    </DotsWrapper>
  </Center>
);
