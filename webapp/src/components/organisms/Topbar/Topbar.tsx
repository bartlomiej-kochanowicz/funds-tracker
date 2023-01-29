import { Profile } from 'components/molecules';
import { debounce } from 'helpers/debounce';
import { useCallback, useEffect, useState } from 'react';
import { StyledRow } from './Topbar.styles';

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
      hasBorder={visible}
    >
      <Profile withName />
    </StyledRow>
  );
};
