﻿export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './User/login',
          },
        ],
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './TableList',
  },


  {
    name: 'bitCoinType',
    icon: 'bitCoinType',
    path: '/bitCoinType',
    component: './bitCoinType',
  },
  {
    name: 'companyBank',
    icon: 'companyBank',
    path: '/companyBank',
    component: './companyBank',
  },

  {
    name: '会员管理',
    icon:'user',
    path: '/member',
    component: './member',
  },

  {
    name: 'memberRank',
    icon: 'memberRank',
    path: '/memberRank',
    component: './memberRank',
  },

  {
    name: 'mineMachine',
    icon: 'mineMachine',
    path: '/mineMachine',
    component: './mineMachine',
  },

  {
    name: 'mineMachineOrder',
    icon: 'mineMachineOrder',
    path: '/mineMachineOrder',
    component: './mineMachineOrder',
  },


  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];
