import { ToastRefType } from '../ToastType';

interface ToastProps {
  idDiv?: string;
  autoClose?: boolean;
  autoClosePeriod?: number;
  ref: React.Ref<ToastRefType>
}
export default ToastProps;
