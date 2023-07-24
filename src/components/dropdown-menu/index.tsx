import { authAction } from "@/global/auth/authSlice";
import { useAppDispatch } from "@/models";
import { POST } from "@/utilities/axios-helper";
import uploadFiles from "@/utilities/cloudinary";
import { quickLinks } from "@/utilities/dropdown-menus";
import Link from "next/link";
import React from "react";
import { toast } from "react-hot-toast";

const DropdownMenu = (props: any) => {
  const dispatch = useAppDispatch();

  const { menuRef, user } = props;
  return (
    <div
      ref={menuRef}
      className="absolute top-full z-10 right-0 w-[255px] shadow-sm bg-white border rounded-lg duration-300 hidden"
    >
      <div className="p-3 flex items-center justify-between">
        {user?.picture ? (
          <img
            src={user?.picture}
            alt=""
            className="w-10 h-10 rounded-full object-cover shadow-sm"
          />
        ) : (
          <div className="bg-gray-100 text-gray-700 w-10 h-10 rounded-full flex justify-center items-center">
            <i className="bx bx-user text-2xl"></i>
          </div>
        )}
        <div>
          <h1 className="font-medium text-sm capitalize text-gray-700 select-none">
            {user?.name}
          </h1>
          <p className="text-xs text-gray-500 select-none">{user?.email}</p>
        </div>
      </div>
      <input
        type="file"
        id="profile_picture"
        onChange={async (e) => {
          try {
            const files = Array.from(e.target.files as any);
            if (files.length <= 0) return;
            const toastId = toast.loading("Updating profile picture...");
            const uploaded = await uploadFiles(files);
            const res = await POST(
              "/update",
              {
                picture: uploaded[0].url,
              },
              {
                headers: {
                  Authorization: `Bearer ${user?.token}`,
                },
              }
            );
            if (res.status === 1) {
              toast.dismiss(toastId);
              toast.success("Successfully updated profile picture.");
              dispatch(
                authAction.loginComplete({ ...user, picture: uploaded[0].url })
              );
              e.target.files = null;
            } else {
              toast.dismiss(toastId);
              toast.error("Failed to update profile picture.");
              e.target.files = null;
            }
          } catch (error) {
            e.target.files = null;
          }
        }}
        hidden
      />
      <label
        htmlFor="profile_picture"
        className="px-2 text-xs mb-3 block text-colorBaseHover font-medium cursor-pointer"
      >
        Change Pofile Picture
      </label>
      <hr />
      <ul className="px-1">
        {quickLinks.map((item) => (
          <li
            key={item.id + item.name}
            className={`text-md py-1 px-2 hover:bg-slate-50 rounded my-1 ${item.color} cursor-pointer`}
          >
            <Link href={item.link} className="flex items-center">
              <span className={`mr-2 flex items-center text-xl ${item.color}`}>
                <i className={item.icon}></i>
              </span>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      <hr />
      <div className="my-2 text-md py-1 px-2 rounded text-red-700 w-full">
        <button
          className="flex items-center w-full px-2"
          onClick={() => {
            dispatch(authAction.logOut());
          }}
        >
          <span className="mr-2 flex items-center text-xl text-red-700">
            <i className="bx bx-power-off"></i>
          </span>
          LogOut
        </button>
      </div>
    </div>
  );
};

export default DropdownMenu;
