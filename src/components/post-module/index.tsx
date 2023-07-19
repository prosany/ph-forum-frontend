import React from "react";

const PostModule = () => {
  return (
    <div className="bg-white border border-gray-100 shadow-sm rounded-lg p-4">
      <div className="flex items-center">
        <div className="w-16">
          <img
            src="https://images.unsplash.com/photo-1457449940276-e8deed18bfff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
            alt=""
            className="w-12 h-12 rounded-full object-cover shadow-sm"
          />
        </div>
        <div className="w-full h-12 bg-gray-100 rounded-full flex items-center">
          <p className="ml-5 font-light text-gray-500 cursor-pointer select-none">
            Share or Ask Something to Everyone?
          </p>
        </div>
      </div>
      <div className="flex gap-3 mt-4">
        <button className="flex justify-center items-center font-light p-2 rounded text-[15px] hover:bg-gray-50">
          <span className="text-xl mr-2 text-green-600">
            <i className="fa-solid fa-photo-film"></i>
          </span>
          Photo/Video
        </button>
        <button className="flex justify-center items-center font-light p-2 rounded text-[15px] hover:bg-gray-50">
          <span className="text-xl mr-2 text-[#f7b928]">
            <i className="fa-regular fa-face-laugh-wink"></i>
          </span>
          Feeling/Activity
        </button>
      </div>
    </div>
  );
};

export default PostModule;
