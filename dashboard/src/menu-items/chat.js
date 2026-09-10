// assets
import { IconMessages } from '@tabler/icons-react';

// constant
const icons = {
  IconMessages
};

// ==============================|| CHAT MENU ITEMS ||============================== //

const chat = {
  id: 'chat-group',
  title: 'Application',
  type: 'group',
  children: [
    {
      id: 'chat',
      title: 'Chat',
      type: 'item',
      url: '/chat',
      icon: icons.IconMessages,
      breadcrumbs: false
    }
  ]
};

export default chat;
