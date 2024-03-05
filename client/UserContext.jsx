import { createContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
// import { set } from "mongoose";
export const UserContext = createContext({});

// eslint-disable-next-line react/prop-types
export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get("/profile");
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        setUser(null);
      }
    };
    // Check if the user is logged in before fetching the profile
    //regex - regular expression
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    if (token) {
      fetchProfile();
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
