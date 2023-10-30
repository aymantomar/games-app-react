import { createContext, useState } from "react";

export let userContext = createContext();

export default function UserContextProvider({ children }) {
  const [usertoken, setusertoken] = useState(null);
  return (
    <userContext.Provider value={{ usertoken, setusertoken }}>
      {children}
    </userContext.Provider>
  );
}
