import { API_BASE_URL, apiRequest } from '../../../api/client';

// ==============================|| CHAT DATA & API SYNC ||============================== //

export const mockContacts = [
  {
    id: '1',
    name: 'Alene',
    role: 'Technical Department',
    time: '11:30 AM',
    unread: 2,
    status: 'online',
    lastSeen: 'online',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    messages: [
      { id: 'm1', sender: 'Alene', text: 'Hey, did you check the new API logs?', time: '11:28 AM', isMine: false },
      { id: 'm2', sender: 'me', text: 'Checking them right now!', time: '11:30 AM', isMine: true }
    ]
  },
  {
    id: '2',
    name: 'Keefe',
    role: 'Support Executive',
    time: '10:16 AM',
    unread: 3,
    status: 'online',
    lastSeen: '10:16 AM',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    messages: [
      { id: 'm1', sender: 'me', text: 'Thinking of the new Italian place near the office.', time: '12:07 PM', isMine: true },
      { id: 'm2', sender: 'Keefe', text: "Sounds great! I'll let the others know. See you there! 🤩", time: '12:08 PM', isMine: false },
      { id: 'm3', sender: 'Keefe', text: 'Lunch was great! We should do this more often.', time: '1:30 PM', isMine: false },
      { id: 'm4', sender: 'me', text: "Agreed! Next time, let’s try sushi.", time: '1:31 PM', isMine: true }
    ]
  },
  {
    id: '3',
    name: 'Lazaro',
    role: 'Resource Investigator',
    time: '9:00 AM',
    unread: 1,
    status: 'online',
    lastSeen: '09:00 AM',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    messages: [
      { id: 'm1', sender: 'Lazaro', text: 'Quarterly review resources have been shared in the drive.', time: '9:00 AM', isMine: false }
    ]
  },
  {
    id: '4',
    name: 'Hazle',
    role: 'Teamworker',
    time: '08:36 AM',
    unread: 0,
    status: 'away',
    lastSeen: '08:36 AM',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    messages: [
      { id: 'm1', sender: 'Hazle', text: 'Good morning! Starting on the sprint items today.', time: '08:36 AM', isMine: false }
    ]
  },
  {
    id: '5',
    name: 'Backend Squad',
    role: 'API & Database',
    time: 'Yesterday',
    unread: 1,
    status: 'group',
    isGroup: true,
    lastSeen: 'Yesterday',
    avatar: '',
    messages: [
      { id: 'm1', sender: 'Backend Squad', text: 'Database migration completed smoothly.', time: 'Yesterday', isMine: false }
    ]
  },
  {
    id: '6',
    name: 'Herman Essertg',
    role: 'Co-ordinator',
    time: 'Yesterday',
    unread: 0,
    status: 'away',
    lastSeen: 'Yesterday',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    messages: [
      { id: 'm1', sender: 'Herman Essertg', text: 'Meeting is scheduled for 3 PM tomorrow.', time: 'Yesterday', isMine: false }
    ]
  },
  {
    id: '7',
    name: 'Wilhelmine Durrg',
    role: 'UI Designer',
    time: 'Yesterday',
    unread: 0,
    status: 'online',
    lastSeen: 'Yesterday',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    messages: [
      { id: 'm1', sender: 'Wilhelmine Durrg', text: 'New SHOP.CO collection mockups are ready for review!', time: 'Yesterday', isMine: false }
    ]
  }
];

const CHAT_STORAGE_KEY = 'berry_exact_chat_data';

export const getChatData = () => {
  try {
    const data = localStorage.getItem(CHAT_STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Error reading chat data', e);
  }
  return mockContacts;
};

export const saveChatData = (data) => {
  try {
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving chat data', e);
  }
};

export const fetchChatContactsFromBackend = async () => {
  try {
    const contacts = await apiRequest('/chat/contacts');
    if (Array.isArray(contacts) && contacts.length > 0) {
      const formatted = await Promise.all(
        contacts.map(async (c) => {
          let messages = [];
          try {
            const rawMsgs = await apiRequest(`/chat/messages/${c.id}`);
            if (Array.isArray(rawMsgs)) {
              messages = rawMsgs.map((m) => ({
                id: m.id,
                sender: m.sender,
                text: m.text,
                time: m.time,
                isMine: m.is_mine
              }));
            }
          } catch (e) {
            // ignore
          }
          return {
            id: String(c.id),
            name: c.name,
            role: c.role || '',
            time: c.time || '10:00 AM',
            unread: Number(c.unread || 0),
            status: c.status || 'online',
            lastSeen: c.last_seen || 'online',
            avatar: c.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
            isGroup: Boolean(c.is_group),
            messages: messages.length > 0 ? messages : (mockContacts.find((m) => m.id === String(c.id))?.messages || [])
          };
        })
      );
      saveChatData(formatted);
      return formatted;
    }
  } catch (e) {
    // fallback
  }
  return getChatData();
};

export const sendChatMessage = async (contactId, messageData) => {
  const contacts = getChatData();
  const updatedContacts = contacts.map((c) => {
    if (c.id === contactId) {
      return {
        ...c,
        messages: [...(c.messages || []), messageData],
        time: messageData.time
      };
    }
    return c;
  });

  saveChatData(updatedContacts);

  // Sync to Backend
  try {
    await apiRequest('/chat/send', {
      method: 'POST',
      body: JSON.stringify({
        contactId,
        text: messageData.text,
        sender: messageData.sender || 'me',
        is_mine: messageData.isMine !== undefined ? messageData.isMine : true
      })
    });
  } catch (e) {
    console.warn('Backend chat sync failed, saved locally.');
  }

  return messageData;
};
