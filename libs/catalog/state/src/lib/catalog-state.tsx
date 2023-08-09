import { Material } from '@open-screen-shop/catalog/model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const MOCK_COLORS: Material['colors'] = [
  'Black',
  'White',
  'Red',
  'Blue',
  'Green',
];
const MOCK_SIZES: Material['sizes'] = {
  S: 8,
  M: 10,
  L: 10,
  XL: 10,
  '2XL': 12,
  '3XL': 15,
};
const MOCK_T_SHIRT_SLOTS: Material['slots'] = [
  {
    id: '1',
    label: 'Front',
    description: 'The front of the t-shirt',
    options: {
      Embroidery: 10,
      'Screen Print': 5,
      Vinyl: 3,
    },
  },
  {
    id: '2',
    label: 'Back',
    description: 'The back of the t-shirt',
    options: {
      'Screen Print': 5,
      Vinyl: 3,
    },
  },
  {
    id: '3',
    label: 'Left Sleeve',
    description: 'The left sleeve of the t-shirt',
    options: {
      'Screen Print': 5,
    },
  },
  {
    id: '4',
    label: 'Right Sleeve',
    description: 'The right sleeve of the t-shirt',
    options: {
      'Screen Print': 5,
    },
  },
];
const MOCK_BACKPACK_SLOTS: Material['slots'] = [
  {
    id: '1',
    label: 'Front',
    description: 'The front of the backpack',
    options: {
      'Screen Print': 5,
      Vinyl: 3,
    },
  },
];

const MOCK_MATERIALS: Material[] = [
  {
    id: '1',
    label: 'Bella + Canvas 3001',
    slots: MOCK_T_SHIRT_SLOTS,
    colors: MOCK_COLORS,
    sizes: MOCK_SIZES,
    description:
      'Aliqua deserunt excepteur ullamco in do enim. Eu mollit fugiat id incididunt veniam voluptate quis non sunt fugiat occaecat. Eu et velit pariatur laboris fugiat proident non magna aute consectetur ea incididunt. Esse laboris consequat anim nostrud adipisicing nostrud consectetur in.',
    tags: ['t-shirt', 'cotton', 'unisex'],
  },
  {
    id: '2',
    label: 'Hanes 5250',
    slots: MOCK_T_SHIRT_SLOTS,
    colors: MOCK_COLORS,
    sizes: MOCK_SIZES,
    description:
      'Consequat culpa consectetur et aliqua incididunt tempor fugiat esse culpa cillum nisi eiusmod nulla. Sunt cupidatat adipisicing ipsum fugiat amet. Eiusmod tempor elit voluptate ex non est laboris.',
    tags: ['t-shirt', 'cotton', 'unisex'],
  },
  {
    id: '3',
    label: 'Gildan 64000',
    slots: MOCK_T_SHIRT_SLOTS,
    colors: MOCK_COLORS,
    sizes: MOCK_SIZES,
    description: 'Lorem ipsum dolor sit amet.',
    tags: ['t-shirt', 'cotton', 'unisex'],
  },
  {
    id: '4',
    label: 'Next Level 6210',
    slots: MOCK_T_SHIRT_SLOTS,
    colors: MOCK_COLORS,
    sizes: MOCK_SIZES,
    tags: ['t-shirt', 'cotton', 'unisex'],
  },
  {
    id: '5',
    label: 'Hanes 5250',
    slots: MOCK_T_SHIRT_SLOTS,
    colors: MOCK_COLORS,
    sizes: MOCK_SIZES,
    tags: ['t-shirt', 'cotton', 'unisex'],
  },
  {
    id: '6',
    label: 'Gildan 64000',
    slots: MOCK_T_SHIRT_SLOTS,
    colors: MOCK_COLORS,
    sizes: MOCK_SIZES,
    tags: ['t-shirt', 'cotton', 'unisex'],
  },
  {
    id: '7',
    label: 'Sling Bag',
    slots: MOCK_BACKPACK_SLOTS,
    colors: MOCK_COLORS,
    sizes: {
      '': 10,
    },
    tags: ['backpack', 'polyester', 'unisex'],
  },
];

export type Store = {
  catalog: {
    materials: Material[];
    searchText?: string | null;
    filteredMaterials: Material[];
  };
};

export type CatalogState = Store['catalog'];

const initialState: CatalogState = {
  // A sample list of 30 materials while we wait for the API
  materials: MOCK_MATERIALS,
  filteredMaterials: MOCK_MATERIALS,
} as const;

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setSearchText: (state, action: PayloadAction<string | null>) => {
      state.searchText = action.payload;
      state.filteredMaterials = state.materials.filter((material) => {
        return (
          !state.searchText ||
          material.label
            .toLowerCase()
            .includes(state.searchText?.toLowerCase() ?? '') ||
          material.id
            .toLowerCase()
            .includes(state.searchText?.toLowerCase() ?? '') ||
          material.description
            ?.toLowerCase()
            .includes(state.searchText?.toLowerCase() ?? '') ||
          material.tags.some((tag) =>
            tag.toLowerCase().includes(state.searchText?.toLowerCase() ?? '')
          )
        );
      });
    },
  },
});

export const CatalogActions = catalogSlice.actions;
