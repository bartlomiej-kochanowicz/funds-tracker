import { FC } from 'react';
import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { ReactComponent as LogoHorizontal } from 'assets/logo/logo-name-horizontal.svg';
import { Column, Row } from 'simple-flexbox';
import { Heading } from 'components/atoms/Heading';
import { Spacer } from 'components/atoms/Spacer';
import { hasAccess } from 'helpers/hasAccess';
import { Button } from 'components/atoms/Button';

const Wrapper = styled(Row)`
  width: 100%;
  height: var(--doc-height);

  ${({ theme }) => css`
    background: ${theme.gradients.secondary};
    padding: ${theme.padding.medium};
  `}
`;

export const Home: FC = () => {
  const { t } = useTranslation();

  return (
    <Wrapper
      justifyContent="center"
      alignItems="center"
    >
      <Column alignItems="center">
        <LogoHorizontal width="500px" />

        <Spacer />

        {hasAccess ? (
          <Button size="large">{t('page.welcome.button')}</Button>
        ) : (
          <Heading
            level="h1"
            fontColor="light"
            textAlign="center"
          >
            {t('page.welcome.release_info')}
          </Heading>
        )}
      </Column>
    </Wrapper>
  );
};
