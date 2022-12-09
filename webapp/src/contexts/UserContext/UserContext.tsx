import { useLazyQuery } from '@apollo/client';
import { GET_USER } from 'apollo/query';
import { isUserLoggedIn } from 'helpers/isUserLoggedIn';
import { createContext, FC, ReactNode, useContext } from 'react';
import { GetUserQuery } from '__generated__/graphql';

type UserContextType = ReturnType<typeof useUser>;

const UserContext = createContext<UserContextType | null>(null);

const useUser = () => {
  const [getUser, { loading, data }] = useLazyQuery<GetUserQuery>(GET_USER);

  if (isUserLoggedIn && !loading && !data) {
    getUser();
  }

  return { loading, user: data?.user ?? null, getUser };
};

type ProviderProps = {
  children: ReactNode;
};

export const UserContextProvider: FC<ProviderProps> = ({ children }) => {
  const value = useUser();

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const value = useContext(UserContext);

  if (!value) {
    throw new Error('useUserContext must be used inside UserContextProvider');
  }

  return value;
};
