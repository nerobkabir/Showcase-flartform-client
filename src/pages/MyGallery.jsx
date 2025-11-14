import React, { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import { AuthContext } from "./AuthProvider";
import LoadingSpinner from "./LoadingSpinner";

const MyGallery = () => {
  const { user } = useContext(AuthContext);
  const [myArtworks, setMyArtworks] = useState([]);
  const [selectedArt, setSelectedArt] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔶 Fetch user's artworks
  useEffect(() => {
    if (!user?.email) return;
    fetch(`https://showcase-server.vercel.app/my-artworks?email=${user.email}`)
      .then(res => res.json())
      .then(data => {
        setMyArtworks(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user]);

  // 🔶 Delete artwork with SweetAlert
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to undo this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e74c3c",
      cancelButtonColor: "#95a5a6",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://showcase-server.vercel.app/artworks/${id}`, {
          method: "DELETE",
        })
          .then(res => res.json())
          .then(() => {
            setMyArtworks(myArtworks.filter(art => art._id !== id));

            Swal.fire({
              title: "Deleted!",
              text: "Your artwork has been removed.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false
            });
          })
          .catch(() => toast.error("Failed to delete artwork"));
      }
    });
  };

  // 🔶 Update artwork (SweetAlert success)
  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedArtwork = {
      title: form.title.value,
      category: form.category.value,
      medium: form.medium.value,
      price: form.price.value,
      description: form.description.value,
      visibility: form.visibility.value,
    };

    fetch(`https://showcase-server.vercel.app/artworks/${selectedArt._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedArtwork),
    })
      .then(res => res.json())
      .then(() => {
        setSelectedArt(null);

        // Update UI
        setMyArtworks(prev =>
          prev.map(art =>
            art._id === selectedArt._id ? { ...art, ...updatedArtwork } : art
          )
        );

        Swal.fire({
          title: "Updated!",
          text: "Artwork has been updated successfully.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false
        });
      })
      .catch(() => toast.error("Failed to update artwork"));
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <Toaster />
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          🎨 My Gallery
        </h1>

        {myArtworks.length === 0 ? (
          <p className="text-center text-gray-500">No artworks found.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {myArtworks.map((art) => (
              <div
                key={art._id}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg"
              >
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-48 object-cover rounded-lg"
                />

                <h3 className="text-lg font-semibold mt-3">{art.title}</h3>
                <p className="text-sm text-gray-600">
                  {art.category} • {art.medium}
                </p>
                <p className="text-sm text-gray-500">
                  Visibility: {art.visibility}
                </p>
                <p className="text-yellow-600 font-bold">
                  ${art.price || "N/A"}
                </p>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => setSelectedArt(art)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(art._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 🔶 Update Modal */}
      {selectedArt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-center">
              Update Artwork
            </h2>

            <form onSubmit={handleUpdate} className="space-y-3">
              <input
                type="text"
                name="title"
                defaultValue={selectedArt.title}
                required
                className="w-full border p-2 rounded-md"
              />

              <input
                type="text"
                name="category"
                defaultValue={selectedArt.category}
                required
                className="w-full border p-2 rounded-md"
              />

              <input
                type="text"
                name="medium"
                defaultValue={selectedArt.medium}
                required
                className="w-full border p-2 rounded-md"
              />

              <input
                type="number"
                name="price"
                defaultValue={selectedArt.price}
                className="w-full border p-2 rounded-md"
              />

              <textarea
                name="description"
                defaultValue={selectedArt.description}
                required
                className="w-full border p-2 rounded-md"
              ></textarea>

              <select
                name="visibility"
                defaultValue={selectedArt.visibility}
                className="w-full border p-2 rounded-md"
              >
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </select>

              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  onClick={() => setSelectedArt(null)}
                  className="bg-gray-400 text-white px-3 py-1 rounded-md"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyGallery;
