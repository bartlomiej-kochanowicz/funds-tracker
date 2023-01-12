import { createPortal } from 'react-dom';
import { Modal } from 'components/molecules';
import { createContext, FC, Suspense, useContext, useState } from 'react';
import { modals as modalsMap, Modals as TypeModalsMap } from 'modals';

let modalRoot = document.getElementById('modals') as HTMLElement;

// for tests
if (!modalRoot) {
  modalRoot = document.createElement('div');
  modalRoot.setAttribute('id', 'modals');
  modalRoot.setAttribute('data-testid', 'modals');
  document.body.appendChild(modalRoot);
}

type ModalsContextType = ReturnType<typeof useModals>;

type TypeModal = {
  name: TypeModalsMap;
};

const ModalsContext = createContext<ModalsContextType | null>(null);

const useModals = () => {
  const [modals, setModals] = useState<TypeModal[]>([]);

  const openModal = (modal: TypeModal) => {
    setModals(currentModals => [...currentModals, modal]);
  };

  const Modals = () => {
    return (
      <Suspense>
        {modals.map(({ name, ...rest }) => {
          const Component = modalsMap[name];

          return (
            <Modal.Background key={name}>
              <Modal>
                <Component {...rest} />
              </Modal>
            </Modal.Background>
          );
        })}
      </Suspense>
    );
  };

  return {
    openModal,
    modals: createPortal(<Modals />, modalRoot),
    modalsVisible: Boolean(modals.length),
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
