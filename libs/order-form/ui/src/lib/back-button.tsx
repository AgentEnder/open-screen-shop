import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { SlArrowLeft } from 'react-icons/sl';

import { OrderFormActions } from '@open-screen-shop/order-form/state';

export function BackButton(props: {
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}) {
  const dispatch = useDispatch();
  const { onClick, ...buttonProps } = props;
  return (
    <Button
      {...buttonProps}
      onClick={() => {
        props.onClick ? props.onClick() : dispatch(OrderFormActions.viewItems);
      }}
      variant="outlined"
    >
      <SlArrowLeft />
    </Button>
  );
}
