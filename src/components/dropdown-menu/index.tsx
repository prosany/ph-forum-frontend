import { authAction } from "@/global/auth/authSlice";
import { useAppDispatch } from "@/models";
import { quickLinks } from "@/utilities/dropdown-menus";
import Link from "next/link";
import React from "react";

const DropdownMenu = (props: any) => {
  const dispatch = useAppDispatch();
  const { menuRef, user } = props;
  return (
    <div
      ref={menuRef}
      className="absolute top-full z-10 right-0 w-[255px] shadow-sm bg-white border rounded-lg duration-300 hidden"
    >
      <div className="p-3 flex items-center justify-between">
        <img
          src="https://files.mahabubsany.com/image/file-1680085400979-sany.png?key=111"
          alt=""
          className="w-10 h-10 rounded-full object-cover shadow-sm"
        />
        <div>
          <h1 className="font-medium text-sm capitalize text-gray-700 select-none">
            {user?.name}
          </h1>
          <p className="text-xs text-gray-500 select-none">{user?.email}</p>
        </div>
      </div>
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
