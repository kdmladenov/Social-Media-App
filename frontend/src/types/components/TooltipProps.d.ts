interface TooltipProps {
  text: JSX.Element | string;
  direction?: 'top' | 'bottom';
  children: React.ReactNode;
  classes?: string;
}
export default TooltipProps;
