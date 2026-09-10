import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// chat routing
const Chat = Loadable(lazy(() => import('views/apps/chat')));

// customer / users routing
const CustomerList = Loadable(lazy(() => import('views/apps/customer/CustomerList')));
const CustomerAdd = Loadable(lazy(() => import('views/apps/customer/CustomerAdd')));
const CustomerEdit = Loadable(lazy(() => import('views/apps/customer/CustomerEdit')));
const CustomerDetails = Loadable(lazy(() => import('views/apps/customer/CustomerDetails')));

// e-commerce / products routing
const ProductList = Loadable(lazy(() => import('views/apps/e-commerce/ProductList')));
const ProductAdd = Loadable(lazy(() => import('views/apps/e-commerce/ProductAdd')));
const ProductEdit = Loadable(lazy(() => import('views/apps/e-commerce/ProductEdit')));
const ProductDetails = Loadable(lazy(() => import('views/apps/e-commerce/ProductDetails')));

// orders routing
const OrderList = Loadable(lazy(() => import('views/apps/order/OrderList')));
const OrderCreate = Loadable(lazy(() => import('views/apps/order/OrderCreate')));
const OrderEdit = Loadable(lazy(() => import('views/apps/order/OrderEdit')));
const OrderDetails = Loadable(lazy(() => import('views/apps/order/OrderDetails')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: (
    <AuthGuard>
      <MainLayout />
    </AuthGuard>
  ),
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'typography',
      element: <UtilsTypography />
    },
    {
      path: 'color',
      element: <UtilsColor />
    },
    {
      path: 'shadow',
      element: <UtilsShadow />
    },
    {
      path: '/sample-page',
      element: <SamplePage />
    },
    {
      path: 'chat',
      element: <Chat />
    },
    {
      path: 'customer',
      children: [
        {
          path: 'list',
          element: <CustomerList />
        },
        {
          path: 'add',
          element: <CustomerAdd />
        },
        {
          path: 'edit/:id',
          element: <CustomerEdit />
        },
        {
          path: 'details/:id',
          element: <CustomerDetails />
        }
      ]
    },
    {
      path: 'users',
      children: [
        {
          path: 'list',
          element: <CustomerList />
        },
        {
          path: 'add',
          element: <CustomerAdd />
        },
        {
          path: 'edit/:id',
          element: <CustomerEdit />
        },
        {
          path: 'details/:id',
          element: <CustomerDetails />
        }
      ]
    },
    {
      path: 'products',
      children: [
        {
          path: 'list',
          element: <ProductList />
        },
        {
          path: 'product-list',
          element: <ProductList />
        },
        {
          path: 'add',
          element: <ProductAdd />
        },
        {
          path: 'add-product',
          element: <ProductAdd />
        },
        {
          path: 'product-add',
          element: <ProductAdd />
        },
        {
          path: 'edit/:id',
          element: <ProductEdit />
        },
        {
          path: 'edit-product/:id',
          element: <ProductEdit />
        },
        {
          path: 'product-edit/:id',
          element: <ProductEdit />
        },
        {
          path: 'details/:id',
          element: <ProductDetails />
        },
        {
          path: 'product-details/:id',
          element: <ProductDetails />
        }
      ]
    },
    {
      path: 'e-commerce',
      children: [
        {
          path: 'product-list',
          element: <ProductList />
        },
        {
          path: 'products',
          element: <ProductList />
        },
        {
          path: 'add',
          element: <ProductAdd />
        },
        {
          path: 'add-product',
          element: <ProductAdd />
        },
        {
          path: 'product-add',
          element: <ProductAdd />
        },
        {
          path: 'edit/:id',
          element: <ProductEdit />
        },
        {
          path: 'edit-product/:id',
          element: <ProductEdit />
        },
        {
          path: 'product-edit/:id',
          element: <ProductEdit />
        },
        {
          path: 'details/:id',
          element: <ProductDetails />
        },
        {
          path: 'product-details/:id',
          element: <ProductDetails />
        }
      ]
    },
    {
      path: 'orders',
      children: [
        {
          path: 'list',
          element: <OrderList />
        },
        {
          path: 'create',
          element: <OrderCreate />
        },
        {
          path: 'edit/:id',
          element: <OrderEdit />
        },
        {
          path: 'details/:id',
          element: <OrderDetails />
        }
      ]
    },
    {
      path: 'order',
      children: [
        {
          path: 'list',
          element: <OrderList />
        },
        {
          path: 'create',
          element: <OrderCreate />
        },
        {
          path: 'edit/:id',
          element: <OrderEdit />
        },
        {
          path: 'details/:id',
          element: <OrderDetails />
        }
      ]
    },
    {
      path: 'apps',
      children: [
        {
          path: 'chat',
          element: <Chat />
        },
        {
          path: 'e-commerce',
          children: [
            {
              path: 'product-list',
              element: <ProductList />
            },
            {
              path: 'products',
              element: <ProductList />
            },
            {
              path: 'add-product',
              element: <ProductAdd />
            },
            {
              path: 'product-add',
              element: <ProductAdd />
            },
            {
              path: 'edit-product/:id',
              element: <ProductEdit />
            },
            {
              path: 'product-edit/:id',
              element: <ProductEdit />
            },
            {
              path: 'product-details/:id',
              element: <ProductDetails />
            }
          ]
        },
        {
          path: 'products',
          children: [
            {
              path: 'list',
              element: <ProductList />
            },
            {
              path: 'add',
              element: <ProductAdd />
            },
            {
              path: 'edit/:id',
              element: <ProductEdit />
            },
            {
              path: 'details/:id',
              element: <ProductDetails />
            }
          ]
        },
        {
          path: 'customer',
          children: [
            {
              path: 'list',
              element: <CustomerList />
            },
            {
              path: 'add',
              element: <CustomerAdd />
            },
            {
              path: 'edit/:id',
              element: <CustomerEdit />
            },
            {
              path: 'details/:id',
              element: <CustomerDetails />
            }
          ]
        },
        {
          path: 'users',
          children: [
            {
              path: 'list',
              element: <CustomerList />
            },
            {
              path: 'add',
              element: <CustomerAdd />
            },
            {
              path: 'edit/:id',
              element: <CustomerEdit />
            },
            {
              path: 'details/:id',
              element: <CustomerDetails />
            }
          ]
        },
        {
          path: 'order',
          children: [
            {
              path: 'list',
              element: <OrderList />
            },
            {
              path: 'create',
              element: <OrderCreate />
            },
            {
              path: 'edit/:id',
              element: <OrderEdit />
            },
            {
              path: 'details/:id',
              element: <OrderDetails />
            }
          ]
        },
        {
          path: 'orders',
          children: [
            {
              path: 'list',
              element: <OrderList />
            },
            {
              path: 'create',
              element: <OrderCreate />
            },
            {
              path: 'edit/:id',
              element: <OrderEdit />
            },
            {
              path: 'details/:id',
              element: <OrderDetails />
            }
          ]
        }
      ]
    }
  ]
};

export default MainRoutes;
