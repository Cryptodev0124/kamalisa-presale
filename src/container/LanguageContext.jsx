import React from 'react';

import EN from '../icons/flags/EN.svg'

const LanguageContext = React.createContext();

export const LanguageProvider = ({ children }) => {
  const [selectedLangs, setSelectedLangs] = React.useState('EN');
  const [selectedCountry, setSelectedCountry] = React.useState(EN);

  return (
   <LanguageContext.Provider value={{ selectedLangs, setSelectedLangs, selectedCountry, setSelectedCountry }}>
     {children}
   </LanguageContext.Provider>
  );
};

export default LanguageContext;