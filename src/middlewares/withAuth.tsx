import AuthLayout from "@/layout/AuthLayout";
import { useAppSelector } from "@/models";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const withAuth = (Component: any) => {
  const Auth = (props: any) => {
    const { isLoggedIn } = useAppSelector((state) => ({
      isLoggedIn: state.auth.isLoggedIn,
    }));
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      setLoading(false);
    }, []);

    if (loading) {
      return (
        <div className="h-screen flex justify-center items-center">
          <div className="text-center animate-pulse">
            <h1 className="font-extrabold uppercase font-logo text-4xl text-violet-700">
              PH-Forum
            </h1>
            <p className="text-xs font-thin -mt-2">By Programming Hero</p>
          </div>
        </div>
      );
    }

    if (!isLoggedIn) {
      router.push("/login");
      return null;
    }
    // if (token) {
    //   axiosClient.defaults.headers.common[
    //     "Authorization"
    //   ] = `Bearer ${token?.token}`;
    // }
    // If user is logged in, return original component
    return (
      <AuthLayout>
        <Component {...props} />
      </AuthLayout>
    );
  };

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default withAuth;
