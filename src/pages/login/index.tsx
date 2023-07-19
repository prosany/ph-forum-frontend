import { useStartSignInMutation } from "@/global/auth/authQuery";
import { authAction } from "@/global/auth/authSlice";
import { useAppDispatch } from "@/models";
import { loginSchema } from "@/schemas/userSchema";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const [startLogin, { data, error, isLoading }] = useStartSignInMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [remember, setRemember] = useState(true);
  const [viewPass, setViewPass] = useState("password");
  let toastId: any = null;
  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      toastId = toast.loading("Login processing");
      const data = { email: values.email, password: values.password };
      await startLogin(data);
    },
  });

  useEffect(() => {
    if (data && data.status === 1) {
      toast.dismiss();
      dispatch(authAction.loginComplete(data.result));
      toast.success(data.message);
      setTimeout(() => {
        router.push("/");
      }, 1000);
    }
    if (error) {
      toast.dismiss();
      dispatch(authAction.loginFailure(error?.message));
      toast.error(error.message);
    }
  }, [data, isLoading, error]);
  return (
    <div className="fixed w-full h-full flex justify-center items-center bg-gray-50">
      <div className="bg-white shadow-sm sm:w-2/6 w-4/5 p-6 rounded-lg">
        <div className="mb-4 text-center">
          <Link href="/">
            <h1 className="font-bold font-logo2 text-2xl uppercase text-colorBase">
              PHForum
              <p className="text-[10px] font-light capitalize -mt-3 text-slate-600">
                By Programming Hero
              </p>
            </h1>
          </Link>
        </div>
        <h1 className="text-xl font-semibold">Login</h1>
        <p className="text-xs">
          Become a user - you can access all the features of Programming Hero
          Forum.
        </p>
        <form onSubmit={formik.handleSubmit}>
          <div className="mt-4 mb-2">
            <label
              htmlFor="email"
              className="text-[14px] text-gray-600 mb-2 flex items-center"
            >
              Email Address<span className="ml-2 text-red-700">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.email}
              className={`${
                formik.touched.email && formik.errors.email
                  ? "border-red-600 text-red-600 bg-red-50"
                  : "border-gray-300"
              } border rounded-md w-full p-2 outline-none text-sm`}
              placeholder="hero@gmail.com"
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="text-red-600 text-xs my-3">{formik.errors.email}</p>
            ) : null}
          </div>
          <div className="mt-3 mb-2">
            <label
              htmlFor="password"
              className="text-[14px] text-gray-600 mb-2 flex items-center"
            >
              Password<span className="ml-2 text-red-700">*</span>
            </label>
            <div className="relative w-full">
              <input
                id="password"
                name="password"
                type={viewPass}
                onChange={formik.handleChange}
                value={formik.values.password}
                className={`${
                  formik.touched.password && formik.errors.password
                    ? "border-red-600 text-red-600 bg-red-50"
                    : "border-gray-300"
                } border rounded-md w-full p-2 outline-none text-sm`}
                placeholder="••••••••••"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={() =>
                  viewPass === "password"
                    ? setViewPass("text")
                    : setViewPass("password")
                }
              >
                {viewPass === "text" ? (
                  <i className="bx bx-lock-open"></i>
                ) : (
                  <i className="bx bx-lock"></i>
                )}
              </button>
            </div>
            {formik.touched.password && formik.errors.password ? (
              <p className="text-red-600 text-xs my-3">
                {formik.errors.password}
              </p>
            ) : null}
          </div>
          {error && (
            <div className="text-center mt-4 mb-2 text-sm text-red-700">
              {error.message}
            </div>
          )}
          {data && data.status === 1 && (
            <div className="text-center mt-4 mb-2 text-sm text-green-700">
              {data.message}
            </div>
          )}
          <div className="mt-4 mb-1">
            <div className="flex justify-between items-center">
              <button
                type="button"
                className="flex justify-center items-center text-sm text-gray-600"
                onClick={() => setRemember(!remember)}
              >
                {remember ? (
                  <i className="bx bx-checkbox-square text-2xl mr-1 text-colorBase"></i>
                ) : (
                  <i className="bx bx-checkbox text-2xl mr-1"></i>
                )}
                Remember me
              </button>
              <button
                className="text-sm text-colorBase font-medium"
                onClick={() =>
                  toast.success("Please Contact The Admin To Reset Password", {
                    style: {
                      fontSize: "13px",
                    },
                  })
                }
                type="button"
              >
                Forgot password?
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="bg-colorBase my-3 text-white w-full py-2 rounded hover:bg-colorBaseHover disabled:bg-colorBaseDisabled disabled:text-violet-300 disabled:hover:bg-colorBaseDisabled disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Login"}
          </button>
        </form>
        <div className="w-full h-[1px] bg-slate-200 my-5"></div>
        <p className="text-sm flex justify-center items-center">
          Don't have an account?
          <Link
            className="text-sm text-colorBase font-medium ml-1"
            href="/registration"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
