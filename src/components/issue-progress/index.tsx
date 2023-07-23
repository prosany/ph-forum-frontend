import { useAppSelector } from "@/models";
import { GET } from "@/utilities/axios-helper";
import React, { useEffect, useState } from "react";

const IssueProgress = () => {
  const [statistics, setStatistics] = useState<any>({});
  const { user } = useAppSelector((state) => ({
    user: state.auth.user as any,
  }));

  useEffect(() => {
    const getStatistics = async () => {
      const data = await GET(`/statistics?email=${user?.email}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      if (data.status === 1) {
        setStatistics(data.result[0]);
        return;
      }
      setStatistics({ status: 0, message: data.message });
    };
    getStatistics();
  }, []);
  return (
    <div className="p-4 border border-gray-100 bg-white rounded-lg shadow-sm mt-5 sticky top-20">
      <h1 className="text-center text-lg font-medium">My Issue Progress</h1>
      <hr className="my-5" />
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center bg-gray-200 p-6 rounded-lg">
          <h1 className="font-semibold text-2xl">
            {statistics?.totalPosts || 0}
          </h1>
          <p className="text-xs uppercase font-medium">Total Post</p>
        </div>
        <div className="text-center bg-gray-200 p-6 rounded-lg">
          <h1 className="font-semibold text-2xl">
            {statistics?.resolvedCount || 0}
          </h1>
          <p className="text-xs uppercase font-medium">Resolved</p>
        </div>
        <div className="text-center bg-gray-200 p-6 rounded-lg">
          <h1 className="font-semibold text-2xl">
            {statistics?.unresolvedCount || 0}
          </h1>
          <p className="text-xs uppercase font-medium">Unsolved</p>
        </div>
        <div className="text-center bg-gray-200 p-6 rounded-lg">
          <h1 className="font-semibold text-2xl">
            {statistics?.rejectedCount || 0}
          </h1>
          <p className="text-xs uppercase font-medium">Rejected</p>
        </div>
      </div>
    </div>
  );
};

export default IssueProgress;
