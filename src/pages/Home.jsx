import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const Home = () => {
  const [featuredArtworks, setFeaturedArtworks] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ artworks: 0, artists: 0, categories: 0, likes: 0 });

  useEffect(() => {
    fetch("https://showcase-server.vercel.app/artworks?visibility=Public")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 6);
        setFeaturedArtworks(sorted);
        
        // Calculate stats
        setStats({
          artworks: data.length,
          artists: new Set(data.map(a => a.userEmail)).size,
          categories: new Set(data.map(a => a.category)).size,
          likes: data.reduce((sum, art) => sum + (art.likes || 0), 0)
        });
        
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    setTopArtists([
      { name: "Kabir Hossain", artworks: 12, avatar: "KH" },
      { name: "Shaheen Ahamed", artworks: 8, avatar: "SA" },
      { name: "Abdullah Omor", artworks: 10, avatar: "AO" },
      { name: "Shakib", artworks: 6, avatar: "SK" },
    ]);
  }, []);

  const categories = [
    { name: "Painting", icon: "🎨", count: 45 },
    { name: "Sculpture", icon: "🗿", count: 32 },
    { name: "Digital Art", icon: "💻", count: 58 },
    { name: "Photography", icon: "📷", count: 67 },
    { name: "Mixed Media", icon: "🖼️", count: 28 },
    { name: "Abstract", icon: "🌈", count: 41 },
  ];

  const testimonials = [
    { name: "Sarah Chen", role: "Digital Artist", text: "This platform has transformed how I share my work. The community is incredibly supportive!", rating: 5 },
    { name: "Michael Rivera", role: "Photographer", text: "I've connected with so many talented artists here. It's my go-to platform for inspiration.", rating: 5 },
    { name: "Emma Thompson", role: "Sculptor", text: "The visibility I've gained here is amazing. I've sold multiple pieces through connections made on this platform.", rating: 5 },
  ];

  const features = [
    { icon: "🚀", title: "Easy Upload", desc: "Share your artwork in seconds with our intuitive interface" },
    { icon: "🌍", title: "Global Reach", desc: "Connect with art lovers and collectors worldwide" },
    { icon: "💖", title: "Community Support", desc: "Get feedback and appreciation from fellow artists" },
    { icon: "🎯", title: "Smart Discovery", desc: "Advanced search and filtering to find your style" },
    { icon: "🔒", title: "Privacy Control", desc: "Choose who sees your work with visibility settings" },
    { icon: "📊", title: "Analytics", desc: "Track views, likes, and engagement on your portfolio" },
  ];

  const blogPosts = [
    { title: "10 Tips for Digital Artists", date: "Dec 28, 2024", image: "https://images.unsplash.com/photo-1561998338-13ad7883b20f?w=400" },
    { title: "Color Theory in Modern Art", date: "Dec 25, 2024", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400" },
    { title: "Building Your Art Portfolio", date: "Dec 22, 2024", image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Carousel Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <Swiper
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          effect="fade"
          spaceBetween={0}
          centeredSlides={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true, dynamicBullets: true }}
          navigation
          className="w-full h-full"
        >
          {featuredArtworks.slice(0, 3).map((art, idx) => (
            <SwiperSlide key={art._id}>
              <div className="relative w-full h-full">
                <div 
                  className="absolute inset-0 bg-cover bg-center transform scale-110 animate-ken-burns"
                  style={{ backgroundImage: `url(${art.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
                <div className="relative h-full flex items-center max-w-7xl mx-auto px-6">
                  <div className="text-white max-w-2xl animate-fade-in-up">
                    <span className="inline-block bg-yellow-500 text-sm px-4 py-1 rounded-full mb-4 animate-bounce-gentle">
                      Featured Artwork
                    </span>
                    <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
                      {art.title}
                    </h1>
                    <p className="text-xl md:text-2xl mb-2 opacity-90">
                      by {art.userName || "Unknown Artist"}
                    </p>
                    <p className="text-lg mb-6 opacity-80">
                      {art.description || "Discover amazing artwork from talented creators"}
                    </p>
                    <Link to={`/artwork/${art._id}`}>
                      <button className="group bg-yellow-500 px-8 py-4 rounded-full hover:bg-yellow-600 text-white font-semibold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-2xl">
                        Explore Now
                        <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-scroll-down"></div>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 animate-fade-in">
            Welcome to ArtShowcase
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            A vibrant community where artists showcase their creativity and art enthusiasts discover inspiring masterpieces from around the world.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/all-artwork">
              <button className="bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-all transform hover:scale-105">
                Explore Gallery
              </button>
            </Link>
            <Link to="/add-artwork">
              <button className="border-2 border-gray-900 text-gray-900 px-8 py-3 rounded-full hover:bg-gray-900 hover:text-white transition-all transform hover:scale-105">
                Share Your Art
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-yellow-400 to-orange-500">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div className="transform hover:scale-110 transition-all">
              <div className="text-5xl font-bold mb-2">{stats.artworks}+</div>
              <div className="text-lg opacity-90">Artworks</div>
            </div>
            <div className="transform hover:scale-110 transition-all">
              <div className="text-5xl font-bold mb-2">{stats.artists}+</div>
              <div className="text-lg opacity-90">Artists</div>
            </div>
            <div className="transform hover:scale-110 transition-all">
              <div className="text-5xl font-bold mb-2">{stats.categories}+</div>
              <div className="text-lg opacity-90">Categories</div>
            </div>
            <div className="transform hover:scale-110 transition-all">
              <div className="text-5xl font-bold mb-2">{stats.likes}+</div>
              <div className="text-lg opacity-90">Likes</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center text-gray-800">
            Why Choose ArtShowcase?
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Everything you need to showcase and discover amazing art
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div 
                key={idx}
                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all transform hover:-translate-y-2 group"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="text-5xl mb-4 group-hover:scale-125 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Artworks Section */}
<section className="py-24 px-6 bg-white">
  <div className="max-w-7xl mx-auto">
    
    {/* Section Header */}
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        Featured Artworks
      </h2>
      <div className="w-24 h-1 bg-yellow-500 mx-auto mb-4 rounded-full"></div>
      <p className="text-gray-600 text-lg max-w-2xl mx-auto">
        Handpicked artworks from our most talented creators around the world
      </p>
    </div>

    {featuredArtworks.length === 0 ? (
      <p className="text-center text-gray-500 py-12">
        No featured artworks available at the moment.
      </p>
    ) : (
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {featuredArtworks.map((art) => (
          <div
            key={art._id}
            className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
          >
            {/* Image */}
            <div className="relative h-72 overflow-hidden">
              <img
                src={art.image}
                alt={art.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-500 flex items-end">
                <div className="p-6 text-white opacity-0 group-hover:opacity-100 translate-y-6 group-hover:translate-y-0 transition-all duration-500">
                  <h3 className="text-xl font-bold mb-1">
                    {art.title}
                  </h3>
                  <p className="text-sm opacity-90 mb-4">
                    by {art.userName || "Unknown Artist"}
                  </p>

                  <Link to={`/artwork/${art._id}`}>
                    <button className="bg-yellow-500 text-gray-900 px-5 py-2 rounded-full font-semibold hover:bg-yellow-400 transition">
                      View Details →
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                  {art.category}
                </span>
                <span className="text-sm text-gray-500">
                  ❤️ {art.likes || 0}
                </span>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {art.title}
              </h3>

              <p className="text-sm text-gray-600 mb-3">
                Artist: {art.userName || "Unknown"}
              </p>

              {art.price && (
                <p className="text-lg font-bold text-yellow-600">
                  ৳ {art.price}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    )}

    {/* View All Button */}
    <div className="text-center mt-16">
      <Link to="/explore">
        <button className="bg-gray-900 text-white px-10 py-4 rounded-full hover:bg-gray-800 transition-all transform hover:scale-105 font-semibold">
          View All Artworks
        </button>
      </Link>
    </div>
  </div>
</section>


      {/* Categories Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center text-gray-800">
            Explore by Category
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Find art that matches your style and interest
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((cat, idx) => (
              <Link key={idx} to={`/all-artwork?category=${cat.name}`}>
                <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-2 text-center group cursor-pointer">
                  <div className="text-5xl mb-3 group-hover:scale-125 transition-transform">
                    {cat.icon}
                  </div>
                  <h3 className="font-bold text-gray-800 mb-1">{cat.name}</h3>
                  <p className="text-sm text-gray-500">{cat.count} works</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Top Artists Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center text-gray-800">
            🏆 Top Artists of the Week
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Meet the most active and celebrated artists in our community
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {topArtists.map((artist, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-8 shadow-md hover:shadow-xl text-center transform hover:-translate-y-2 transition-all group"
              >
                <div className="relative inline-block mb-4">
                  <div className="h-28 w-28 mx-auto rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 text-white flex items-center justify-center text-4xl font-bold group-hover:scale-110 transition-transform shadow-lg">
                    {artist.avatar}
                  </div>
                  {index === 0 && (
                    <div className="absolute -top-2 -right-2 bg-yellow-500 text-white rounded-full p-2 shadow-lg">
                      👑
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{artist.name}</h3>
                <p className="text-gray-600 mb-3">{artist.artworks} Artworks</p>
                <button className="text-yellow-600 hover:text-yellow-700 font-semibold">
                  View Profile →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">
            What Artists Say About Us
          </h2>
          <p className="text-center opacity-80 mb-12 text-lg">
            Join thousands of satisfied artists worldwide
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((test, idx) => (
              <div 
                key={idx}
                className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl hover:bg-white/20 transition-all transform hover:-translate-y-2"
              >
                <div className="text-yellow-400 text-2xl mb-4">
                  {"⭐".repeat(test.rating)}
                </div>
                <p className="text-lg mb-6 italic">"{test.text}"</p>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-yellow-500 flex items-center justify-center text-xl font-bold mr-4">
                    {test.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold">{test.name}</h4>
                    <p className="text-sm opacity-80">{test.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog/Articles Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center text-gray-800">
            Latest from Our Blog
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Tips, tutorials, and inspiration for artists
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:-translate-y-2 group"
              >
                <div className="relative overflow-hidden h-48">
                  <img 
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-2">{post.date}</p>
                  <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-yellow-600 transition-colors">
                    {post.title}
                  </h3>
                  <button className="text-yellow-600 hover:text-yellow-700 font-semibold">
                    Read More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-yellow-400 to-orange-500">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-4">
            Stay Updated with Art Trends
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Subscribe to our newsletter for weekly inspiration and exclusive content
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input 
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-4 focus:ring-white/50"
            />
            <button className="bg-gray-900 text-white px-8 py-4 rounded-full hover:bg-gray-800 transition-all transform hover:scale-105 font-semibold">
              Subscribe
            </button>
          </div>
          <p className="text-sm mt-4 opacity-80">
            Join 10,000+ artists receiving weekly updates
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Showcase Your Art?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join our creative community today and share your masterpieces with the world
          </p>
          <Link to="/register">
            <button className="bg-yellow-500 text-gray-900 px-12 py-4 rounded-full hover:bg-yellow-400 transition-all transform hover:scale-105 font-bold text-lg shadow-2xl">
              Get Started Free
            </button>
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center text-gray-800">
            Frequently Asked Questions
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Everything you need to know about ArtShowcase
          </p>
          <div className="space-y-4">
            {[
              { q: "How do I upload my artwork?", a: "Simply sign up, go to 'Add Artwork', fill in the details, and upload your image. It's that easy!" },
              { q: "Is ArtShowcase free to use?", a: "Yes! Creating an account and uploading your artwork is completely free." },
              { q: "Can I sell my artwork on the platform?", a: "Currently, we focus on showcasing art. However, you can connect with potential buyers through your profile." },
              { q: "How do I gain more visibility?", a: "Engage with the community, upload regularly, use relevant categories, and share your work on social media." },
            ].map((faq, idx) => (
              <details 
                key={idx}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all group"
              >
                <summary className="font-bold text-lg text-gray-800 cursor-pointer list-none flex justify-between items-center">
                  {faq.q}
                  <span className="text-yellow-500 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-4 text-gray-600">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes ken-burns {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        
        .animate-ken-burns {
          animation: ken-burns 20s ease-out infinite alternate;
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }
        
        @keyframes scroll-down {
          0% { transform: translateY(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(20px); opacity: 0; }
        }
        
        .animate-scroll-down {
          animation: scroll-down 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;