import React, { useState } from "react";
import axios from "axios";

const AddBook = () => {
  const [formData, setFormData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
  });

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://e-book-mern.onrender.com/api/v1/add-book", formData, { headers });
      alert(response.data.message);
      setFormData({ url: "", title: "", author: "", price: "", desc: "", language: "" });
    } catch (error) {
      console.error("Error adding book:", error);
      alert("An error occurred while adding the book.");
    }
  };

  return (
    <div className="bg-zinc-900 p-6 text-white flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-6">Add a New Book</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <input type="text" name="url" placeholder="Image URL" value={formData.url} onChange={handleChange} required className="w-full p-2 mb-4 bg-zinc-800 text-white"/>
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required className="w-full p-2 mb-4 bg-zinc-800 text-white"/>
        <input type="text" name="author" placeholder="Author" value={formData.author} onChange={handleChange} required className="w-full p-2 mb-4 bg-zinc-800 text-white"/>
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required className="w-full p-2 mb-4 bg-zinc-800 text-white"/>
        <textarea name="desc" placeholder="Description" value={formData.desc} onChange={handleChange} required className="w-full p-2 mb-4 bg-zinc-800 text-white"/>
        <input type="text" name="language" placeholder="Language" value={formData.language} onChange={handleChange} required className="w-full p-2 mb-4 bg-zinc-800 text-white"/>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 font-semibold rounded">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
