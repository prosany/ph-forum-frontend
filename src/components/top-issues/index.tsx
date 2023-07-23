import React from "react";

const TopIssues = () => {
  return (
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
  );
};

export default TopIssues;
