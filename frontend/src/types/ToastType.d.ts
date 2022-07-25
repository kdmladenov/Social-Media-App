import Toast from '../components/Toast';

interface ToastType {
  id: number;
  title?: string;
  image?: string;
  price: number;
  qty?: number;
  message?: string;
  type?: string;
}

export default ToastType;

export type ToastRefType = { createToast(toast: ToastType): void };


