import { useLazyQuery } from '@apollo/client';
import { GetUser } from 'apollo/query';
import { createContext, FC, ReactNode, useContext } from 'react';

type UserContextType = ReturnType<typeof useUser>;

const UserContext = createContext<UserContextType | null>(null);

const useUser = () => {
  const [getUser, { loading, data }] = useLazyQuery(GetUser);

  return { loading, user: data, getUser };
};

type ProviderProps = {
  children: ReactNode;
};

export const UserProvider: FC<ProviderProps> = ({ children }) => {
  const value = useUser();

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = ({ isProtected }: { isProtected?: boolean } = {}) => {
  const value = useContext(UserContext);

  if (!value) {
    throw new Error('useUserContext must be used inside UserProvider');
  }

  if (isProtected && !value.user && !value.loading) {
    // value.getUser();
  }

  return value;
};
