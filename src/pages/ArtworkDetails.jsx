import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import LoadingSpinner from "./LoadingSpinner";
import { AuthContext } from "./AuthProvider";

const ArtworkDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [artwork, setArtwork] = useState(null);
  const [artistInfo, setArtistInfo] = useState({ totalArtworks: 0 });

  useEffect(() => {
    fetch(`https://showcase-server.vercel.app/artworks/${id}`)
      .then(res => res.json())
      .then(data => {
        setArtwork(data);

        fetch(`https://showcase-server.vercel.app/artist/${data.userEmail}/artworks`)
          .then(res => res.json())
          .then(info => setArtistInfo(info));
      })
      .catch(() => toast.error("Failed to load artwork details."));
  }, [id]);

  const handleLike = () => {
    fetch(`https://showcase-server.vercel.app/artworks/${id}/like`, {
      method: "PATCH"
    })
      .then(res => res.json())
      .then(() => {
        setArtwork(prev => ({ ...prev, likes: prev.likes + 1 }));

        Swal.fire({
          title: "Liked! ❤️",
          text: "You liked this artwork.",
          icon: "success",
          timer: 1200,
          showConfirmButton: false
        });
      })
      .catch(() => toast.error("Failed to like artwork"));
  };

  const handleAddToFavorites = () => {
    if (!user) return toast.error("Please login to add favorites!");

    const favorite = {
      userEmail: user.email,
      artworkId: id
    };

    fetch(`https://showcase-server.vercel.app/favorites`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(favorite)
    })
      .then(res => res.json())
      .then((data) => {
        if (data?.error) {
          return toast.error("Already added to favorites!");
        }

        Swal.fire({
          title: "Added! ❤️",
          text: "Artwork added to favorites!",
          icon: "success",
          timer: 1300,
          showConfirmButton: false
        });
      })
      .catch(() => toast.error("Failed to add favorite"));
  };

  if (!artwork) return <LoadingSpinner />;

  return (
    <div className="max-w-3xl mx-auto my-10 bg-white shadow-lg rounded-lg p-6">
      <Toaster />

      <img
        src={artwork.image}
        alt={artwork.title}
        className="w-full h-96 object-cover rounded-xl"
      />

      <h2 className="text-3xl font-bold mt-4">{artwork.title}</h2>
      <p className="text-gray-600 mt-2">{artwork.medium}</p>
      <p className="mt-4">{artwork.description}</p>

      <div className="mt-6 border-t pt-4">
        <h3 className="text-xl font-semibold">Artist Info</h3>
        <p className="text-gray-700">{artwork.userName}</p>
        <p className="text-sm text-gray-500">{artwork.userEmail}</p>
        <p className="text-sm text-gray-500">
          Total Artworks: {artistInfo.totalArtworks}
        </p>
      </div>

      <div className="flex gap-4 mt-6">
        <button
          onClick={handleLike}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          👍 Like ({artwork.likes})
        </button>

        <button
          onClick={handleAddToFavorites}
          className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700"
        >
          ❤️ Add to Favorites
        </button>
      </div>
    </div>
  );
};

export default ArtworkDetails;
