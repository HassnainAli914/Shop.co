import { useState, useRef, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project imports
import ChatBreadcrumbHeader from './ChatBreadcrumbHeader';
import { getChatData, saveChatData } from './chatData';

// assets
import {
  IconSearch,
  IconChevronDown,
  IconMenu2,
  IconPhone,
  IconVideo,
  IconAlertCircle,
  IconDots,
  IconPaperclip,
  IconMoodSmile,
  IconSend,
  IconUser
} from '@tabler/icons-react';

// Sleek Custom Scrollbar Styles
const sleekScrollbarSx = {
  overflowY: 'auto',
  scrollbarWidth: 'thin',
  scrollbarColor: '#cbd5e1 transparent',
  '&::-webkit-scrollbar': {
    width: '6px',
    height: '6px'
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent'
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#cbd5e1',
    borderRadius: '10px',
    transition: 'background-color 0.2s ease'
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: '#94a3b8'
  }
};

// ==============================|| CHAT MAIN PAGE ||============================== //

export default function Chat() {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

  const [contacts, setContacts] = useState(getChatData());
  const [selectedContactId, setSelectedContactId] = useState('2'); // Default Keefe
  const [searchQuery, setSearchQuery] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const chatScrollRef = useRef(null);

  const selectedContact = contacts.find((c) => c.id === selectedContactId) || contacts[0];

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [selectedContact, selectedContact?.messages]);

  const handleToggleSidebar = () => {
    if (matchDownMd) {
      setMobileDrawerOpen((prev) => !prev);
    } else {
      setDesktopSidebarOpen((prev) => !prev);
    }
  };

  const handleSendMessage = (e) => {
    if (e) e.preventDefault();
    if (!messageInput.trim()) return;

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMessage = {
      id: `m_${Date.now()}`,
      sender: 'me',
      text: messageInput.trim(),
      time: currentTime,
      isMine: true
    };

    const updatedContacts = contacts.map((c) => {
      if (c.id === selectedContactId) {
        return {
          ...c,
          messages: [...(c.messages || []), newMessage],
          time: currentTime
        };
      }
      return c;
    });

    setContacts(updatedContacts);
    saveChatData(updatedContacts);
    setMessageInput('');
  };

  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Status Badge Component
  const renderAvatar = (contact) => {
    const badgeColor = contact.status === 'online' ? '#10b981' : contact.status === 'away' ? '#f59e0b' : '#3b82f6';

    if (contact.isGroup) {
      return (
        <Avatar sx={{ width: 44, height: 44, bgcolor: '#2196f3', color: '#ffffff' }}>
          <IconUser size="1.3rem" />
        </Avatar>
      );
    }

    return (
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
        sx={{
          '& .MuiBadge-badge': {
            backgroundColor: badgeColor,
            color: badgeColor,
            boxShadow: `0 0 0 2px #ffffff`,
            width: 10,
            height: 10,
            borderRadius: '50%'
          }
        }}
      >
        <Avatar
          src={contact.avatar}
          alt={contact.name}
          sx={{ width: 44, height: 44 }}
        />
      </Badge>
    );
  };

  // Contacts List Sidebar Content
  const sidebarContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Top User Profile */}
      <Box
        sx={{
          p: 2.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer'
        }}
      >
        <Stack direction="row" spacing={1.75} alignItems="center">
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
            sx={{
              '& .MuiBadge-badge': {
                backgroundColor: '#10b981',
                boxShadow: `0 0 0 2px #ffffff`,
                width: 10,
                height: 10,
                borderRadius: '50%'
              }
            }}
          >
            <Avatar
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
              alt="JWT User"
              sx={{ width: 42, height: 42 }}
            />
          </Badge>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1e293b' }}>
            JWT User
          </Typography>
        </Stack>

        <IconChevronDown size="1.1rem" color="#94a3b8" />
      </Box>

      {/* Search Bar */}
      <Box sx={{ px: 2.5, pb: 2 }}>
        <OutlinedInput
          fullWidth
          size="small"
          placeholder="Search User"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          startAdornment={
            <InputAdornment position="start">
              <IconSearch size="1.1rem" color="#94a3b8" />
            </InputAdornment>
          }
          sx={{
            borderRadius: 2,
            bgcolor: '#ffffff',
            '& fieldset': { borderColor: '#edf2f7' },
            '&:hover fieldset': { borderColor: '#cbd5e1' }
          }}
        />
      </Box>

      {/* Contact List with sleek scrollbar */}
      <Box
        sx={{
          flex: 1,
          px: 1.5,
          ...sleekScrollbarSx
        }}
      >
        <Stack spacing={0.75}>
          {filteredContacts.map((contact) => {
            const isSelected = contact.id === selectedContactId;
            return (
              <Box
                key={contact.id}
                onClick={() => {
                  setSelectedContactId(contact.id);
                  if (matchDownMd) setMobileDrawerOpen(false);
                }}
                sx={{
                  p: 1.5,
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  bgcolor: isSelected ? '#ede7f6' : 'transparent',
                  transition: 'background-color 0.15s ease',
                  '&:hover': {
                    bgcolor: isSelected ? '#ede7f6' : '#f8fafc'
                  }
                }}
              >
                <Stack direction="row" spacing={1.5} alignItems="center" sx={{ minWidth: 0 }}>
                  {renderAvatar(contact)}
                  <Box sx={{ minWidth: 0 }}>
                    <Typography
                      variant="subtitle2"
                      noWrap
                      sx={{
                        fontWeight: isSelected ? 700 : 600,
                        color: '#1e293b',
                        fontSize: '0.875rem'
                      }}
                    >
                      {contact.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      noWrap
                      sx={{
                        color: '#64748b',
                        fontSize: '0.78rem',
                        display: 'block'
                      }}
                    >
                      {contact.role}
                    </Typography>
                  </Box>
                </Stack>

                <Box sx={{ textAlign: 'right', flexShrink: 0, ml: 1 }}>
                  <Typography
                    variant="caption"
                    sx={{ color: '#94a3b8', fontSize: '0.75rem', display: 'block', mb: 0.5 }}
                  >
                    {contact.time}
                  </Typography>
                  {contact.unread > 0 && (
                    <Box
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 20,
                        height: 20,
                        bgcolor: '#673ab7',
                        color: '#ffffff',
                        borderRadius: '50%',
                        fontSize: '0.72rem',
                        fontWeight: 600
                      }}
                    >
                      {contact.unread}
                    </Box>
                  )}
                </Box>
              </Box>
            );
          })}
        </Stack>
      </Box>
    </Box>
  );

  return (
    <Box>
      {/* Top Header & Breadcrumbs in White Container Card */}
      <ChatBreadcrumbHeader title="Chat" current="Chat" />

      {/* Main Container Layout */}
      <Box
        sx={{
          display: 'flex',
          gap: desktopSidebarOpen && !matchDownMd ? 3 : 0,
          height: 'calc(100vh - 210px)',
          minHeight: '620px',
          transition: 'all 0.3s ease-in-out'
        }}
      >
        {/* ===================== LEFT SIDEBAR CARD (DESKTOP) ===================== */}
        {desktopSidebarOpen && (
          <Card
            sx={{
              width: { xs: 0, md: 320, lg: 340 },
              display: { xs: 'none', md: 'block' },
              flexShrink: 0,
              borderRadius: 2,
              boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)',
              bgcolor: '#ffffff',
              border: '1px solid',
              borderColor: '#edf2f7',
              height: '100%',
              overflow: 'hidden',
              animation: 'fadeIn 0.2s ease-in-out',
              '@keyframes fadeIn': {
                '0%': { opacity: 0, transform: 'translateX(-10px)' },
                '100%': { opacity: 1, transform: 'translateX(0)' }
              }
            }}
          >
            {sidebarContent}
          </Card>
        )}

        {/* ===================== MOBILE DRAWER ===================== */}
        <Drawer
          anchor="left"
          open={mobileDrawerOpen}
          onClose={() => setMobileDrawerOpen(false)}
          PaperProps={{
            sx: {
              width: 300,
              boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)'
            }
          }}
        >
          {sidebarContent}
        </Drawer>

        {/* ===================== RIGHT MAIN CHAT AREA CARD ===================== */}
        <Card
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 2,
            boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)',
            bgcolor: '#ffffff',
            border: '1px solid',
            borderColor: '#edf2f7',
            height: '100%',
            overflow: 'hidden',
            transition: 'flex 0.3s ease'
          }}
        >
          {/* Header */}
          <Box
            sx={{
              p: 2,
              px: { xs: 2, sm: 3 },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid #edf2f7'
            }}
          >
            <Stack direction="row" spacing={1.5} alignItems="center">
              {/* Menu Toggle Button: Available on all screen sizes to toggle contact list */}
              <IconButton
                onClick={handleToggleSidebar}
                size="small"
                sx={{
                  color: '#64748b',
                  mr: 0.5,
                  borderRadius: 1.5,
                  '&:hover': { bgcolor: '#f1f5f9', color: '#2196f3' }
                }}
              >
                <IconMenu2 size="1.25rem" />
              </IconButton>

              {/* Contact Avatar & Name */}
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
                sx={{
                  '& .MuiBadge-badge': {
                    backgroundColor: selectedContact.status === 'online' ? '#10b981' : '#f59e0b',
                    boxShadow: `0 0 0 2px #ffffff`,
                    width: 9,
                    height: 9,
                    borderRadius: '50%'
                  }
                }}
              >
                <Avatar
                  src={selectedContact.avatar}
                  alt={selectedContact.name}
                  sx={{ width: 44, height: 44 }}
                />
              </Badge>

              <Box>
                <Stack direction="row" spacing={0.75} alignItems="center">
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1e293b' }}>
                    {selectedContact.name}
                  </Typography>
                  <Box
                    sx={{
                      width: 7,
                      height: 7,
                      bgcolor: selectedContact.status === 'online' ? '#10b981' : '#f59e0b',
                      borderRadius: '50%'
                    }}
                  />
                </Stack>
                <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.78rem' }}>
                  Last seen {selectedContact.lastSeen || '10:16 AM'}
                </Typography>
              </Box>
            </Stack>

            {/* Top Right Action Icons */}
            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton size="small" sx={{ color: '#64748b', '&:hover': { color: '#2196f3' } }}>
                <IconPhone size="1.2rem" stroke={1.75} />
              </IconButton>
              <IconButton size="small" sx={{ color: '#64748b', '&:hover': { color: '#2196f3' } }}>
                <IconVideo size="1.2rem" stroke={1.75} />
              </IconButton>
              <IconButton size="small" sx={{ color: '#64748b', '&:hover': { color: '#2196f3' } }}>
                <IconAlertCircle size="1.2rem" stroke={1.75} />
              </IconButton>
              <IconButton size="small" sx={{ color: '#64748b', '&:hover': { color: '#2196f3' } }}>
                <IconDots size="1.2rem" stroke={1.75} />
              </IconButton>
            </Stack>
          </Box>

          {/* Conversation History Body with sleek custom scrollbar */}
          <Box
            ref={chatScrollRef}
            sx={{
              flex: 1,
              p: { xs: 2, sm: 3 },
              display: 'flex',
              flexDirection: 'column',
              gap: 2.5,
              ...sleekScrollbarSx
            }}
          >
            {/* Top Empty Placeholder Bar matching Image */}
            <Box
              sx={{
                width: '180px',
                height: '14px',
                borderRadius: 1,
                bgcolor: '#f1f5f9',
                mb: 1
              }}
            />

            {selectedContact.messages?.map((msg) => {
              const isMine = msg.isMine;

              return (
                <Box
                  key={msg.id}
                  sx={{
                    display: 'flex',
                    justifyContent: isMine ? 'flex-end' : 'flex-start',
                    width: '100%'
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: { xs: '85%', sm: '70%', md: '60%' },
                      bgcolor: isMine ? '#e0f2fe' : '#ede7f6',
                      borderRadius: 2,
                      p: 2,
                      px: 2.5,
                      boxShadow: 'none'
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#1e293b',
                        fontSize: '0.9rem',
                        lineHeight: 1.5,
                        wordBreak: 'break-word'
                      }}
                    >
                      {msg.text}
                    </Typography>

                    <Typography
                      variant="caption"
                      sx={{
                        color: '#94a3b8',
                        fontSize: '0.75rem',
                        display: 'block',
                        textAlign: 'right',
                        mt: 0.75
                      }}
                    >
                      {msg.time}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Box>

          <Divider sx={{ borderColor: '#edf2f7' }} />

          {/* Bottom Chat Input */}
          <Box
            component="form"
            onSubmit={handleSendMessage}
            sx={{
              p: 2,
              px: { xs: 2, sm: 3 },
              display: 'flex',
              alignItems: 'center',
              gap: 1.5
            }}
          >
            <IconButton size="small" sx={{ color: '#64748b' }}>
              <IconPaperclip size="1.25rem" stroke={1.75} />
            </IconButton>

            <IconButton size="small" sx={{ color: '#64748b' }}>
              <IconMoodSmile size="1.25rem" stroke={1.75} />
            </IconButton>

            <OutlinedInput
              fullWidth
              size="small"
              placeholder="Type a Message"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    type="submit"
                    size="small"
                    sx={{
                      color: messageInput.trim() ? '#2196f3' : '#94a3b8',
                      transition: 'color 0.2s ease'
                    }}
                  >
                    <IconSend size="1.2rem" stroke={1.75} />
                  </IconButton>
                </InputAdornment>
              }
              sx={{
                borderRadius: 2,
                bgcolor: '#ffffff',
                '& fieldset': { borderColor: '#edf2f7' },
                '&:hover fieldset': { borderColor: '#cbd5e1' }
              }}
            />
          </Box>
        </Card>
      </Box>
    </Box>
  );
}
