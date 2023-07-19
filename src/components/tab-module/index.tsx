import Link from "next/link";
import React from "react";

const TabModule = () => {
  return (
    <div className="my-5">
      <ul className="flex items-center gap-5 border border-gray-100 bg-white rounded-lg p-2 shadow-sm">
        <li className="py-1 px-5 rounded bg-violet-50">
          <Link
            href={"/?tab=all"}
            className="text-[13px] font-semibold uppercase text-violet-800"
          >
            All Posts
          </Link>
        </li>
        <li>
          <Link
            href={"/?tab=all"}
            className="text-[13px] font-semibold uppercase text-gray-600"
          >
            My Posts
          </Link>
        </li>
        <li>
          <Link
            href={"/?tab=all"}
            className="text-[13px] font-semibold uppercase text-gray-600"
          >
            Admin Posts
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default TabModule;
