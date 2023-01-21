import { useTranslation } from 'react-i18next';
import { Column } from 'simple-flexbox';
import { Spacer } from 'components/atoms';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { bottomBarNavigation } from './constants';
import { List, ListItem, StyledNav, StyledNavLink, Title } from './BottomBar.styles';

const MotionNav = motion(StyledNav);

export const BottomBar = () => {
  const { t } = useTranslation();

  const [prevScrollpos, setPrevScrollpos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);

  const onScroll = useCallback(() => {
    const currentScrollPos = window.pageYOffset;

    if (prevScrollpos > currentScrollPos) {
      setVisible(true);
    } else {
      setVisible(false);
    }

    setPrevScrollpos(currentScrollPos);
  }, [prevScrollpos]);

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
            {bottomBarNavigation.map(({ to, title, icon: Icon }) => (
              <ListItem key={title}>
                <StyledNavLink
                  to={to}
                  end
                >
                  {({ isActive }) => (
                    <Column alignItems="center">
                      <Icon size="1.5rem" />

                      <Spacer space="tiny" />

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
