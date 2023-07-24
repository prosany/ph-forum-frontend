import { useAppSelector } from "@/models";
import { GET } from "@/utilities/axios-helper";
import React, { useEffect, useState } from "react";

const TopIssues = () => {
  const [trending, setTrending] = useState<any>([]);
  const { storedUser } = useAppSelector((state) => ({
    storedUser: state.auth.user as any,
  }));

  useEffect(() => {
    const getTrending = async () => {
      const res = await GET("/trending-issue", {
        headers: {
          Authorization: `Bearer ${storedUser?.token}`,
        },
      });
      if (res.status === 1) {
        setTrending(res.result);
        return;
      }
      setTrending([]);
    };
    getTrending();
  }, []);
  return (
    <div className="p-4 border border-gray-100 bg-white rounded-lg shadow-sm mb-5">
      <h1 className="text-center text-lg font-medium">
        Top Issue/Trending Issue
      </h1>
      <hr className="my-5" />
      <div className="space-y-2">
        {trending.map((item: any, index: number) => (
          <article key={index} className="flex items-center space-x-4">
            <div className="flex flex-col items-center bg-zinc-200 py-1 w-10 rounded dark:bg-zinc-700">
              <span className="font-bold text-sm">{index + 1}</span>
            </div>
            <h5>
              {item.body.slice(0, 40)}
              {item.body.length > 40 ? "..." : ""}
            </h5>
          </article>
        ))}
      </div>
    </div>
  );
};

export default TopIssues;
