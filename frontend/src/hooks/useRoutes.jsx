import { useMemo } from 'react';
import {
  AiFillAccountBook,
  AiFillAmazonCircle,
  AiFillCompass,
  AiOutlineHome,
  AiOutlineForm,
} from 'react-icons/ai';
import {MdOutlineDashboard} from 'react-icons/md'
import {GrHomeRounded} from 'react-icons/gr'
import {FaUserTie} from 'react-icons/fa'
import { FiUsers } from 'react-icons/fi';
import { ImUsers } from 'react-icons/im';
import {ImHome} from 'react-icons/im'

import { useLocation } from 'react-router-dom';

const useRoutes = () => {
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
        label: 'Endroit',
        icon: ImHome,
        path: '/endroit',
        active: ['/endroit', '/endroit/district', '/endroit/commune','endroit/fokontany'].includes(
          pathname
        ),
      },

      {
        label: 'Enqueteur',
        icon: FaUserTie,
        path: '/enqueteur',
        active: pathname === '/enqueteur',
      },
      {
        label: 'Questionnaires',
        icon: AiOutlineForm,
        path: '/question',
        active: pathname === '/question',
      },
      {
        label: 'Beneficiaire',
        icon: FiUsers,
        path: '/beneficiaires',
        active: pathname === '/beneficiaires',
      },
    ],
    [pathname]
  );

  return routes;
};

export default useRoutes;
