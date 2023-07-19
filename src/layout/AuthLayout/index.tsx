import Header from "@/components/navbar";
import React from "react";

const AuthLayout = ({ children }: any) => {
  return (
    <>
      <Header />
      <main className="w-[80%] mx-auto">{children}</main>
    </>
  );
};

export default AuthLayout;
