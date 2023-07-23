import moment from "moment";
import React from "react";

const UserPosts = ({ data }: any) => {
  const { photosOrVideos, body, upVotesCount, status, createdAt, user } = data;
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
            <h1 className="text-lg font-medium">{user.name}</h1>
            <div className="flex justify-center items-center">
              <p className="bg-violet-100 text-violet-800 font-medium text-sm px-3 py-1 rounded mr-3">
                {status}
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
              {moment.parseZone(createdAt).local().fromNow()}
            </p>
            <p
              className="text-xs text-gray-600"
              title={moment.parseZone(createdAt).local().format("LLL")}
            >
              <span className="mr-2 text-xs text-gray-600">
                <i className="fa-regular fa-calendar"></i>
              </span>
              {moment.parseZone(createdAt).local().format("LL")}
            </p>
            <p className="text-xs text-gray-600">
              <span className="mr-2 text-xs text-gray-600">
                <i className="fa-solid fa-people-group"></i>
              </span>
              {user.batch}
            </p>
          </div>
        </div>
      </div>
      <div className="px-6 text-left">
        <p>{body}</p>
      </div>
      <div
        className={`grid grid-cols-${
          photosOrVideos.length >= 3 ? 3 : photosOrVideos.length
        } gap-2`}
      >
        {photosOrVideos.length > 0 &&
          photosOrVideos.map((item: any, index: number) => (
            <div key={index} className="w-full">
              {item.type === "video" && (
                <video
                  src={item.url}
                  controls={true}
                  autoPlay
                  muted
                  loop
                  className="w-full h-full object-cover rounded-lg"
                />
              )}
              {item.type === "image" && (
                <img
                  src={item.url}
                  alt=""
                  className="w-full h-auto rounded-lg"
                />
              )}
            </div>
          ))}
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center">
          <h1 className="text-gray-600 text-sm font-medium flex items-center">
            <span className="text-xl mr-2">
              <i className="fa-regular fa-comment-dots fa-flip-horizontal"></i>
            </span>
            150+ Comments
          </h1>
          <button className="text-2xl text-colorBaseDisabled">
            <i className="fa-regular fa-thumbs-up"></i>
            <span className="block text-[10px] -mt-2 font-light text-gray-800">
              {upVotesCount} Upvote
            </span>
          </button>
        </div>
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
