import { Spacer, Text } from 'components/atoms';
import { useBreakpoint } from 'hooks/useBreakpoint';
import { Fragment } from 'react';
import { dashboardNavigation } from 'routes/navigation';
import { Column } from 'simple-flexbox';
import { List, ListItem, StyledNav, StyledNavLink } from './BottomBar.styles';

export const BottomBar = () => {
  const isPhone = useBreakpoint('phone', 'max');

  return (
    <StyledNav>
      <List>
        {dashboardNavigation.map(({ to, title, icon: Icon }) => (
          <ListItem key={title}>
            <StyledNavLink
              to={to}
              end
            >
              {({ isActive }) => (
                <Column alignItems="center">
                  <Icon size={isPhone ? '1.75rem' : '1.5rem'} />

                  {!isPhone && (
                    <Fragment>
                      <Spacer space="tiny" />

                      <Text
                        fontColor={isActive ? 'black' : 'darkGray'}
                        fontWeight={isActive ? '700' : '500'}
                        lineHeight="1rem"
                        textAlign="center"
                      >
                        {title}
                      </Text>
                    </Fragment>
                  )}
                </Column>
              )}
            </StyledNavLink>
          </ListItem>
        ))}
      </List>
    </StyledNav>
  );
};
