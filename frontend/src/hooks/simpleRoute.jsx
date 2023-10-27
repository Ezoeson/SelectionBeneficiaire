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
        label: 'Beneficiare',
        icon: TbUsersGroup,
        path: '/beneficiaire',
        active: ['/beneficiaire', '/beneficiaire/personne'].includes(pathname),
      },
      {
        label: 'Menage',
        icon: ImHome,
        path: '/menage',
        active: pathname === '/menage',
      },
    ],
    [pathname]
  );

  return routes;
};

export default simpleRoute;
