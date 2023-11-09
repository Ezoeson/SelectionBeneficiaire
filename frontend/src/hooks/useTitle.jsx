import { useMemo, useState } from 'react';

import { useLocation } from 'react-router-dom';

const useTitle = () => {
  const [title, setTitle] = useState('Dashboard');

  const pathname = useLocation().pathname;

  useMemo(() => {
    switch (pathname) {
      case '/':
        setTitle('Dashboard');
        break;
      case '/endroit':
        setTitle('Zone');
        break;
      case '/endroit/district':
        setTitle('Zone');
        break;
      case '/endroit/commune':
        setTitle('Zone');
        break;
      case '/endroit/fokontany':
        setTitle('Zone');
        break;

      case '/enqueteur':
        setTitle('Enqueteur');
        break;
      case '/question':
        setTitle('Questionnaire');
        break;
      case '/question/categorie':
        setTitle('Questionnaire');
        break;
      case '/question/questions':
        setTitle('Questionnaire');
        break;
      case '/beneficiaires':
        setTitle('Beneficiaire');
        break;
      case '/menage':
        setTitle('Menage');
        break;
      case '/parametreCompte':
        setTitle('Parametre du compte');
        break;
      case '/menage':
        setTitle('Menage');
        break;
      case '/menage/personne':
        setTitle('menage');
        break;
      default:
        setTitle('Dashboard');
        break;
    }
  }, [pathname]);

  return title;
};

export default useTitle;
