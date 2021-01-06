export default [

  {
    _tag: 'CSidebarNavTitle',
    _children: ['eCommerce']
  },

  {
    _tag: 'CSidebarNavItem',
    name: 'Orders',
    to: '/orders',
    icon: 'cil-cart',
  },

  {
    _tag: 'CSidebarNavDropdown',
    name: 'Products',
    route: '/products',
    icon: 'cil-devices',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'List Products',
        to: '/products/listproduct',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Add Product',
        to: '/products/addproduct',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Brands',
        to: '/products/brands',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Category',
        to: '/products/categories',
      }
    ]
  },

  {
    _tag: 'CSidebarNavDropdown',
    name: 'Events',
    route: '/events',
    icon: 'cil-heart',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Discount',
        to: '/events/discount',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Promotions',
        to: '/events/promotions',
      }
    ]
  },

  {
    _tag: 'CSidebarNavDropdown',
    name: 'Reports',
    route: '/reports',
    icon: 'cil-bell',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Finance',
        to: '/reports/finance',
      }
    ]
  }
]

