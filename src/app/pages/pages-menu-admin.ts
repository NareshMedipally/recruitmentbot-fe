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
