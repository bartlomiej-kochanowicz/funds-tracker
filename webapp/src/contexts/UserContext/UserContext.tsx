import { LazyQueryExecFunction, OperationVariables, useLazyQuery } from '@apollo/client';
import { GET_USER } from 'graphql/query';
import { isUserLoggedIn } from 'helpers/isUserLoggedIn';
import { createContext, FC, ReactNode, useContext } from 'react';
import { GetUserQuery } from '__generated__/graphql';

type UserContextType = {
  loading: boolean;
  user: GetUserQuery['user'];
  getUser: LazyQueryExecFunction<GetUserQuery, OperationVariables>;
};

const UserContext = createContext<UserContextType | null>(null);

const useUser = (): UserContextType => {
  const [getUser, { loading, data, refetch }] = useLazyQuery<GetUserQuery>(GET_USER);

  if (isUserLoggedIn && !loading && !data) {
    getUser();
  }

  return { loading, user: data?.user ?? null, getUser, refetch } as UserContextType;
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
