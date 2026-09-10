import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// material-ui
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project imports
import OrderBreadcrumbHeader from './OrderBreadcrumbHeader';
import { getOrderById } from './orderData';

// assets
import { IconPhone, IconMail } from '@tabler/icons-react';

// ==============================|| ORDER DETAILS PAGE ||============================== //

export default function OrderDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [order, setOrder] = useState(null);

  useEffect(() => {
    const targetId = id || '790955';
    const data = getOrderById(targetId);
    setOrder(data);
  }, [id]);

  if (!order) {
    return null;
  }

  const items = [
    {
      id: '098256BH',
      name: 'Apple iPhone 14 Pro',
      sku: '098256BH',
      price: 999,
      total: 3996.00,
      quantity: 4,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: '098336NT',
      name: 'Samsung Galaxy S23 Ultra',
      sku: '098336NT',
      price: 1199,
      total: 2398.00,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=150&auto=format&fit=crop&q=80'
    }
  ];

  const activityData = [
    {
      date: 'Saturday, 10 January',
      events: [
        {
          time: '01:43 PM',
          title: 'Parcel has been delivered',
          subtitle: 'Recipient: Steve Sutton',
          isBlue: true
        },
        {
          time: '09:02 AM',
          title: 'Parcel is out for delivery',
          subtitle: null,
          isBlue: false
        },
        {
          time: '06:45 AM',
          title: 'Parcel has arrived at delivery station',
          subtitle: null,
          isBlue: false
        }
      ]
    },
    {
      date: 'Friday, 09 January',
      events: [
        {
          time: '12:16 PM',
          title: 'Parcel has been picked up by courier',
          subtitle: null,
          isBlue: false
        },
        {
          time: '09:32 AM',
          title: 'Seller is preparing to ship your parcel',
          subtitle: null,
          isBlue: false
        }
      ]
    }
  ];

  return (
    <Box>
      {/* Top Header & Breadcrumbs in White Container Card */}
      <OrderBreadcrumbHeader title="Details" current="Details" />

      {/* Main Single Card */}
      <Card
        sx={{
          borderRadius: 2,
          boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)',
          bgcolor: '#ffffff',
          border: '1px solid',
          borderColor: '#eef2f6',
          overflow: 'hidden'
        }}
      >
        {/* Card Header: Order Number */}
        <Box sx={{ p: { xs: 2.5, sm: 3 } }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: '#1e293b',
              fontSize: { xs: '1.1rem', sm: '1.25rem' }
            }}
          >
            Order: #790955
          </Typography>
        </Box>

        <Divider sx={{ borderColor: '#edf2f7' }} />

        {/* 2-Column Layout */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '65% 35%' }
          }}
        >
          {/* ===================== LEFT COLUMN ===================== */}
          <Box
            sx={{
              p: { xs: 2.5, sm: 3.5 },
              borderRight: { xs: 'none', md: '1px solid #edf2f7' }
            }}
          >
            {/* Products Ordered Header */}
            <Typography
              sx={{
                fontWeight: 700,
                color: '#1e293b',
                fontSize: '1rem',
                mb: 3
              }}
            >
              Products Ordered
            </Typography>

            {/* Products List */}
            <Stack spacing={2.5} sx={{ mb: 3.5 }}>
              {items.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar
                      src={item.image}
                      alt={item.name}
                      variant="rounded"
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: 1.5,
                        border: '1px solid #edf2f7',
                        bgcolor: '#f8fafc'
                      }}
                    />
                    <Box>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 600,
                          color: '#1e293b',
                          fontSize: '0.875rem',
                          mb: 0.25
                        }}
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: '#94a3b8', fontSize: '0.85rem' }}
                      >
                        ${item.price}
                      </Typography>
                    </Box>
                  </Stack>

                  <Box sx={{ textAlign: 'right' }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 600,
                        color: '#1e293b',
                        fontSize: '0.875rem',
                        mb: 0.25
                      }}
                    >
                      ${item.total.toFixed(2)}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: '#94a3b8', fontSize: '0.8rem' }}
                    >
                      Qty: {item.quantity}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Stack>

            {/* Financial Summary Box */}
            <Box
              sx={{
                bgcolor: '#f8fafc',
                borderRadius: 2,
                p: { xs: 2.5, sm: 3 },
                mb: 4
              }}
            >
              <Stack spacing={1.75}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.875rem' }}>
                    Subtotal
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.875rem' }}>
                    $6394.00
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.875rem' }}>
                    Shipping
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.875rem' }}>
                    $20.00
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.875rem' }}>
                    Tax
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.875rem' }}>
                    $105.00
                  </Typography>
                </Stack>

                <Box
                  sx={{
                    pt: 1.5,
                    borderTop: '1px dashed #e2e8f0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 700, color: '#1e293b', fontSize: '1.15rem' }}
                  >
                    Total
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 700, color: '#1e293b', fontSize: '1.15rem' }}
                  >
                    $6519.00
                  </Typography>
                </Box>
              </Stack>
            </Box>

            <Divider sx={{ my: 3.5, borderColor: '#edf2f7' }} />

            {/* Activity Section Header */}
            <Typography
              sx={{
                fontWeight: 700,
                color: '#1e293b',
                fontSize: '1rem',
                mb: 3
              }}
            >
              Activity
            </Typography>

            {/* Activity Timeline List */}
            <Stack spacing={3.5}>
              {activityData.map((group, gIdx) => (
                <Box key={gIdx}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 600,
                      color: '#334155',
                      fontSize: '0.875rem',
                      mb: 2.5
                    }}
                  >
                    {group.date}
                  </Typography>

                  <Box sx={{ pl: 0.5 }}>
                    {group.events.map((ev, eIdx) => {
                      const isLast = eIdx === group.events.length - 1;
                      return (
                        <Box
                          key={eIdx}
                          sx={{
                            display: 'flex',
                            position: 'relative',
                            pb: isLast ? 0 : 3
                          }}
                        >
                          {/* Time Column */}
                          <Typography
                            variant="caption"
                            sx={{
                              width: 72,
                              flexShrink: 0,
                              color: '#94a3b8',
                              fontSize: '0.78rem',
                              pt: '2px'
                            }}
                          >
                            {ev.time}
                          </Typography>

                          {/* Node & Connecting Line */}
                          <Box
                            sx={{
                              position: 'relative',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              mr: 2.5,
                              flexShrink: 0
                            }}
                          >
                            {/* Blue Ring Circle */}
                            <Box
                              sx={{
                                width: 13,
                                height: 13,
                                borderRadius: '50%',
                                border: '2.5px solid #2196f3',
                                bgcolor: '#ffffff',
                                zIndex: 2,
                                mt: '4px'
                              }}
                            />

                            {/* Connecting Line to next event */}
                            {!isLast && (
                              <Box
                                sx={{
                                  position: 'absolute',
                                  top: 17,
                                  bottom: -8,
                                  width: '1.5px',
                                  bgcolor: '#e2e8f0',
                                  zIndex: 1
                                }}
                              />
                            )}
                          </Box>

                          {/* Event Text Content */}
                          <Box sx={{ pt: '1px' }}>
                            <Typography
                              sx={{
                                fontSize: '0.875rem',
                                fontWeight: ev.isBlue ? 500 : 500,
                                color: ev.isBlue ? '#2196f3' : '#334155'
                              }}
                            >
                              {ev.title}
                            </Typography>
                            {ev.subtitle && (
                              <Typography
                                sx={{
                                  fontSize: '0.8rem',
                                  color: '#475569',
                                  mt: 0.25
                                }}
                              >
                                {ev.subtitle}
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      );
                    })}
                  </Box>
                </Box>
              ))}
            </Stack>
          </Box>

          {/* ===================== RIGHT COLUMN ===================== */}
          <Box sx={{ p: { xs: 2.5, sm: 3.5 } }}>
            {/* Customer Details Title */}
            <Typography
              sx={{
                fontWeight: 700,
                color: '#1e293b',
                fontSize: '1.05rem',
                mb: 2.5
              }}
            >
              Customer Details
            </Typography>

            {/* Profile Card */}
            <Box
              sx={{
                bgcolor: '#f8fafc',
                borderRadius: 2,
                p: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                mb: 2.5
              }}
            >
              <Avatar
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                alt="Joseph William"
                sx={{
                  width: 52,
                  height: 52,
                  border: '2px solid #2196f3'
                }}
              />
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    color: '#1e293b',
                    fontSize: '0.9rem',
                    mb: 0.25
                  }}
                >
                  Joseph William
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: '#94a3b8', fontSize: '0.8rem' }}
                >
                  @joseph_william
                </Typography>
              </Box>
            </Box>

            {/* Phone */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                mb: 2
              }}
            >
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: 1.5,
                  bgcolor: '#e3f2fd',
                  color: '#2196f3',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <IconPhone size="1.1rem" stroke={1.75} />
              </Box>
              <Typography
                variant="body2"
                sx={{ color: '#334155', fontSize: '0.875rem' }}
              >
                +1 5623598742
              </Typography>
            </Box>

            {/* Email */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                mb: 3
              }}
            >
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: 1.5,
                  bgcolor: '#ede7f6',
                  color: '#673ab7',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <IconMail size="1.1rem" stroke={1.75} />
              </Box>
              <Typography
                variant="body2"
                sx={{ color: '#334155', fontSize: '0.875rem' }}
              >
                john.doe@example.com
              </Typography>
            </Box>

            <Divider sx={{ my: 3, borderColor: '#edf2f7' }} />

            {/* Shipping Address */}
            <Box sx={{ mb: 3 }}>
              <Typography
                sx={{
                  fontWeight: 600,
                  color: '#1e293b',
                  fontSize: '0.9rem',
                  mb: 1.25
                }}
              >
                Shipping Address
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.6 }}
              >
                123 Main Street<br />
                New York<br />
                100011<br />
                us
              </Typography>
            </Box>

            {/* Billing Address */}
            <Box>
              <Typography
                sx={{
                  fontWeight: 600,
                  color: '#1e293b',
                  fontSize: '0.9rem',
                  mb: 1.25
                }}
              >
                Billing Address
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.6 }}
              >
                123 Main Street<br />
                New York<br />
                100011<br />
                us
              </Typography>
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  );
}
