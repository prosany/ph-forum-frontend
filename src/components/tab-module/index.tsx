import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const TabModule = () => {
  const { asPath } = useRouter();
  return (
    <div className="my-5">
      <ul className="flex items-center gap-5 border border-gray-100 bg-white rounded-lg p-2 shadow-sm">
        <li
          className={`py-1 px-3 rounded ${
            asPath === "/" ? "bg-violet-50" : ""
          }`}
        >
          <Link
            href={"/"}
            className={`text-[13px] font-semibold uppercase ${
              asPath === "/" ? "text-violet-800" : "text-gray-600"
            }`}
          >
            All Posts
          </Link>
        </li>
        <li
          className={`py-1 px-3 rounded ${
            asPath === "/?tab=my_post" ? "bg-violet-50" : ""
          }`}
        >
          <Link
            href={"/?tab=my_post"}
            className={`text-[13px] font-semibold uppercase ${
              asPath === "/?tab=my_post" ? "text-violet-800" : "text-gray-600"
            }`}
          >
            My Posts
          </Link>
        </li>
        <li
          className={`py-1 px-3 rounded ${
            asPath === "/?tab=admin_post" ? "bg-violet-50" : ""
          }`}
        >
          <Link
            href={"/?tab=admin_post"}
            className={`text-[13px] font-semibold uppercase ${
              asPath === "/?tab=admin_post"
                ? "text-violet-800"
                : "text-gray-600"
            }`}
          >
            Admin Posts
          </Link>
        </li>
        <li
          className={`py-1 px-3 rounded ${
            asPath === "/?tab=not_replied" ? "bg-violet-50" : ""
          }`}
        >
          <Link
            href={"/?tab=not_replied"}
            className={`text-[13px] font-semibold uppercase ${
              asPath === "/?tab=not_replied"
                ? "text-violet-800"
                : "text-gray-600"
            }`}
          >
            Not Replied
          </Link>
        </li>
        <li
          className={`py-1 px-3 rounded ${
            asPath === "/?tab=unresolved" ? "bg-violet-50" : ""
          }`}
        >
          <Link
            href={"/?tab=unresolved"}
            className={`text-[13px] font-semibold uppercase ${
              asPath === "/?tab=unresolved"
                ? "text-violet-800"
                : "text-gray-600"
            }`}
          >
            Unresolved
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default TabModule;
