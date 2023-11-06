import { useMemo } from 'react';
import {
  AiFillAccountBook,
  AiFillAmazonCircle,
  AiFillCompass,
  AiOutlineHome,
  AiOutlineForm,
} from 'react-icons/ai';
import { MdOutlineDashboard } from 'react-icons/md';
import {TbUsersGroup} from 'react-icons/tb'

import { ImHome } from 'react-icons/im';
import { FiUsers } from 'react-icons/fi';
import { MdAddHomeWork } from 'react-icons/md';

import { useLocation } from 'react-router-dom';

const simpleRoute = () => {
  const pathname = useLocation().pathname;

  const routes = useMemo(
    () => [
      {
        label: 'Dashboard',
        icon: MdOutlineDashboard,
        path: '/',
        active: pathname === '/',
      },
      {
        label: 'Menage',
        icon: ImHome,
        path: '/menage',
        active: ['/menage', '/menage/personne'].includes(pathname),
      },
      {
        label: 'Beneficiaire',
        icon: TbUsersGroup,
        path: '/beneficiaire',
        active: pathname === '/beneficiaire',
      },
    ],
    [pathname]
  );

  return routes;
};

export default simpleRoute;
