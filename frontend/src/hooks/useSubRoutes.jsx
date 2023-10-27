import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

const useSubRoutes = () => {
  const pathname = useLocation().pathname;

  const subRoutes = useMemo(
    () => [
      {
        label: 'Liste des regions',
        path: '/endroit',
        page: 'endroit',
        active: pathname === '/endroit',
      },

      {
        label: 'Liste des districts',
        path: '/endroit/district',
        page: 'endroit',

        active: pathname === '/endroit/district',
      },
      {
        label: 'Liste des communes',
        path: '/endroit/commune',
        page: 'endroit',

        active: pathname === '/endroit/commune',
      },
      {
        label: 'Liste des fokontany',
        path: '/endroit/fokontany',
        page: 'endroit',

        active: pathname === '/endroit/fokontany',
      },
     
      {
        label: 'Liste des formulaires',
        path: '/question',
        page: 'question',

        active: pathname === '/question',
      },
      {
        label: 'Liste des categories questions',
        path: '/question/categorie',
        page: 'question',

        active: pathname === '/question/categorie',
      },
      {
        label: 'Liste des questions',
        path: '/question/questions',
        page: 'question',

        active: pathname === '/question/questions',
      },
      {
        label: 'Liste des benficiaires',
        path: '/beneficiaire',
        page: 'beneficiaire',

        active: pathname === '/beneficiaire',
      },
      {
        label: 'Liste des personnes',
        path: '/beneficiaire/personne',
        page: 'beneficiaire',

        active: pathname === '/beneficiaire/personne',
      },
    ],
    [pathname]
  );

  return subRoutes;
};

export default useSubRoutes;
