import { createContext, FC, useContext, useState } from 'react';
import { User } from '__generated__/graphql';

type UserContextType = ReturnType<typeof useUser>;

const UserContext = createContext<UserContextType | null>(null);

const useUser = () => {
  const [user, setUser] = useState<User | null>(null);

  return {
    user,
    setUser,
  };
};

type ProviderProps = {
  children: React.ReactNode;
};

export const UserProvider: FC<ProviderProps> = ({ children }) => {
  const value = useUser();

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const value = useContext(UserContext);

  if (!value) {
    throw new Error('useUserContext must be used inside UserProvider');
  }

  return value;
};
