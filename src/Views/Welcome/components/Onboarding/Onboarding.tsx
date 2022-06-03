import { FC } from 'react';
import { Column } from 'simple-flexbox';
import { Heading } from 'components/atoms/Heading';

type OnboardingProps = {
  title: string;
  subtitle: string;
};

export const Onboarding: FC<OnboardingProps> = ({ title, subtitle }) => (
  <Column>
    <Heading
      level="h1"
      textAlign="center"
      fontWeight={400}
    >
      {title}
    </Heading>

    <Heading
      level="h2"
      textAlign="center"
      fontWeight={400}
    >
      {subtitle}
    </Heading>
  </Column>
);
