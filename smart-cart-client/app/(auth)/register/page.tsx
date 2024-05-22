import React from "react";
import dynamic from "next/dynamic";

const RegisterPage = dynamic(() => import("@/components/auth/RegisterPage"), {
  ssr: false,
});

const Register = () => {
  return (
    <>
      <RegisterPage />
    </>
  );
};

export default Register;
