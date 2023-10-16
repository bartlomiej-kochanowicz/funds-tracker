import { toast, ToastOptions } from 'react-toastify';

const settings = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
} as ToastOptions;

export const showSuccessToast = (text: string) => toast.success(text, settings);

export const showErrorToast = (text: string) => toast.error(text, settings);
