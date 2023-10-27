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
        setTitle('Endroit');
        break;
      case '/endroit/district':
        setTitle('Endroit');
        break;
      case '/endroit/commune':
        setTitle('Endroit');
        break;
      case '/endroit/fokontany':
        setTitle('Endroit');
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
      case '/beneficiaire':
        setTitle('Beneficiare');
        break;
      case '/beneficiaire/personne':
        setTitle('Beneficiaire');
        break;
      default:
        setTitle('Dashboard');
        break;
    }
  }, [pathname]);

  return title;
};

export default useTitle;
