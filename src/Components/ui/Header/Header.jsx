import React from "react";
import { Button } from "../button";
import { UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Header = () => {
  const { isSignedIn, user } = useUser();
  return (
    <div className="px-3 py-2 flex justify-between shadow-md mb-3 ">
      <Link to={"/"}><img src="/logo.svg" alt="" /></Link>

      {isSignedIn ? (
        <div className="flex gap-2 items-center">
          <Link to="/dashboard">
          <Button variant="outline transparent" >Dashboard</Button>
          </Link>
          <UserButton/>
        </div>
      ) : (
        <Link to="/auth/signin">
          <Button className="bg-[#007AFF] hover:bg-[#312ECB]">
            Get Started
          </Button>
        </Link>
      )}
    </div>
  );
};

export default Header;
