import React, { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "./AuthProvider";
import { Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";


const MyFavorites = () => {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;
    fetch(`https://showcase-server.vercel.app/favorites?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setFavorites(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user]);

  const handleUnfavorite = (id) => {
    if (!window.confirm("Remove from favorites?")) return;
    fetch(`https://showcase-server.vercel.app/favorites/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then(() => {
        toast.success("Removed from favorites!");
        setFavorites(favorites.filter((fav) => fav._id !== id));
      })
      .catch(() => toast.error("Failed to remove favorite"));
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <Toaster />
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">❤️ My Favorites</h1>

        {favorites.length === 0 ? (
          <p className="text-center text-gray-500">No favorites yet. Go explore artworks!</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((fav) => (
              <div key={fav._id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg">
                <img
                  src={fav.artwork.image}
                  alt={fav.artwork.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <h3 className="text-lg font-semibold mt-3">{fav.artwork.title}</h3>
                <p className="text-sm text-gray-600">by {fav.artwork.userName || "Unknown Artist"}</p>
                <p className="text-sm text-gray-500 mb-3">Category: {fav.artwork.category}</p>

                <div className="flex gap-2">
                  <Link to={`/artwork/${fav.artwork._id}`} className="w-full">
                    <button className="bg-yellow-500 text-white w-full py-1 rounded-md hover:bg-yellow-600">
                      View Details
                    </button>
                  </Link>
                  <button
                    onClick={() => handleUnfavorite(fav._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                  >
                    Unfavorite
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyFavorites;
