import React, { createContext, useEffect, useState } from 'react';

export const addprojectresponsecontext = createContext();
export const editprojectresponsecontext = createContext();
export const isauthtokencontext = createContext();
export const AuthContext = createContext();

function Contextshareeee({ children }) {
  const [addprojectresponse, setaddprojectresponse] = useState({});
  const [editprojectresponse, seteditprojectresponse] = useState({});
  const [authtoken, setauthtoken] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!sessionStorage.getItem('token'));

  return (
    <div>
      <addprojectresponsecontext.Provider value={{ addprojectresponse, setaddprojectresponse }}>
        <editprojectresponsecontext.Provider value={{ editprojectresponse, seteditprojectresponse }}>
          <isauthtokencontext.Provider value={{ authtoken, setauthtoken }}>
          <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children} </AuthContext.Provider>
          </isauthtokencontext.Provider>
        </editprojectresponsecontext.Provider>
      </addprojectresponsecontext.Provider>
    </div>
  );
}

export default Contextshareeee;
