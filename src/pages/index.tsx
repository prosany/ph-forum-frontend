import PostModule from "@/components/post-module";
import UserPosts from "@/components/post-module/UserPosts";
import TabModule from "@/components/tab-module";
import withAuth from "@/middlewares/withAuth";
import { useAppSelector } from "@/models";

import { GET } from "@/utilities/axios-helper";
import { useEffect, useState } from "react";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useAppSelector((state) => ({
    user: state.auth.user as any,
  }));

  useEffect(() => {
    const getPosts = async () => {
      const data = await GET("/get-posts", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setPosts(data.result);
    };
    getPosts();
  }, []);
  return (
    <div className="grid grid-cols-12 gap-10 my-8">
      <div className="col-span-8">
        <PostModule />
        <TabModule />
        {posts.map((item: any, index: number) => (
          <UserPosts key={item._id} data={item} />
        ))}
      </div>
      <div className="col-span-4">
        <div className="p-4 border border-gray-100 bg-white rounded-lg shadow-sm mb-5">
          <h1 className="text-center text-lg font-medium">
            Top Issue/Trending Issue
          </h1>
          <hr className="my-5" />
          <div className="space-y-2">
            <article className="flex items-center space-x-4">
              <div className="flex flex-col items-center bg-zinc-200 py-1 w-10 rounded dark:bg-zinc-700">
                <span className="font-bold text-sm">442</span>
              </div>
              <h5>AWS Singapore Region</h5>
            </article>
            <article className="flex items-center space-x-4">
              <div className="flex flex-col items-center bg-zinc-200 py-1 w-10 rounded dark:bg-zinc-700">
                <span className="font-bold text-sm">57</span>
              </div>
              <h5>Export/import data from other Redis</h5>
            </article>
            <article className="flex items-center space-x-4">
              <div className="flex flex-col items-center bg-zinc-200 py-1 w-10 rounded dark:bg-zinc-700">
                <span className="font-bold text-sm">2</span>
              </div>
              <h5>Git push not working</h5>
            </article>
          </div>
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
