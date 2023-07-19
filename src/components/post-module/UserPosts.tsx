import React from "react";

const UserPosts = (props: any) => {
  const { image } = props;
  return (
    <div className="border border-gray-100 bg-white rounded-lg shadow-sm my-5">
      <div className="flex items-start p-6">
        <div className="w-14">
          <img
            src="https://images.unsplash.com/photo-1457449940276-e8deed18bfff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
            alt=""
            className="w-10 h-10 rounded-full object-cover shadow-sm"
          />
        </div>
        <div className="w-full">
          <div className="flex justify-between">
            <h1 className="text-lg font-medium">Mahabub Hasan Sany</h1>
            <div className="flex justify-center items-center">
              <p className="bg-violet-100 text-violet-800 font-medium text-sm px-3 py-1 rounded mr-3">
                In Progress
              </p>
              <button className="mx-3">
                <i className="bx bx-bookmark text-xl"></i>
              </button>
              <button className="mx-3">
                <i className="fa-solid fa-ellipsis text-xl"></i>
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-xs text-gray-600">
              <span className="mr-2 text-xs text-gray-600">
                <i className="fa-regular fa-clock"></i>
              </span>
              1 hours ago
            </p>
            <p className="text-xs text-gray-600">
              <span className="mr-2 text-xs text-gray-600">
                <i className="fa-regular fa-calendar"></i>
              </span>
              20 July 2023
            </p>
            <p className="text-xs text-gray-600">
              <span className="mr-2 text-xs text-gray-600">
                <i className="fa-solid fa-people-group"></i>
              </span>
              Batch 8
            </p>
          </div>
        </div>
      </div>
      <div className="px-6 text-left">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam,
          doloremque nulla! Ipsa aperiam blanditiis totam repudiandae
          exercitationem doloremque fuga possimus laudantium unde nemo, dolorum
          neque corporis ipsum tempora vero quam? Veritatis porro quasi
          assumenda, expedita earum ut veniam sunt, aut corporis blanditiis,
          quia odio deleniti alias aliquid vel modi nisi?
        </p>
      </div>
      <div>
        <img src={image} alt="" className="w-full h-auto" />
      </div>
      <div className="p-6">
        <h1 className="text-gray-600 text-sm font-medium flex items-center">
          <span className="text-xl mr-2">
            <i className="fa-regular fa-comment-dots fa-flip-horizontal"></i>
          </span>
          150+ Comments
        </h1>
        <hr className="my-5" />
        <div className="flex items-center">
          <div className="w-14">
            <img
              src="https://images.unsplash.com/photo-1457449940276-e8deed18bfff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
              alt=""
              className="w-10 h-10 rounded-full object-cover shadow-sm"
            />
          </div>
          <div className="w-full bg-gray-100 h-12 rounded-full py-2 px-4 flex items-center">
            <textarea
              className="bg-transparent w-full h-full outline-none p-1 resize-none"
              placeholder="What's on your mind?"
            ></textarea>

            <div className="flex justify-center items-center gap-4 ml-2">
              <button className="text-xl text-gray-700">
                <i className="fa-solid fa-camera"></i>
              </button>
              <button className="text-xl text-gray-700">
                <i className="fa-regular fa-image"></i>
              </button>
              <button className="text-xl text-gray-700">
                <i className="fa-solid fa-link"></i>
              </button>
              <button className="text-xl text-gray-700">
                <i className="fa-regular fa-face-smile-beam"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPosts;
