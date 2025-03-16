/*import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BookCard = ({ data, favourite }) => {
  const headers={
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
    bookid:data._id,
  };
  const handleRemoveBook=async()=>{
    const response=await axios.put("http://localhost:1000/api/v1/del-fav",{},{headers});
    alert(response.data.message);
     // Call the removeFromFavourites function passed from the parent component
     //removeFromFavourites(data._id);
     
    
  };
  

  
  return (
    <div className="bg-zinc-800 rounded p-4 flex flex-col">  
      <Link to={`/view-book-details/${data._id}`}>
        <div className="">
          <div className="bg-zinc-900 rounded flex items-center justify-center">
            <img src={data.url} alt="/" className="h-[50vh]" />
          </div>
          <h2 className="mt-4 text-xl text-white font-semibold">{data.title}</h2>
          <p className="mt-2 text-zinc-400 font-semibold">by {data.author}</p>
          <p className="mt-2 text-zinc-200 font-semibold text-xl">
            ₹ {data.price}
          </p>
        </div>
      </Link>

      {favourite && (
        <button 
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded border border-blue-500 mt-4 transition-all duration-300"
          onClick={handleRemoveBook}
        >
          Remove from Favourites
        </button>
      )}
    </div>
  );
};

export default BookCard;*/
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BookCard = ({ data, favourite, removeFromFavourites }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  };

  const handleRemoveBook = async () => {
    try {
      // Remove the book from favourites on the backend
      const response = await axios.put("http://localhost:1000/api/v1/del-fav", {}, { headers });
      alert(response.data.message);

      // Call the removeFromFavourites function passed from the parent (Favourites component)
      removeFromFavourites(data._id);  // Remove only the clicked book
    } catch (error) {
      console.error("Error removing book from favourites:", error);
      alert("There was an error removing the book from your favourites.");
    }
  };

  return (
    <div className="bg-zinc-800 rounded p-4 flex flex-col">  
      <Link to={`/view-book-details/${data._id}`}>
        <div>
          <div className="bg-zinc-900 rounded flex items-center justify-center">
            <img src={data.url} alt="/" className="h-[50vh]" />
          </div>
          <h2 className="mt-4 text-xl text-white font-semibold">{data.title}</h2>
          <p className="mt-2 text-zinc-400 font-semibold">by {data.author}</p>
          <p className="mt-2 text-zinc-200 font-semibold text-xl">
            ₹ {data.price}
          </p>
        </div>
      </Link>

      {favourite && (
        <button 
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded border border-blue-500 mt-4 transition-all duration-300"
          onClick={handleRemoveBook}
        >
          Remove from Favourites
        </button>
      )}
    </div>
  );
};

export default BookCard;

