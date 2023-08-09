import { Material } from '@open-screen-shop/catalog/model';
import { Order, OrderItem } from '@open-screen-shop/order-form/model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Store = {
  order: Order & {
    step:
      | 'initial'
      | 'items'
      | 'material'
      | 'colors'
      | 'customizations'
      | 'summary';
    inProgressItemId?: string | null;
  };
};

const initialState: Store['order'] = {
  contact: {},
  items: {},
  step: 'initial',
};

export const orderFormSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addItem: (state, { payload }: PayloadAction<Material>) => {
      const item: OrderItem = {
        id: Object.keys(state.items).length.toString(),
        material: payload,
        customizations: {},
        quantities: {},
      };
      state.items[item.id] = item;
      state.inProgressItemId = item.id;
      state.step = 'colors';
    },
    addCustomizationForItem: (
      state,
      {
        payload,
      }: PayloadAction<{
        itemId: string;
        slotId: string;
        customization: Order['items'][number]['customizations'][number];
      }>
    ) => {
      const item = state.items[payload.itemId];
      if (!item) {
        throw new Error('Item not found');
      }
      item.customizations ??= {};
      item.customizations[payload.slotId] = payload.customization;
    },
    addColorForItem: (
      state,
      {
        payload,
      }: PayloadAction<{
        itemId: string;
        color: string;
      }>
    ) => {
      const item = state.items[payload.itemId];
      if (!item) {
        throw new Error('Item not found');
      }
      item.quantities ??= {};
      item.quantities[payload.color] ??= {};
    },
    addSizeForItemColor: (
      state,
      {
        payload,
      }: PayloadAction<{
        itemId: string;
        color: string;
        size: string;
      }>
    ) => {
      const item = state.items[payload.itemId];
      if (!item) {
        throw new Error('Item not found');
      }
      item.quantities ??= {};
      item.quantities[payload.color] ??= {};
      item.quantities[payload.color][payload.size] = 0;
    },
    setQuantityForItemColorSize: (
      state,
      {
        payload,
      }: PayloadAction<{
        itemId: string;
        color: string;
        size: string;
        quantity: number;
      }>
    ) => {
      const item = state.items[payload.itemId];
      if (!item) {
        throw new Error('Item not found');
      }
      item.quantities ??= {};
      item.quantities[payload.color] ??= {};
      item.quantities[payload.color][payload.size] = payload.quantity;
    },
    setInitialDetails: (
      state,
      { payload }: PayloadAction<Pick<Order, 'contact' | 'description'>>
    ) => {
      state.contact = payload.contact;
      state.description = payload.description;
      state.step = Object.keys(state.items ?? {}).length ? 'items' : 'material';
    },
    completeItem: (state, action) => {
      state.step = 'items';
    },
    submitOrder: (state) => {
      state.step = 'summary';
    },
    viewItems: (state) => {
      state.step = 'items';
    },
    editInitialDetails: (state) => {
      state.step = 'initial';
    },
    editItem: (state, { payload }: PayloadAction<string>) => {
      state.step = 'colors';
      state.inProgressItemId = payload;
    },
  },
});

export const OrderFormActions = orderFormSlice.actions;
