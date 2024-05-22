"use client";
import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "@/config/auth";
import { createUser, getUser } from "@/utils/auth/api";
import useSWR from "swr";
import { setCookie, deleteCookie } from "cookies-next";
import { userStore } from "@/zustand/store";
import Image from "next/image";


const AuthContext = createContext<any>({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authUser, setAuthUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { setUser } = userStore();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const result = await user.getIdToken();

        setAuthUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          authtoken: result,
        });

        setCookie("isAuthenticated", "true");
        setCookie("userEmail", user.email);
        setCookie("token", result);
      } else {
        setAuthUser(null);
        sessionStorage.removeItem("user-store");
        deleteCookie("isAuthenticated");
        deleteCookie("userEmail");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const email = authUser?.email;
  const authToken = authUser?.authtoken;

  const { data, error } = useSWR(
    email && authToken ? `/api/user/${email}` : null,
    () => getUser(email, authToken),
    { refreshInterval: 300000 }
  );

  // Save user data to session storage every time new data is fetched
  useEffect(() => {
    if (data) {
      setUser(data);
      //sessionStorage.setItem('User', JSON.stringify(data));
    }
  }, [data, setUser]);

  if (loading) {
    // Handle loading state
    return (
        <div className="flex justify-center items-center auth-loading">
          {/* <span className="loading loading-dots loading-lg"></span> */}
          <Image src={"/pacman.svg"} alt={"loading animation"} height={80} width={80}/>
        </div>
    );
  }

  const signup = async (name: string, email: string, password: string) => {
    const user: any = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const authToken = user.user.accessToken;
    const create = await createUser(name, authToken);
    return create;
  };

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    setAuthUser(null);
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ authUser, login, signup, logout }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
