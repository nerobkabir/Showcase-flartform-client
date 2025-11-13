import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ExploreArtworks = () => {
  const [artworks, setArtworks] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false); // ✅ Added loading state

  // ✅ Fetch artworks (filtered by search + category)
  useEffect(() => {
    setLoading(true); // Start loading
    let url = `http://localhost:3000/artworks?search=${search}`;
    if (category) url += `&category=${category}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setArtworks(data))
      .catch((err) => console.error("Error fetching artworks:", err))
      .finally(() => setLoading(false)); // Stop loading
  }, [search, category]);

  // ✅ Fetch unique categories (once)
  useEffect(() => {
    fetch("http://localhost:3000/artworks")
      .then((res) => res.json())
      .then((data) => {
        const uniqueCategories = [...new Set(data.map((a) => a.category))];
        setCategories(uniqueCategories);
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          🎨 Explore Artworks
        </h1>

        {/* ✅ Search and Filter Section */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search by title or artist..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-1/2 p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          {/* ✅ Category Dropdown */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full sm:w-1/4 p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="">All Categories</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* ✅ Loading Spinner */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : artworks.length === 0 ? (
          <p className="text-center text-gray-600">No artworks found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {artworks.map((art) => (
              <div
                key={art._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
              >
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-800">
                    {art.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    by {art.userName || "Unknown Artist"}
                  </p>
                  <p className="text-sm text-gray-500 mb-2">
                    Category: {art.category}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    ❤️ {art.likes || 0} Likes
                  </p>
                  <Link to={`/artwork/${art._id}`}>
                    <button className="bg-yellow-500 text-white w-full py-2 rounded-md hover:bg-yellow-600">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreArtworks;
