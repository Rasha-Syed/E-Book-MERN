/*import React from "react";
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

export default Sidebar;*/
import React from "react";
import { useNavigate,Link } from "react-router-dom";
import { FaSignOutAlt } from 'react-icons/fa'; // Sign-out icon
import { useDispatch } from "react-redux"; // Import useDispatch
import { authActions } from "../../store/auth"; // Import the authActions

const Sidebar = ({ data }) => {
  const dispatch = useDispatch(); // Initialize dispatch
  const navigate = useNavigate(); // For navigation after logout

  const handleLogout = () => {
    // Clear localStorage (for id and token)
    localStorage.removeItem("id");
    localStorage.removeItem("token");

    // Dispatch the logout action
    dispatch(authActions.logout());

    // Navigate the user to the login page (or home page)
    navigate("/"); // Assuming your login route is '/'
  };

  // Check if the user is an admin based on the `role` in `data`
  const isAdmin = data.role === "admin"; // Check if the user is admin

  return (
    <div className="bg-zinc-800 p-6 rounded-xl flex flex-col items-center justify-between h-full shadow-lg">
      <div className="flex flex-col items-center justify-center">
        <img src={data.avatar} alt="User Avatar" className="w-24 h-24 rounded-full border-2 border-zinc-500 mb-4" />
        <p className="text-2xl text-zinc-100 font-semibold">{data.username}</p>
        <p className="mt-1 text-normal text-zinc-400">{data.email}</p>
        <div className="w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block"></div>
      </div>

      <div className="w-full flex-col items-center justify-center mt-6">
        {/* For Normal Users: Show the Favourites Button */}
        {!isAdmin && (
          <Link
            to="/profile"
            className="text-zinc-100 font-semibold py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300 mb-2 w-full flex justify-center"
          >
            Favourites
          </Link>
        )}

        {/* Admin Profile: Show only Logout button */}
        {/*{isAdmin && (
          <div className="text-zinc-100 font-semibold text-center mb-4">
            <p className="text-xl">Hello, Admin!</p>
            <p className="text-sm text-zinc-400">You don't have any favourites, but you can manage users and books.</p>
          </div>
        )}*/}
      </div>

      <button
        onClick={handleLogout} // Add the click handler
        className="bg-zinc-900 w-full mt-6 text-white font-semibold flex items-center justify-center py-2 rounded hover:bg-white hover:text-black transition-all duration-300"
      >
        Log Out
        <FaSignOutAlt className="ms-4" />
      </button>
    </div>
  );
};

export default Sidebar;
