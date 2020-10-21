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
    icon: 'people',
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
    icon: 'bookmark',
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
     title: 'Email Authorization',
     icon: 'email',
     link:'/pages/email-auth',
   },
   {
    title: 'Profile',
    icon: 'person-outline',
    link:'/pages/profile',
  },
   {
     title: 'Logout',
     icon: 'power',
     link:'/login',
   },
];
