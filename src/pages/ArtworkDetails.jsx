import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const ArtworkDetails = () => {
  const { id } = useParams();
  
  const [artwork, setArtwork] = useState(null);
  const [artistInfo, setArtistInfo] = useState({ totalArtworks: 0 });
  const [relatedArtworks, setRelatedArtworks] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  
  // Demo user - replace with real auth later
  const user = { email: "demo@example.com", displayName: "Demo User" };

  useEffect(() => {
    fetch(`https://showcase-server.vercel.app/artworks/${id}`)
      .then(res => res.json())
      .then(data => {
        setArtwork(data);

        // Fetch artist info
        fetch(`https://showcase-server.vercel.app/artist/${data.userEmail}/artworks`)
          .then(res => res.json())
          .then(info => setArtistInfo(info))
          .catch(err => console.log(err));

        // Fetch related artworks (same category)
        fetch(`https://showcase-server.vercel.app/artworks?category=${data.category}`)
          .then(res => res.json())
          .then(related => {
            const filtered = related.filter(art => art._id !== id).slice(0, 4);
            setRelatedArtworks(filtered);
          })
          .catch(err => console.log(err));
      })
      .catch(err => {
        console.log("Failed to load artwork", err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load artwork details.",
          confirmButtonColor: "#f59e0b"
        });
      });
  }, [id]);

  const handleLike = () => {
    fetch(`https://showcase-server.vercel.app/artworks/${id}/like`, {
      method: "PATCH"
    })
      .then(res => res.json())
      .then(() => {
        setArtwork(prev => ({ ...prev, likes: (prev.likes || 0) + 1 }));
        
        Swal.fire({
          icon: "success",
          title: "Liked! ❤️",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          background: "#fff",
          iconColor: "#ef4444"
        });
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Failed to like artwork. Please try again.",
          confirmButtonColor: "#f59e0b"
        });
      });
  };

  const handleAddToFavorites = () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to add favorites!",
        confirmButtonColor: "#f59e0b"
      });
      return;
    }

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
          Swal.fire({
            icon: "info",
            title: "Already Saved",
            text: "Already added to favorites!",
            confirmButtonColor: "#f59e0b"
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "Added to Favorites! ❤️",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            background: "#fff",
            iconColor: "#f59e0b"
          });
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to add favorite. Try again later.",
          confirmButtonColor: "#f59e0b"
        });
      });
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to review!",
        confirmButtonColor: "#f59e0b"
      });
      return;
    }
    
    const review = {
      ...newReview,
      userName: user.displayName,
      userEmail: user.email,
      date: new Date().toISOString()
    };
    
    setReviews([review, ...reviews]);
    setNewReview({ rating: 5, comment: "" });

    Swal.fire({
      icon: "success",
      title: "Thank You!",
      text: "Review submitted successfully!",
      confirmButtonColor: "#f59e0b",
      timer: 2000,
      showConfirmButton: false
    });
  };

  if (!artwork) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading artwork...</p>
        </div>
      </div>
    );
  }

  const images = artwork.images || [artwork.image];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
          <a href="/" className="hover:text-yellow-600 transition-colors">Home</a>
          <span>/</span>
          <a href="/explore" className="hover:text-yellow-600 transition-colors">Explore</a>
          <span>/</span>
          <span className="text-gray-900 font-semibold">{artwork.title}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Left: Images Section */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <img
                src={images[selectedImage]}
                alt={artwork.title}
                className="w-full h-[500px] object-cover"
              />
            </div>

            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`rounded-xl overflow-hidden border-4 transition-all ${
                      selectedImage === idx
                        ? "border-yellow-400 shadow-lg"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-24 object-cover" />
                  </button>
                ))}
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={handleLike}
                className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-4 rounded-xl hover:from-red-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl font-bold flex items-center justify-center gap-2"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                Like ({artwork.likes || 0})
              </button>

              <button
                onClick={handleAddToFavorites}
                className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-6 py-4 rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all shadow-lg hover:shadow-xl font-bold flex items-center justify-center gap-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                Save to Favorites
              </button>
            </div>
          </div>

          {/* Right: Details Section */}
          <div className="space-y-6">
            {/* Overview Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-bold rounded-full">
                    {artwork.category}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-yellow-500">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  <span className="font-bold text-gray-800">{artwork.rating || "4.8"}</span>
                </div>
              </div>

              <h1 className="text-4xl font-black text-gray-900 mb-4">{artwork.title}</h1>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                {artwork.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span className="text-sm font-medium">Views</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{artwork.views || "1.2k"}</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                    <span className="text-sm font-medium">Likes</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{artwork.likes || 0}</p>
                </div>
              </div>
            </div>

            {/* Key Information Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Artwork Specifications
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Medium</span>
                  <span className="text-gray-900 font-bold">{artwork.medium || "Digital Art"}</span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Year Created</span>
                  <span className="text-gray-900 font-bold">{artwork.year || new Date().getFullYear()}</span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-gray-600 font-medium">Dimensions</span>
                  <span className="text-gray-900 font-bold">{artwork.dimensions || "1920 x 1080 px"}</span>
                </div>

                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-600 font-medium">Availability</span>
                  <span className="px-3 py-1 bg-green-100 text-green-700 font-bold rounded-full text-sm">
                    {artwork.status || "Available"}
                  </span>
                </div>
              </div>
            </div>

            {/* Artist Info Card */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Artist Information
              </h2>

              <div className="space-y-3">
                <p className="text-xl font-bold text-yellow-400">{artwork.userName}</p>
                <p className="text-gray-300">{artwork.userEmail}</p>
                <div className="pt-4 border-t border-gray-700">
                  <div className="flex items-center gap-2 text-gray-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Total Artworks: <strong className="text-white">{artistInfo.totalArtworks}</strong></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            Reviews & Ratings
          </h2>

          <div className="mb-8 bg-gray-50 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 mb-4">Leave a Review</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setNewReview({ ...newReview, rating: star })}
                    className="text-3xl focus:outline-none transition-transform hover:scale-110"
                  >
                    <span className={star <= newReview.rating ? "text-yellow-400" : "text-gray-300"}>★</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Comment</label>
              <textarea
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-yellow-400 focus:outline-none resize-none"
                rows="4"
                placeholder="Share your thoughts about this artwork..."
              ></textarea>
            </div>

            <button
              onClick={handleSubmitReview}
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 px-6 py-3 rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all font-bold shadow-lg"
            >
              Submit Review
            </button>
          </div>

          {reviews.length > 0 ? (
            <div className="space-y-6">
              {reviews.map((review, idx) => (
                <div key={idx} className="border-b border-gray-200 pb-6 last:border-0">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-bold text-gray-900">{review.userName}</p>
                      <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
                    </div>
                    <div className="flex text-yellow-400 text-lg">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>{i < review.rating ? "★" : "☆"}</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">No reviews yet. Be the first to review!</p>
          )}
        </div>

        {/* Related Artworks Section */}
        {relatedArtworks.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Related Artworks
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedArtworks.map((art) => (
                <a
                  key={art._id}
                  href={`/artwork/${art._id}`}
                  className="group bg-gray-50 rounded-xl overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 line-clamp-1 group-hover:text-yellow-600">
                      {art.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{art.userName}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtworkDetails;