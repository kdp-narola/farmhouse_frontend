import { ACCESS_TOKEN } from "@/constant/constant";
import { profileMe } from "@/services/api-routes/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfileContext = createContext({});

const ProfileProvider = ({ children }) => {
  const onNavigate = useNavigate();
  const [authUser, setAuthuser] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false)
  const accessToken = localStorage.getItem(ACCESS_TOKEN)

  const getUserData = async () => {
    setProfileLoading(true)
    try {
      const res = await profileMe();
      setAuthuser(res.data.data);
    } catch (error) {
      if (error.status === 401) {
        localStorage.clear();
        onNavigate("/auth/login");
      }
      console.log('error', error)
    } finally {
      setProfileLoading(false)
    }
  };
  useEffect(() => { if (accessToken) getUserData() }, []);
  
  const logOut = () => {
    onNavigate("/auth/login")
  };


  return (
    <ProfileContext.Provider
      value={{authUser, profileLoading, getUserData, logOut, }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

const useAuth = () => {
  return useContext(ProfileContext);
};

export { ProfileProvider, ProfileContext, useAuth };