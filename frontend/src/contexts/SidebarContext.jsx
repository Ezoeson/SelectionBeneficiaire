import { createContext, useState } from 'react';

export const SidebarContext = createContext();

const SidebarContextProvider = ({ children }) => {
  const [full, setFull] = useState(true);
  const [dark, setDark] = useState(localStorage.getItem('theme', false));
  const [baseColor, setbasecolor] = useState('#e2e8f0');
  const [highLightColor, setHihghLightColor] = useState('#f5f5f5');
  const toggleSidebar = () => {
    setFull(!full);
  };
  const toggleTheme = () => {
    if (dark) {
      setDark(false);
      setHihghLightColor('#111827');
      setbasecolor('#1f2937');

      localStorage.removeItem('theme');
    } else {
      setDark(true);

      setHihghLightColor('#444');
      setbasecolor('#e2f8f0');

      localStorage.setItem('theme', true);
    }
  };
  if (localStorage.getItem('theme')) {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }

  return (
    <SidebarContext.Provider
      value={{
        full,
        toggleSidebar,
        toggleTheme,
        dark,
        baseColor,
        highLightColor,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarContextProvider;
