import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS_ADMIN: NbMenuItem[] = [
  // {
  //   title: 'E-commerce',
  //   icon: 'shopping-cart-outline',
  //   link: '/pages/dashboard',
  //   home: true,
  // },
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
  },
  {
    title: 'Users',
    icon: 'keypad-outline',
    children:[
      {
        title:'Create Users',
        link:'/pages/create-user',
      },
      {
     title:'Manage Users',
     link:'/pages/manage-user'
    },

    ]

  },
  {
    title: 'Tags',
    icon: 'settings',
    children:[
      {
        title:'Create Tags',
        link:'/pages/tags-create',
      },
      {
        title:'Manage Tags',
        link:'/pages/tags'
      },
    ]
  },
  {
    title: 'Reports ',
    icon: 'pie-chart-outline',
    link:'/pages/reports'
   },
   {
     title: 'Profile',
     icon: 'lock-outline',
     link:'/pages/profile',
   },
   {
     title: 'LogOut',
     icon: 'power',
     link:'/login',
   },
];
