import React from "react";

const CommentModal = ({ comments, setSeeComment }: any) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-20 flex justify-center items-center ">
      <div
        className="fixed top-0 left-0 w-full h-full bg-[#0000009f] z-10 cursor-pointer"
        onClick={() => setSeeComment((prev: any) => !prev)}
      ></div>
      <div className="w-2/5 bg-white rounded-lg max-h-[90vh] overflow-y-scroll p-6 z-20">
        <h1 className="font-medium text-center">Comments</h1>
        <hr className="my-4" />
        {comments.map((comment: any, index: number) => (
          <div key={index}>
            <div className="flex justify-between items-center px-4 py-2">
              <div className="flex items-start">
                {comment?.user?.picture ? (
                  <img
                    src={comment?.user?.picture}
                    alt="user"
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <span className="w-8 h-8 rounded-full flex justify-center items-center border">
                    <i className="bx bx-user text-2xl"></i>
                  </span>
                )}
                <div className="ml-2 bg-gray-50 px-4 py-2 rounded-xl">
                  <p className="font-medium text-sm text-gray-600">
                    {comment.user.name}
                  </p>
                  <p className="text-md font-light text-gray-600">
                    {comment.comment}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentModal;
