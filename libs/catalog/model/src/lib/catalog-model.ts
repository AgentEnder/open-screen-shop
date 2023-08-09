/**
 * Represents a purchasable T-Shirt, Backpack, or other item that can be customized.
 */
export interface Material {
  id: string;
  
  /**
   * The label is the name of the material, as it will be displayed to the user.
   */
  label: string;

  /**
   * The description is a longer description of the material. Useful for supplying more details about the material, such as material, feel etc.
   */
  description?: string;

  /**
   * The image URL is the URL of the image that will be displayed to the user.
   */
  imageUrl?: string;

  /**
   * Record<size, price>
   */
  sizes: Record<string, number>;

  /**
   * Available colors for this material.
   */
  colors: string[];

  slots: CustomizationSlot[];

  tags: string[];
}

/**
 * A customization slot is a part of a material that can be customized.
 */
export interface CustomizationSlot {
  id: string;
  label: string;
  description?: string;

  /**
   * Record<option, price>
   */
  options: Record<string, number>;
}