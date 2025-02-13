import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";

const UserOrderHistory = () => {
  const [OrderHistory, setOrderHistory] = useState(null); // Initial state set to null to handle loading state
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:1000/api/v1/order-history", { headers });
        setOrderHistory(response.data.data); 
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };
    fetch();
  }, []);

  return (
    <div className="h-screen">
      {!OrderHistory && 
        <Loader />}
        {OrderHistory && OrderHistory.length===0 && (
          <div className="h-[80vh] p-4 text-zinc-100">
            <div className="h-[100%] flex flex-col items-center justify-center">
              <h1 className="text-5xl font-semibold text-zinc-500 mb-8">
                No Order History 
              </h1>
              <img 
              src=""
              alt="" 
              className="h-[20vh] mb-8"/>

            </div>
          </div>
        )}
      
        
    </div>
  );
};

export default UserOrderHistory;
