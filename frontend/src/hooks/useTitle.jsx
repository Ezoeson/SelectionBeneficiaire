import { useMemo, useState } from 'react';

import { useLocation } from 'react-router-dom';

const useTitle = () => {
  const [title, setTitle] = useState('Dashboard');

  const pathname = useLocation().pathname;

  useMemo(() => {
    switch (pathname) {
      case '/':
        setTitle('Dashboard');
         document.title = 'Dashboard';
        break;
      case '/endroit':
        setTitle('Zone');
        document.title = 'zone';
        break;
      case '/endroit/district':
        setTitle('Zone');
        document.title ='zone'
        break;
      case '/endroit/commune':
        setTitle('Zone');
         document.title = 'zone';
        break;
      case '/endroit/fokontany':
        setTitle('Zone');
         document.title = 'zone';
        break;

      case '/enqueteur':
        setTitle('Enqueteur');
         document.title = 'Enqueteur';
        break;
      case '/question':
        setTitle('Questionnaire');
         document.title = 'Questionnaire';
        break;
      case '/question/categorie':
        setTitle('Questionnaire');
         document.title = 'Questionnaire';
        break;
      case '/question/questions':
        setTitle('Questionnaire');
         document.title = 'Questionnaire';
        break;
      case '/beneficiaires':
        setTitle('Beneficiaire');
         document.title = 'Beneficiaire';
        break;
      case '/beneficiaire':
        setTitle('Beneficiaire');
         document.title = 'Beneficiaire';
        break;
      case '/menage':
        setTitle('Menage');
         document.title = 'Menage';
        break;
      case '/parametreCompte':
        setTitle('Parametre du compte');
         document.title = 'Parametre du compte';
        break;
      case '/menage/personne':
        setTitle('menage');
         document.title = 'Personne';
        break;
      default:
        setTitle('Dashboard');
        break;
    }
  }, [pathname]);

  return title;
};

export default useTitle;
