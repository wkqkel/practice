"use client";
import { auth } from "@/firebase/firebase";
import { authInfoState } from "@/states/auth";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

interface AuthProps {
  children: React.ReactNode;
}

const Auth = ({ children }: AuthProps) => {
  const [authInfo, setAuthInfo] = useRecoilState(authInfoState);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setAuthInfo((prev) => ({ ...prev, email: user?.email || "" }));
    });
  }, []);

  return <>{children}</>;
};

export default Auth;
