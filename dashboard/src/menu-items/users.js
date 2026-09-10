// assets
import { IconUsers, IconUserPlus, IconListCheck } from '@tabler/icons-react';

// constant
const icons = {
  IconUsers,
  IconUserPlus,
  IconListCheck
};

// ==============================|| USERS MENU ITEMS ||============================== //

const users = {
  id: 'users-group',
  title: 'User Management',
  type: 'group',
  children: [
    {
      id: 'users',
      title: 'Users',
      type: 'collapse',
      icon: icons.IconUsers,
      children: [
        {
          id: 'customer-list',
          title: 'User List',
          type: 'item',
          url: '/customer/list',
          icon: icons.IconListCheck,
          breadcrumbs: false
        },
        {
          id: 'customer-add',
          title: 'Add User',
          type: 'item',
          url: '/customer/add',
          icon: icons.IconUserPlus,
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default users;
