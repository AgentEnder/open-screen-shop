import { Material } from '@open-screen-shop/catalog/model';

export interface Order {
  id?: string;
  contact: {
    email?: string;
    phone?: string;
    name?: string;
  };
  description?: string;
  items: Record<string, OrderItem>;
}

export interface OrderItem {
  id: string;

  /**
   * The material is the T-Shirt, Backpack, or other item that can be customized.
   */
  material: Material;

  /**
   * Record<slotId, Customization>
   */
  customizations: Record<string, Customization>;

  /**
   * The amount of items of this size and color included in the order.
   * Record<color, Record<size, quantity>>
   */
  quantities: Record<string, Record<string, number>>;
}

/**
 * A customization is a specific option for a customization slot.
 */
export interface Customization {
  id: string;

  imageUrl?: string;
  description?: string;
}
