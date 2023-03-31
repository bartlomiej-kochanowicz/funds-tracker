import { Icon, Spreader } from 'components/atoms';
import { Profile } from 'components/molecules';
import { debounce } from 'helpers/debounce';
import { useCallback, useEffect, useState } from 'react';
import { FaAngleLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { ROUTES } from 'routes/paths';

import { BackButton, StyledRow } from './Topbar.styles';

const withBackButton = [ROUTES.PORTFOLIOS.PORTFOLIO];

export const Topbar = () => {
  const [visible, setVisible] = useState(window.pageYOffset !== 0);

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
      {withBackButton ? (
        <BackButton to="..">
          <Icon
            icon={FaAngleLeft}
            size="1.5"
          />
          <Spreader spread="0.25" />
          Back
        </BackButton>
      ) : null}

      <Profile withName />
    </StyledRow>
  );
};
