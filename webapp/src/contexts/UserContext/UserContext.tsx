import { LazyQueryExecFunction, OperationVariables, useLazyQuery } from '@apollo/client';
import { GET_USER } from 'graphql/query';
import { isUserLoggedIn } from 'helpers/isUserLoggedIn';
import { createContext, FC, ReactNode, useContext } from 'react';
import { GetUserQuery } from '__generated__/graphql';

type UserContextType = {
  loading: boolean;
  user: GetUserQuery['user'];
  getUser: LazyQueryExecFunction<GetUserQuery, OperationVariables>;
  clearUser: () => void;
};

const UserContext = createContext<UserContextType | null>(null);

const useUser = (): UserContextType => {
  const [getUser, { loading, data, client, error }] = useLazyQuery<GetUserQuery>(GET_USER);

  if (
    isUserLoggedIn &&
    !loading &&
    !data &&
    error?.message !== 'Failed to fetch' &&
    error?.message !== 'Refresh token failed'
  ) {
    getUser();
  }

  const clearUser = () => {
    client.resetStore();
  };

  return { loading, user: data?.user ?? null, getUser, clearUser } as UserContextType;
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
