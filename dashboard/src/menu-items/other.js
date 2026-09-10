// assets
import { IconBrandChrome, IconHelp } from '@tabler/icons-react';

// constant
const icons = { IconBrandChrome, IconHelp };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
  id: 'sample-docs-roadmap',
  type: 'group',
  children: [
    {
      id: 'store-frontend',
      title: 'Customer Store',
      type: 'item',
      url: 'http://localhost:5173',
      icon: icons.IconBrandChrome,
      external: true,
      target: true
    }
  ]
};


export default other;
