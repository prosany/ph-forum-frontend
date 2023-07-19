import PostModule from "@/components/post-module";
import UserPosts from "@/components/post-module/userPosts";
import TabModule from "@/components/tab-module";
import withAuth from "@/middlewares/withAuth";

const Home = () => {
  return (
    <div className="grid grid-cols-12 gap-10 my-8">
      <div className="col-span-8">
        <PostModule />
        <TabModule />
        <UserPosts
          image={
            "https://img.freepik.com/free-photo/demo-digital-device_23-2149243954.jpg"
          }
        />
        <UserPosts />
        <UserPosts />
        <UserPosts />
      </div>
      <div className="col-span-4">
        <div className="p-4 border border-gray-100 bg-white rounded-lg shadow-sm mb-5">
          <h1 className="text-center text-lg font-medium">
            Top Issue/Trending Issue
          </h1>
          <hr className="my-5" />
          <ul>
            <li className="border-0 border-b w-full h-auto p-2 text-violet-900 my-2 text-sm font-normal">
              <span className="font-semibold">1.</span> How to deploy project on
              vercel
            </li>

            <li className="border-0 border-b w-full h-auto p-2 text-violet-900 my-2 text-sm font-normal">
              <span>2.</span> Node.js is not installing on my machine. Show some
              error.
            </li>
            <li className="border-0 border-b w-full h-auto p-2 text-violet-900 my-2 text-sm font-normal">
              <span>3.</span> Git push not working, showing fatal. I'm not able
              to solve the problem.
            </li>
          </ul>
        </div>
        <div className="p-4 border border-gray-100 bg-white rounded-lg shadow-sm mt-5 sticky top-20">
          <h1 className="text-center text-lg font-medium">My Issue Progress</h1>
          <hr className="my-5" />
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center bg-gray-200 p-6 rounded-lg">
              <h1 className="font-semibold text-2xl">16</h1>
              <p className="text-xs uppercase font-medium">Total Post</p>
            </div>
            <div className="text-center bg-gray-200 p-6 rounded-lg">
              <h1 className="font-semibold text-2xl">14</h1>
              <p className="text-xs uppercase font-medium">Resolved</p>
            </div>
            <div className="text-center bg-gray-200 p-6 rounded-lg">
              <h1 className="font-semibold text-2xl">1</h1>
              <p className="text-xs uppercase font-medium">Unsolved</p>
            </div>
            <div className="text-center bg-gray-200 p-6 rounded-lg">
              <h1 className="font-semibold text-2xl">11</h1>
              <p className="text-xs uppercase font-medium">Rejected</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Home);
