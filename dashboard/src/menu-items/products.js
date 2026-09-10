// assets
import { IconBasket, IconPlus, IconListCheck, IconBuildingStore } from '@tabler/icons-react';

// constant
const icons = {
  IconBasket,
  IconPlus,
  IconListCheck,
  IconBuildingStore
};

// ==============================|| PRODUCTS / E-COMMERCE MENU ITEMS ||============================== //

const products = {
  id: 'e-commerce-group',
  title: 'E-Commerce',
  type: 'group',
  children: [
    {
      id: 'e-commerce',
      title: 'Products',
      type: 'collapse',
      icon: icons.IconBuildingStore,
      children: [
        {
          id: 'product-list',
          title: 'Product List',
          type: 'item',
          url: '/products/list',
          icon: icons.IconListCheck,
          breadcrumbs: false
        },
        {
          id: 'product-add',
          title: 'Add Product',
          type: 'item',
          url: '/products/add',
          icon: icons.IconPlus,
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default products;
