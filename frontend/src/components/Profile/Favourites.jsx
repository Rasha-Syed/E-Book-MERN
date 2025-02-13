import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../BookCard/BookCard";

const Favourites = () => {
  // Initialize FavouriteBooks as an empty array to avoid undefined errors
  const [FavouriteBooks, setFavouriteBooks] = useState([]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:1000/api/v1/get-fav", { headers });
        
        // Ensure that response.data.data is set to FavouriteBooks as an array
        if (response.data && Array.isArray(response.data.data)) {
          setFavouriteBooks(response.data.data);
        } else {
          setFavouriteBooks([]); // If not an array, set empty array
        }
      } catch (error) {
        console.error("Error fetching favourite books:", error);
        setFavouriteBooks([]); // Set empty array if there's an error
      }
    };

    fetch();
  }, []); // Only run this once on component mount

  return (
    <>
      {/* Only check FavouriteBooks.length if it's a valid array */}
      {Array.isArray(FavouriteBooks) && FavouriteBooks.length === 0 ? (
        <div className="text-5xl font-semibold h-[100%] text-zinc-500 flex items-center justify-center w-full">
          No Favourite Books
          <img
            src="https://th.bing.com/th/id/R.c9d2609368b34fe6808eddbfc20e0e75?rik=X1yyrJg1SJBKPQ&riu=http%3a%2f%2fclipart-library.com%2fimages_k%2fwhite-star-png-transparent-background%2fwhite-star-png-transparent-background-13.png&ehk=XqxR0dI%2bjhGZUUTtCusdOtQoXLzidHsdICRo1Tx8COE%3d&risl=&pid=ImgRaw&r=0"
            alt="star"
            className="h-[20vh] my-8"
          />
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {/* Render BookCard for each favourite book */}
          {FavouriteBooks.map((item, i) => (
            <div key={i}>
              <BookCard data={item} favourite={true} />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Favourites;
