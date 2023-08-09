import { catalogSlice } from '@open-screen-shop/catalog/state';
import { orderFormSlice } from '@open-screen-shop/order-form/state';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    [orderFormSlice.name]: orderFormSlice.reducer,
    [catalogSlice.name]: catalogSlice.reducer,
  },
});
