import { Icon, Spreader } from 'components/atoms';
import { Profile } from 'components/molecules';
import { debounce } from 'helpers/debounce';
import { useMatches } from 'hooks/useMatches';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaAngleLeft } from 'react-icons/fa';
import { ROUTES } from 'routes/paths';

import { BackButton, StyledRow } from './Topbar.styles';

const withBackButton = [ROUTES.PORTFOLIOS.PORTFOLIO];

export const Topbar = () => {
  const { t } = useTranslation();

  const [visible, setVisible] = useState(window.pageYOffset !== 0);

  const rendreBackButton = useMatches(withBackButton);

  const onScroll = debounce(
    useCallback(() => {
      const currentScrollPos = window.pageYOffset;

      if (currentScrollPos > 0) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    }, []),
    100,
  );

  useEffect(() => {
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  return (
    <StyledRow
      justifyContent="flex-end"
      alignItems="center"
      hasBorder={visible}
    >
      {rendreBackButton ? (
        <BackButton to="..">
          <Icon
            icon={FaAngleLeft}
            size="1.5"
          />
          <Spreader spread="0.25" />

          {t('common.back')}
        </BackButton>
      ) : null}

      <Profile withName />
    </StyledRow>
  );
};
