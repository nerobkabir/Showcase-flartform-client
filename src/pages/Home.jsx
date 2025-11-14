import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import LoadingSpinner from "./LoadingSpinner";

const Home = () => {
  const [featuredArtworks, setFeaturedArtworks] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [communityHighlights, setCommunityHighlights] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch latest 6 artworks (MongoDB sorted by createdAt desc)
  useEffect(() => {
    fetch("https://showcase-server.vercel.app/artworks?visibility=Public")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 6); // latest 6 artworks
        setFeaturedArtworks(sorted);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // ✅ Top Artists Section (static sample data)
  useEffect(() => {
    setTopArtists([
      { name: "Alice Johnson", artworks: 12 },
      { name: "Bob Smith", artworks: 8 },
      { name: "Clara Lee", artworks: 10 },
      { name: "David Kim", artworks: 6 },
    ]);
  }, []);

  // ✅ Community Highlights Section (static sample data)
  useEffect(() => {
    setCommunityHighlights([
      {
        title: "Community Mural Event",
        description: "Join artists to paint a city mural together.",
      },
      {
        title: "Digital Art Workshop",
        description: "Learn digital painting with top artists this weekend!",
      },
    ]);
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 🖼️ Banner/Slider */}
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        className="w-full h-[400px]"
      >
        {featuredArtworks.slice(0, 3).map((art) => (
          <SwiperSlide key={art._id}>
            <div
              style={{
                backgroundImage: `url(${art.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "400px",
                width: "100%",
              }}
              className="flex flex-col items-center justify-center text-white text-2xl md:text-3xl font-bold bg-black/30 p-4 text-center"
            >
              <p>{art.title}</p>
              <p className="text-sm mt-2">by {art.userName || "Unknown Artist"}</p>
              <Link to={`/artwork/${art._id}`}>
                <button className="mt-4 bg-yellow-500 px-4 py-2 rounded-md hover:bg-yellow-600 text-white">
                  View Artwork
                </button>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 🎨 Featured Artworks Section */}
      <div className="max-w-7xl mx-auto py-12 px-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          🎨 Featured Artworks
        </h2>
        {featuredArtworks.length === 0 ? (
          <p className="text-gray-500 text-center">No artworks found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            {featuredArtworks.map((art) => (
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
                  <h3 className="text-lg font-bold text-gray-800">{art.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    by {art.userName || "Unknown Artist"}
                  </p>
                  <p className="text-sm text-gray-500 mb-4">
                    Category: {art.category}
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

      {/* 🏆 Top Artists of the Week */}
      <div className="bg-gray-200 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            🏆 Top Artists of the Week
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {topArtists.map((artist, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg text-center"
              >
                <div className="h-24 w-24 mx-auto rounded-full bg-yellow-400 text-white flex items-center justify-center text-3xl font-bold">
                  {artist.name.charAt(0)}
                </div>
                <h3 className="mt-2 font-semibold">{artist.name}</h3>
                <p className="text-gray-500">{artist.artworks} Artworks</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🌟 Community Highlights */}
      <div className="max-w-7xl mx-auto py-12 px-6">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          🌟 Community Highlights
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {communityHighlights.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg"
            >
              <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
