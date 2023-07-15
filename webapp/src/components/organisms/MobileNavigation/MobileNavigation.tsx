import { Spacer } from 'components/atoms';
import { AnimatePresence, motion } from 'framer-motion';
import { throttle } from 'helpers/throttle';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Column } from 'simple-flexbox';

import { mobileNavigationNavigation } from './constants';
import { List, ListItem, StyledNav, StyledNavLink, Title } from './MobileNavigation.styles';

const MotionNav = motion(StyledNav);

export const MobileNavigation = () => {
  const { t } = useTranslation();

  const [prevScrollpos, setPrevScrollpos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);

  const onScroll = throttle(
    useCallback(() => {
      const currentScrollPos = window.pageYOffset;

      if (prevScrollpos > currentScrollPos || currentScrollPos < 100) {
        setVisible(true);
      } else {
        setVisible(false);
      }

      setPrevScrollpos(currentScrollPos);
    }, [prevScrollpos]),
    500,
  );

  useEffect(() => {
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  const animation = {
    initial: { opacity: 0, y: 90 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 90 },
  };

  return (
    <AnimatePresence>
      {visible && (
        <MotionNav {...animation}>
          <List>
            {mobileNavigationNavigation.map(({ to, title, icon: Icon }) => (
              <ListItem key={title}>
                <StyledNavLink
                  to={to}
                  end
                >
                  {({ isActive }: { isActive: boolean }) => (
                    <Column alignItems="center">
                      <Icon size="1.5rem" />

                      <Spacer space="0.25" />

                      <Title
                        fontColor={isActive ? 'text' : 'gray400'}
                        fontWeight={isActive ? '700' : '500'}
                        lineHeight="1rem"
                        textAlign="center"
                        fontSize="0.875"
                      >
                        {t(title)}
                      </Title>
                    </Column>
                  )}
                </StyledNavLink>
              </ListItem>
            ))}
          </List>
        </MotionNav>
      )}
    </AnimatePresence>
  );
};
