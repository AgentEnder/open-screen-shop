import { TextField } from '@mui/material';
import { OrderFormActions, Store } from '@open-screen-shop/order-form/state';
import { useDispatch, useSelector } from 'react-redux';

export function ColorsAndQuantitiesForm() {
  const inProgressItem = useSelector((store: Store) =>
    store.order.inProgressItemId
      ? store.order.items[store.order.inProgressItemId]
      : undefined
  );
  const colorsAndQuantities = useSelector((store: Store) => {
    const item = store.order.inProgressItemId
      ? store.order.items[store.order.inProgressItemId]
      : undefined;
    if (!item) {
      return [];
    } else {
      return item.quantities;
    }
  });

  const dispatch = useDispatch();

  return (
    <form>
      {Object.entries(colorsAndQuantities).map(([color, size]) => (
        <fieldset>
          <legend>{color}</legend>
          {inProgressItem &&
            Object.entries(size).map(([size, quantity]) => (
              <TextField
                type="number"
                label={size}
                value={quantity}
                onChange={(evt) => {
                  const newQuantity = parseInt(evt.target.value);
                  dispatch(
                    OrderFormActions.setQuantityForItemColorSize({
                      itemId: inProgressItem?.id,
                      color,
                      size,
                      quantity: newQuantity,
                    })
                  );
                }}
              ></TextField>
            ))}
        </fieldset>
      ))}
    </form>
  );
}
