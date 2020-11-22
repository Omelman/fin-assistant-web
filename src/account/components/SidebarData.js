import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import {
  Avatar,
  Box,
  Divider,
  Typography,
} from '@material-ui/core';

export const SidebarData = [

  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <IoIcons.IoIosStats />,
    cName: 'nav-text'
  },
  {
    title: 'Balance',
    path: '/balances',
    icon: <IoIcons.IoIosCash />,
    cName: 'nav-text'
  },
  {
    title: 'Transaction',
    path: '/transaction',
    icon: <IoIcons.IoIosSwap />,
    cName: 'nav-text'
  },
  {
    title: 'Work',
    path: '/work',
    icon: <IoIcons.IoIosMan />,
    cName: 'nav-text'
  },
  {
    title: 'Reports',
    path: '/reports',
    icon: <IoIcons.IoIosBook />,
    cName: 'nav-text'
  },
  {
    title: 'Goal',
    path: '/goal',
    icon: <IoIcons.IoIosCheckbox />,
    cName: 'nav-text'
  },
  {
    title: 'Logout',
    path: '/logout',
    icon: <IoIcons.IoIosExit/>,
    cName: 'nav-text'
  }
];

