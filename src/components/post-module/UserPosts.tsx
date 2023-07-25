import { useAppSelector } from "@/models";
import { POST } from "@/utilities/axios-helper";
import moment from "moment";
import React, { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import CommentModal from "../comments";
import EditPost from "./EditPost";

const UserPosts = ({ data, setRerender }: any) => {
  const {
    _id,
    photosOrVideos,
    body,
    upVotesCount,
    upVotes,
    status,
    createdAt,
    category,
    comments,
    isCommentOff,
    isCommentOffByAdmin,
    isResolved,
    isRejected,
    isUnresolved,
    editedBy,
    tags,
    user,
  } = data;
  const PostCommentRef = useRef<HTMLTextAreaElement | any>(null);
  const [moreOption, setMoreOption] = useState(false);
  const [seeComments, setSeeComment] = useState(false);
  const [editPost, setEditPost] = useState(false);
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

  const submitComment = async (event: any) => {
    if (
      event.keyCode === 13 &&
      !event.shiftKey &&
      PostCommentRef.current === document.activeElement
    ) {
      if (/^\s*$/.test(PostCommentRef.current.value)) return;
      try {
        const res = await POST(
          `/comment-on/${_id}`,
          { comment: PostCommentRef.current.value },
          {
            headers: {
              Authorization: `Bearer ${storedUser?.token}`,
            },
          }
        );
        if (res.status === 1) {
          PostCommentRef.current.value = "";
          toast.success("Commented successfully.");
          setRerender((prev: any) => !prev);
        }
      } catch (error) {}
    }
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
            <div className="flex">
              <h1 className="text-lg font-medium">{user.name}</h1>
              <div>
                {(user.role === "admin" || user.role === "moderator") && (
                  <span className="text-[8px] bg-colorBaseHover px-2 py-1 rounded-md text-white ml-2 capitalize">
                    {user.role}
                  </span>
                )}
              </div>
            </div>

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
                      {storedUser.role === "admin" ||
                      storedUser.role === "moderator" ||
                      user.email === storedUser.email ? (
                        <>
                          {storedUser.role === "admin" ||
                          storedUser.role === "moderator" ? (
                            <>
                              <li>
                                <button
                                  onClick={() => {
                                    handleActivity({
                                      isUpdateStatus: "Rejected",
                                    });
                                  }}
                                  className="hover:bg-gray-50 w-full p-2 text-left rounded-lg"
                                >
                                  <span className="mr-2">
                                    {isRejected ? (
                                      <i className="fa-regular fa-circle-xmark text-red-600"></i>
                                    ) : (
                                      <i className="fa-regular fa-circle-check text-green-600"></i>
                                    )}
                                  </span>
                                  {isRejected
                                    ? "Already Rejected"
                                    : "Mark as Rejected"}
                                </button>
                              </li>
                              <li>
                                <button
                                  onClick={() => {
                                    handleActivity({
                                      isUpdateStatus: "Unresolved",
                                    });
                                  }}
                                  className="hover:bg-gray-50 w-full p-2 text-left rounded-lg"
                                >
                                  <span className="mr-2">
                                    {isUnresolved ? (
                                      <i className="fa-regular fa-circle-xmark text-red-600"></i>
                                    ) : (
                                      <i className="fa-regular fa-circle-check text-green-600"></i>
                                    )}
                                  </span>
                                  {isUnresolved
                                    ? "Already Unresolved"
                                    : "Mark as Unresolved"}
                                </button>
                              </li>
                              <li>
                                <button
                                  onClick={() => {
                                    handleActivity({
                                      isUpdateStatus: "Closed",
                                    });
                                  }}
                                  className="hover:bg-gray-50 w-full p-2 text-left rounded-lg"
                                >
                                  <span className="mr-2">
                                    {status === "Closed" ? (
                                      <i className="fa-regular fa-circle-xmark text-red-600"></i>
                                    ) : (
                                      <i className="fa-regular fa-circle-check text-green-600"></i>
                                    )}
                                  </span>
                                  {status === "Closed"
                                    ? "Already Closed"
                                    : "Mark as Closed"}
                                </button>
                              </li>
                            </>
                          ) : null}
                          {storedUser.role === "admin" ||
                          storedUser.role === "moderator" ? (
                            <li>
                              <button
                                onClick={() => {
                                  handleActivity({
                                    isUpdateStatus: "Resolved",
                                  });
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
                          ) : (
                            <li>
                              <button
                                onClick={() => {
                                  if (editedBy === "admin") {
                                    toast.error(
                                      "This post is already edited by admin you can't edit it."
                                    );
                                    return;
                                  }

                                  handleActivity({ isResolved: !isResolved });
                                }}
                                className="hover:bg-gray-50 w-full p-2 text-left rounded-lg"
                              >
                                <span className="mr-2">
                                  {isResolved || editedBy === "admin" ? (
                                    <i className="fa-regular fa-circle-xmark text-red-600"></i>
                                  ) : (
                                    <i className="fa-regular fa-circle-check text-green-600"></i>
                                  )}
                                </span>
                                {editedBy === "admin"
                                  ? `Post is ${status}`
                                  : isResolved
                                  ? "Mark as Unresolved"
                                  : "Mark as Resolved"}
                                {editedBy === "admin" && (
                                  <span className="text-[8px] block">
                                    Already edited by admin you can't edit it.
                                  </span>
                                )}
                              </button>
                            </li>
                          )}
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
                            <button
                              onClick={() => setEditPost((prev) => !prev)}
                              className="hover:bg-gray-50 w-full p-2 text-left rounded-lg"
                            >
                              <span className="mr-2">
                                <i className="fa-regular fa-pen-to-square"></i>
                              </span>
                              Edit Post
                            </button>
                          </li>
                          <li>
                            <button
                              onClick={() => {
                                if (
                                  isCommentOffByAdmin &&
                                  (storedUser.role !== "admin" ||
                                    storedUser.role === "moderator")
                                )
                                  return toast.error(
                                    "Commenting is turned off by admin you can't turn it on."
                                  );
                                handleActivity({ isCommentOff: !isCommentOff });
                              }}
                              className="hover:bg-gray-50 w-full p-2 text-left rounded-lg disabled:bg-red-50"
                            >
                              <span className="mr-2">
                                {isCommentOff ? (
                                  <i className="fa-solid fa-comment text-green-600"></i>
                                ) : (
                                  <i className="fa-solid fa-comment-slash text-red-600"></i>
                                )}
                              </span>
                              {isCommentOffByAdmin &&
                              (storedUser.role !== "admin" ||
                                storedUser.role === "moderator")
                                ? "Comment turn of by admin"
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
            {user.role === "admin" || user.role === "moderator" ? null : (
              <p className="text-xs text-gray-600">
                <span className="mr-2 text-xs text-gray-600">
                  <i className="fa-solid fa-people-group"></i>
                </span>
                {user.batch}
              </p>
            )}
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
      <div className="px-6 pt-6 flex items-center flex-wrap">
        <span className="bg-blue-200 text-gray-900 px-2 py-1 m-1 rounded text-xs">
          {category}
        </span>
        {tags.length > 0 && <span className="mx-4 text-gray-300">|</span>}
        <div>
          {tags.map((item: any, index: number) => (
            <span
              key={index}
              className="bg-lime-200 text-gray-900 px-2 py-1 rounded m-1 text-xs"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
      <div className="px-6 pb-6">
        <div className="flex justify-between items-center">
          <h1
            className="text-gray-600 text-sm font-medium flex items-center cursor-pointer select-none"
            onClick={() => {
              comments.length === 0 && toast.error("No comments found.");
              comments.length > 0 && setSeeComment((prev) => !prev);
            }}
          >
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
                  ref={PostCommentRef}
                  className="bg-transparent w-full h-full outline-none p-1 resize-none"
                  placeholder="What's on your mind?"
                  onKeyDown={submitComment}
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
              {seeComments && (
                <CommentModal
                  comments={comments}
                  setSeeComment={setSeeComment}
                />
              )}
              {editPost && (
                <EditPost
                  closeFn={setEditPost}
                  setRerender={setRerender}
                  post={data}
                />
              )}
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
