import { createContext, FC, Fragment, useContext, useState } from 'react';

type ModalsContextType = ReturnType<typeof useModals>;

type Modal = {
  Component: FC;
};

const ModalsContext = createContext<ModalsContextType | null>(null);

const useModals = () => {
  const [modals, setModals] = useState<Modal[]>([]);

  const openModal = (modal: Modal) => {
    setModals(currentModals => [...currentModals, modal]);
  };

  const Modals = () => {
    return (
      <Fragment>
        {modals.map(({ Component }) => {
          return <Component />;
        })}
      </Fragment>
    );
  };

  return {
    openModal,
    Modals,
  };
};

type ProviderProps = {
  children: React.ReactNode;
};

export const ModalsProvider: FC<ProviderProps> = ({ children }) => {
  const value = useModals();

  return <ModalsContext.Provider value={value}>{children}</ModalsContext.Provider>;
};

export const useModalsContext = () => {
  const value = useContext(ModalsContext);

  if (!value) {
    throw new Error('useModalsContext must be used inside ModalsProvider');
  }

  return value;
};
