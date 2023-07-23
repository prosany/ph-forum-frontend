import { useAppSelector } from "@/models";
import { POST } from "@/utilities/axios-helper";
import moment from "moment";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

const UserPosts = ({ data, setRerender }: any) => {
  const {
    _id,
    photosOrVideos,
    body,
    upVotesCount,
    upVotes,
    status,
    createdAt,
    comments,
    isCommentOff,
    isCommentOffByAdmin,
    isResolved,
    user,
  } = data;
  const [moreOption, setMoreOption] = useState(false);
  const { storedUser } = useAppSelector((state) => ({
    storedUser: state.auth.user as any,
  }));

  const handleActivity = async (data: any) => {
    try {
      const res = await POST(
        `/update-activity/${_id}`,
        { ...data },
        {
          headers: {
            Authorization: `Bearer ${storedUser?.token}`,
          },
        }
      );
      if (res.status === 1) {
        setRerender((prev: any) => !prev);
      }
    } catch (error) {}
  };
  return (
    <div className="border border-gray-100 bg-white rounded-lg shadow-sm my-5">
      <div className="flex items-start p-6">
        <div className="w-14">
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
              {moreOption && (
                <div
                  className="fixed top-0 left-0 w-full h-full bg-[#00000001] z-10 cursor-pointer"
                  onClick={() => setMoreOption((prev) => !prev)}
                ></div>
              )}
              <button
                className="mx-3 relative"
                onClick={() => setMoreOption((prev) => !prev)}
              >
                <i className="fa-solid fa-ellipsis text-xl"></i>
                {moreOption && (
                  <div className="absolute w-[230px] z-20 bg-white rounded-lg border top-full -right-2 px-2 text-left">
                    <ul className="select-none my-2">
                      {user.email === storedUser.email ? (
                        <>
                          <li>
                            <button
                              onClick={() => {
                                handleActivity({ isResolved: !isResolved });
                              }}
                              className="hover:bg-gray-50 w-full p-2 text-left rounded-lg"
                            >
                              <span className="mr-2">
                                {isResolved ? (
                                  <i className="fa-regular fa-circle-xmark text-red-600"></i>
                                ) : (
                                  <i className="fa-regular fa-circle-check text-green-600"></i>
                                )}
                              </span>
                              {isResolved
                                ? "Mark as Unresolved"
                                : "Mark as Resolved"}
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => {
                                handleActivity({ isDeleted: true });
                              }}
                              className="hover:bg-gray-50 w-full p-2 text-left rounded-lg"
                            >
                              <span className="mr-2">
                                <i className="fa-solid fa-xmark"></i>
                              </span>
                              Remove Post
                            </button>
                          </li>
                          <li>
                            <button className="hover:bg-gray-50 w-full p-2 text-left rounded-lg">
                              <span className="mr-2">
                                <i className="fa-regular fa-pen-to-square"></i>
                              </span>
                              Edit Post
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => {
                                if (isCommentOffByAdmin)
                                  return toast.error(
                                    "Commenting is turned off by admin"
                                  );
                                handleActivity({ isCommentOff: !isCommentOff });
                              }}
                              disabled={isCommentOffByAdmin}
                              className="hover:bg-gray-50 w-full p-2 text-left rounded-lg disabled:bg-red-50"
                            >
                              <span className="mr-2">
                                {isCommentOff ? (
                                  <i className="fa-solid fa-comment text-green-600"></i>
                                ) : (
                                  <i className="fa-solid fa-comment-slash text-red-600"></i>
                                )}
                              </span>
                              {isCommentOffByAdmin
                                ? "Commenting turn of by admin"
                                : isCommentOff
                                ? "Turn on Commenting"
                                : "Turn off Commenting"}
                            </button>
                          </li>
                          <li>
                            <button className="hover:bg-gray-50 w-full p-2 text-left rounded-lg">
                              <span className="mr-2">
                                <i className="fa-solid fa-unlock-keyhole"></i>
                              </span>
                              Edit Audience
                            </button>
                          </li>
                        </>
                      ) : (
                        <>
                          <li>
                            <button className="hover:bg-gray-50 w-full p-2 text-left rounded-lg">
                              <span className="mr-2">
                                <i className="fa-solid fa-link"></i>
                              </span>
                              Copy Link
                            </button>
                          </li>
                          <li>
                            <button className="hover:bg-gray-50 w-full p-2 text-left rounded-lg">
                              <span className="mr-2">
                                <i className="fa-solid fa-flag-checkered"></i>
                              </span>
                              Report to Admin
                            </button>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                )}
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
            {comments.length} {comments.length > 1 ? "Comments" : "Comment"}
          </h1>
          <button
            onClick={() => {
              if (upVotes.includes(storedUser.email)) {
                handleActivity({
                  votesCount: true,
                  upVotesCount: upVotesCount - 1,
                  upVotes: upVotes.filter(
                    (item: any) => item !== storedUser.email
                  ),
                });
              } else {
                handleActivity({
                  votesCount: true,
                  upVotesCount: upVotesCount + 1,
                  upVotes: [...upVotes, storedUser.email],
                });
              }
            }}
            className="text-2xl text-colorBaseDisabled"
          >
            {upVotes.includes(storedUser.email) ? (
              <i className="fa-solid fa-thumbs-up"></i>
            ) : (
              <i className="fa-regular fa-thumbs-up"></i>
            )}
            <span className="block text-[10px] -mt-2 font-light text-gray-800">
              {upVotesCount} Upvote
            </span>
          </button>
        </div>
        <hr className="my-5" />
        {!isCommentOff ? (
          <>
            <div className="flex items-center">
              <div className="w-14">
                {storedUser?.picture ? (
                  <img
                    src={storedUser?.picture}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover shadow-sm"
                  />
                ) : (
                  <div className="bg-gray-100 text-gray-700 w-10 h-10 rounded-full flex justify-center items-center">
                    <i className="bx bx-user text-2xl"></i>
                  </div>
                )}
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
          </>
        ) : (
          <p className="text-xs font-light text-center italic text-gray-400">
            {isCommentOffByAdmin
              ? "Commenting for this post is turned off by an admin."
              : "Commenting for this post is turned off by the post owner."}
          </p>
        )}
      </div>
    </div>
  );
};

export default UserPosts;
