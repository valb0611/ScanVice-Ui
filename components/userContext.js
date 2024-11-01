import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [usuarioRegistrado, setUsuarioRegistrado] = useState(null);

  return (
    <UserContext.Provider value={{ usuarioRegistrado, setUsuarioRegistrado }}>
      {children}
    </UserContext.Provider>
  );
};
