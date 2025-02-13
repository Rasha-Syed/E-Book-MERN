import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from 'react-icons/fa'; // <-- Use FaSignOutAlt
import { useDispatch } from "react-redux"; // <-- Import useDispatch
import { authActions } from "../../store/auth"; // <-- Import the authActions

const Sidebar = ({ data }) => {
  const dispatch = useDispatch(); // <-- Initialize dispatch
  const navigate = useNavigate(); // <-- For navigation after logout

  const handleLogout = () => {
    // Clear localStorage (for id and token)
    localStorage.removeItem("id");
    localStorage.removeItem("token");

    // Dispatch the logout action
    dispatch(authActions.logout());

    // Optionally, navigate the user to the login page (or home page)
    navigate("/"); // <-- Assuming your login route is '/login'
  };

  return (
    <div className="bg-zinc-800 p-4 rounded flex flex-col items-center justify-between h-[100%]">
      <div className="flex items-center flex-col justify-center">
        <img src={data.avatar} className="h-[12vh]" />
        <p className="mt-3 text-xl text-zinc-100 font-semibold">{data.username}</p>
        <p className="mt-1 text-normal text-zinc-300">{data.email}</p>
        <div className="w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block"></div>
      </div>
      <div className="w-full flex-col items-center justify-center hidden lg:flex">
        <Link
          to="/profile"
          className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300"
        >
          Favourites
        </Link>
        <Link
          to="/profile/orderHistory"
          className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300"
        >
          Order History
        </Link>
        <Link
          to="/profile/settings"
          className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300"
        >
          Settings
        </Link>
      </div>
      <button
        onClick={handleLogout} // <-- Add the click handler
        className="bg-zinc-900 w-3/6 lg:w-full mt-4 lg:mt-0 text-white font-semibold flex items-center justify-center py-2 rounded hover:bg-white hover:text-black transition-all duration-300"
      >
        Log Out
        <FaSignOutAlt className="ms-4" />
      </button>
    </div>
  );
};

export default Sidebar;
