import withAuth from "@/middlewares/withAuth";
import React from "react";

const Profile = () => {
  return (
    <div>
      <h1>Profile</h1>
    </div>
  );
};

export default withAuth(Profile);
