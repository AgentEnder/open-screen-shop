import { Card } from '@mui/material';

import { useSelector } from 'react-redux';
import { Store } from '@open-screen-shop/order-form/state';
import { InitialDetailsForm } from './initial-details-form';
import { MaterialSelectionForm } from './material-selection-form';

/* eslint-disable-next-line */
export interface OrderFormUiProps {}

export function OrderFormUi(props: OrderFormUiProps) {
  const step = useSelector((store: Store) => store.order.step);

  return (
    <Card style={{ margin: '2.5rem', padding: '1rem' }}>
      {
        {
          initial: <InitialDetailsForm></InitialDetailsForm>,
          items: <></>,
          material: <MaterialSelectionForm></MaterialSelectionForm>,
          colors: <div>Pick colors + quantities</div>,
          customizations: <></>,
          summary: <></>,
        }[step]
      }
    </Card>
  );
}

export default OrderFormUi;


