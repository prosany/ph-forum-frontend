import React, { useState } from "react";
import CreatePost from "./createPost";
import { useAppSelector } from "@/models";

const PostModule = ({ setRerender }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAppSelector((state) => ({
    user: state.auth.user as any,
  }));
  return (
    <>
      <div className="bg-white border border-gray-100 shadow-sm rounded-lg p-4">
        <div className="flex items-center">
          <div className="w-16">
            {/* <img
              src={user?.picture}
              alt=""
              className="w-12 h-12 rounded-full object-cover shadow-sm"
            /> */}
            {user?.picture ? (
              <img
                src={user?.picture}
                alt=""
                className="w-12 h-12 rounded-full object-cover shadow-sm"
              />
            ) : (
              <div className="bg-gray-100 text-gray-700 w-12 h-12 rounded-full flex justify-center items-center">
                <i className="bx bx-user text-2xl"></i>
              </div>
            )}
          </div>
          <div
            className="w-full h-12 bg-gray-100 rounded-full flex items-center cursor-pointer select-none"
            onClick={() => setIsModalOpen(!isModalOpen)}
          >
            <p className="ml-5 font-light text-gray-500">
              Share or Ask Something to Everyone?
            </p>
          </div>
        </div>
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => setIsModalOpen(!isModalOpen)}
            className="flex justify-center items-center font-light p-2 rounded text-[15px] hover:bg-gray-50"
          >
            <span className="text-xl mr-2 text-green-600">
              <i className="fa-solid fa-photo-film"></i>
            </span>
            Photo/Video
          </button>
          <button
            onClick={() => setIsModalOpen(!isModalOpen)}
            className="flex justify-center items-center font-light p-2 rounded text-[15px] hover:bg-gray-50"
          >
            <span className="text-xl mr-2 text-[#f7b928]">
              <i className="fa-regular fa-face-laugh-wink"></i>
            </span>
            Feeling/Activity
          </button>
        </div>
      </div>
      {isModalOpen && (
        <CreatePost setRerender={setRerender} closeFn={setIsModalOpen} />
      )}
    </>
  );
};

export default PostModule;
