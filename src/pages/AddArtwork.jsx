import React, { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "./AuthProvider";

const AddArtwork = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleAddArtwork = (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const newArtwork = {
      image: form.image.value,
      title: form.title.value,
      category: form.category.value,
      medium: form.medium.value,
      description: form.description.value,
      dimensions: form.dimensions.value,
      price: form.price.value,
      visibility: form.visibility.value,
      userName: user?.displayName,
      userEmail: user?.email,
      createdAt: new Date().toISOString(),
    };

    fetch("http://localhost:3000/add-artwork", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newArtwork),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Artwork added successfully!");
        form.reset();
      })
      .catch(() => toast.error("Failed to add artwork"))
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Toaster />
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Artwork</h2>

        <form onSubmit={handleAddArtwork} className="space-y-4">
          <input type="text" name="image" placeholder="Image URL" required className="w-full p-2 border rounded-md" />
          <input type="text" name="title" placeholder="Title" required className="w-full p-2 border rounded-md" />
          <input type="text" name="category" placeholder="Category" required className="w-full p-2 border rounded-md" />
          <input type="text" name="medium" placeholder="Medium / Tools" required className="w-full p-2 border rounded-md" />
          <textarea name="description" placeholder="Description" required className="w-full p-2 border rounded-md"></textarea>
          <input type="text" name="dimensions" placeholder="Dimensions (optional)" className="w-full p-2 border rounded-md" />
          <input type="number" name="price" placeholder="Price (optional)" className="w-full p-2 border rounded-md" />

          <select name="visibility" required className="w-full p-2 border rounded-md">
            <option value="">Select Visibility</option>
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>

          {/* User Info - Read Only */}
          <input type="text" value={user?.displayName || ""} readOnly className="w-full p-2 border rounded-md bg-gray-100" />
          <input type="email" value={user?.email || ""} readOnly className="w-full p-2 border rounded-md bg-gray-100" />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-md"
          >
            {loading ? "Adding..." : "Add Artwork"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddArtwork;
