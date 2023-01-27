import { Profile } from 'components/molecules';
import { useCallback, useEffect, useState } from 'react';
import { StyledRow } from './Topbar.styles';

export const Topbar = () => {
  const [visible, setVisible] = useState(window.pageYOffset !== 0);

  const onScroll = useCallback(() => {
    const currentScrollPos = window.pageYOffset;

    if (currentScrollPos > 0) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, []);

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
