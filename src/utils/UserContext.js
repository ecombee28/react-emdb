import React, { useState, useContext } from "react";
import Cookie from "js-cookie";

const UserContext = React.createContext();
const UserUpdateContext = React.createContext();

export function useName() {
  return useContext(UserContext);
}

export function useNameUpdate() {
  return useContext(UserUpdateContext);
}
export function UserProvider({ children }) {
  const [value, setValue] = useState("");

  function setUserName() {
    setValue(Cookie.get("username"));
  }

  return (
    <UserContext.Provider value={value}>
      <UserUpdateContext.Provider value={setUserName}>
        {children}
      </UserUpdateContext.Provider>
    </UserContext.Provider>
  );
}
