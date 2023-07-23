import IssueProgress from "@/components/issue-progress";
import PostModule from "@/components/post-module";
import UserPosts from "@/components/post-module/UserPosts";
import TabModule from "@/components/tab-module";
import TopIssues from "@/components/top-issues";
import withAuth from "@/middlewares/withAuth";
import { useAppSelector } from "@/models";

import { GET } from "@/utilities/axios-helper";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { asPath } = useRouter();
  const { user } = useAppSelector((state) => ({
    user: state.auth.user as any,
  }));

  const getURI = (asPath: string) => {
    switch (asPath) {
      case "/":
        return "/get-posts";

      case "/?tab=my_post":
        return `/get-posts?email=${user.email}`;

      case "/?tab=admin_post":
        return "/get-posts";

      case "/?tab=not_replied":
        return "/get-posts";

      default:
        return "/get-posts";
    }
  };

  useEffect(() => {
    const getPosts = async () => {
      const data = await GET(getURI(asPath), {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setPosts(data.result);
    };
    getPosts();
  }, [asPath]);

  return (
    <>
      <Head>
        <title>PHForum | Programming Hero</title>
      </Head>
      <div className="grid grid-cols-12 gap-10 my-8">
        <div className="col-span-8">
          <PostModule />
          <TabModule />
          {posts.length === 0 && (
            <div className="my-10 text-center">
              <h1 className="font-bold uppercase text-gray-400">
                No Post Found!
              </h1>
            </div>
          )}
          {posts.map((item: any, index: number) => (
            <UserPosts key={item._id} data={item} />
          ))}
        </div>
        <div className="col-span-4">
          <TopIssues />
          <IssueProgress />
        </div>
      </div>
    </>
  );
};

export default withAuth(Home);
