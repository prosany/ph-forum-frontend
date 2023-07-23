import Link from "next/link";
import React, { useCallback, useEffect, useRef } from "react";
import DropdownMenu from "../dropdown-menu";
import { useRouter } from "next/router";
import { useAppSelector } from "@/models";
import formatName from "@/utilities/format-user-name";

const Header = () => {
  const { pathname } = useRouter();
  const { user } = useAppSelector((state) => ({
    user: state.auth.user as any,
  }));
  const menuRef = useRef<any>(null);
  const overlayRef = useRef<any>(null);

  const toogleDropDown = useCallback(() => {
    menuRef.current.classList.toggle("hidden");
    overlayRef.current.classList.toggle("hidden");
  }, []);

  useEffect(() => {
    menuRef.current.classList.add("hidden");
    overlayRef.current.classList.add("hidden");
  }, [pathname]);
  return (
    <header className="bg-white sticky top-0 z-20 shadow-sm">
      <div className="w-[80%] mx-auto flex justify-between items-center">
        <Link href={"/"} className="flex items-center select-none">
          <h1 className="font-bold font-logo2 text-2xl uppercase text-colorBase -mb-3">
            PHForum
            <p className="text-[10px] font-light capitalize -mt-4 text-slate-600">
              By Programming Hero
            </p>
          </h1>
        </Link>
        <ul className="flex justify-end items-center gap-8 select-none">
          <li className="py-3 font-light text-[15px]">
            <Link href={"/"}>About</Link>
          </li>
          <li className="py-3 font-light text-[15px]">
            <Link href={"/"}>Terms & Conditions</Link>
          </li>
          <li className="py-3">
            <div className="bg-gray-100 rounded-lg px-1 relative flex items-center">
              <label htmlFor="search" className="pl-2">
                <i className="bx bx-search text-xl text-gray-500"></i>
              </label>
              <input
                id="search"
                type="text"
                placeholder="Search here"
                className="py-3 bg-transparent outline-none px-2 w-[250px] font-light text-[15px]"
              />
            </div>
          </li>
          <li className="py-3">
            <button className="relative text-gray-800 flex justify-center items-center">
              <i className="bx bx-bell text-2xl"></i>
              <span className="nav-dot"></span>
            </button>
          </li>
          <li className="py-3">
            <button className="relative text-gray-800 flex justify-center items-center">
              <i className="bx bx-bookmark text-2xl"></i>
              <span className="nav-dot"></span>
            </button>
          </li>
          <li className="py-3 font-light text-[15px] flex items-center relative">
            <button
              className="bg-gray-100 text-gray-700 w-10 h-10 rounded-full flex justify-center items-center"
              onClick={toogleDropDown}
            >
              {user?.picture ? (
                <img
                  src={user?.picture}
                  alt=""
                  className="w-full h-full rounded-full object-cover shadow-sm"
                />
              ) : (
                <i className="bx bx-user text-2xl"></i>
              )}
            </button>
            <p className="ml-2">
              Hi,{" "}
              <span className="font-normal ml-1">{formatName(user?.name)}</span>
            </p>
            <DropdownMenu user={user} menuRef={menuRef} />
          </li>
        </ul>
        <div
          ref={overlayRef}
          className="fixed w-full h-full bg-neutral-950 opacity-5 top-0 left-0 hidden"
          onClick={toogleDropDown}
        ></div>
      </div>
    </header>
  );
};

export default Header;
