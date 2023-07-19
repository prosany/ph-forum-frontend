import { useStartSignUpMutation } from "@/global/auth/authQuery";
import { registerSchema } from "@/schemas/userSchema";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirm_password: "",
  phone: "",
  batch: "WEB-8",
};

const Registration = () => {
  const [startSignUp, { data, error, isLoading }] = useStartSignUpMutation();
  const router = useRouter();
  const [viewPass, setViewPass] = useState("password");
  let toastId: any = null;
  const formik = useFormik({
    initialValues,
    validationSchema: registerSchema,
    onSubmit: (values) => {
      toastId = toast.loading("Registration processing");
      const data = { ...values };
      startSignUp(data);
    },
  });

  useEffect(() => {
    if (data && data.status === 1) {
      toast.dismiss();
      toast.success(data.message);
      router.push("/login");
      return;
    }
    if (error) {
      toast.dismiss();
      toast.error(error.message);
    }
  }, [data, isLoading, error]);
  return (
    <div className="fixed w-full h-full flex justify-center bg-gray-50 overflow-y-scroll">
      <div className="bg-white h-fit shadow-sm sm:w-2/6 w-4/5 p-6 rounded-lg my-10">
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
        <h1 className="text-xl font-semibold">Register</h1>
        <p className="text-xs">
          Become a user - you can access all the features of Programming Hero
          Forum.
        </p>
        <form onSubmit={formik.handleSubmit}>
          <div className="mt-4 mb-2">
            <label
              htmlFor="name"
              className="text-[14px] text-gray-600 mb-2 flex items-center"
            >
              Full Name<span className="ml-2 text-red-700">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
              className={`${
                formik.touched.name && formik.errors.name
                  ? "border-red-600 text-red-600 bg-red-50"
                  : "border-gray-300"
              } border rounded-md w-full p-2 outline-none text-sm`}
              placeholder="Jhankar Mahbub"
            />
            {formik.touched.name && formik.errors.name ? (
              <p className="text-red-600 text-xs my-3">{formik.errors.name}</p>
            ) : null}
          </div>
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
          <div className="mt-3 mb-2">
            <label
              htmlFor="confirm_password"
              className="text-[14px] text-gray-600 mb-2 flex items-center"
            >
              Confirm Password
              <span className="ml-2 text-red-700">*</span>
            </label>
            <div className="relative w-full">
              <input
                id="confirm_password"
                name="confirm_password"
                type={viewPass}
                onChange={formik.handleChange}
                value={formik.values.confirm_password}
                className={`${
                  formik.touched.confirm_password &&
                  formik.errors.confirm_password
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
            {formik.touched.confirm_password &&
            formik.errors.confirm_password ? (
              <p className="text-red-600 text-xs my-3">
                {formik.errors.confirm_password}
              </p>
            ) : null}
          </div>
          <div className="mt-4 mb-2">
            <label
              htmlFor="phone"
              className="text-[14px] text-gray-600 mb-2 flex items-center"
            >
              Phone Number<span className="ml-2 text-red-700">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.phone}
              className={`${
                formik.touched.phone && formik.errors.phone
                  ? "border-red-600 text-red-600 bg-red-50"
                  : "border-gray-300"
              } border rounded-md w-full p-2 outline-none text-sm`}
              placeholder="01711122233"
            />
            {formik.touched.phone && formik.errors.phone ? (
              <p className="text-red-600 text-xs my-3">{formik.errors.phone}</p>
            ) : null}
          </div>
          <div className="mt-4 mb-2">
            <label
              htmlFor="batch"
              className="text-[14px] text-gray-600 mb-2 flex items-center"
            >
              Batch<span className="ml-2 text-red-700">*</span>
            </label>
            <select
              name="batch"
              id="batch"
              onChange={formik.handleChange}
              value={formik.values.batch}
              className={`${
                formik.touched.batch && formik.errors.batch
                  ? "border-red-600 text-red-600 bg-red-50"
                  : "border-gray-300"
              } border rounded-md w-full p-2 outline-none text-sm`}
            >
              <option value="WEB-6">WEB-6</option>
              <option value="WEB-7">WEB-7</option>
              <option value="WEB-8">WEB-8</option>
              <option value="WEB-9">WEB-9</option>
            </select>

            {formik.touched.batch && formik.errors.batch ? (
              <p className="text-red-600 text-xs my-3">{formik.errors.batch}</p>
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
          <button
            type="submit"
            className="bg-colorBase my-3 text-white w-full py-2 rounded hover:bg-colorBaseHover disabled:bg-colorBaseDisabled disabled:text-violet-300 disabled:hover:bg-colorBaseDisabled disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Register"}
          </button>
        </form>
        <div className="w-full h-[1px] bg-slate-200 my-5"></div>
        <p className="text-sm flex justify-center items-center">
          Already have an account?
          <Link
            className="text-sm text-colorBase font-medium ml-1"
            href="/login"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Registration;
