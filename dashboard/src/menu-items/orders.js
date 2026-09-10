// assets
import { IconClipboardList, IconPlus, IconListCheck, IconReceipt } from '@tabler/icons-react';

// constant
const icons = {
  IconClipboardList,
  IconPlus,
  IconListCheck,
  IconReceipt
};

// ==============================|| ORDERS MENU ITEMS ||============================== //

const orders = {
  id: 'orders-group',
  title: 'Order Management',
  type: 'group',
  children: [
    {
      id: 'order',
      title: 'Orders',
      type: 'collapse',
      icon: icons.IconClipboardList,
      children: [
        {
          id: 'order-list',
          title: 'Order List',
          type: 'item',
          url: '/orders/list',
          icon: icons.IconListCheck,
          breadcrumbs: false
        },
        {
          id: 'order-create',
          title: 'Create Order',
          type: 'item',
          url: '/orders/create',
          icon: icons.IconPlus,
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default orders;
