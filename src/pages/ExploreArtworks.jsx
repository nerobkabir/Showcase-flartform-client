import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";

const ExploreArtworks = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState("");
  const [dateSort, setDateSort] = useState(""); 
  const [likesSort, setLikesSort] = useState(""); 
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const ITEMS_PER_PAGE = 12;

  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearch(value);
      setCurrentPage(1);
    }, 300),
    []
  );

  const fetchArtworks = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      let url = `https://showcase-server.vercel.app/artworks?search=${search}&category=${category}&page=${page}&limit=${ITEMS_PER_PAGE}`;
      
      if (rating) url += `&minRating=${rating}`;
      if (dateSort === "newest") url += "&sort=date:desc";
      if (dateSort === "oldest") url += "&sort=date:asc";
      if (likesSort === "most") url += "&sort=likes:desc";
      if (likesSort === "least") url += "&sort=likes:asc";

      const res = await fetch(url);
      const data = await res.json();
      
      setArtworks(data);
      setTotalCount(data.length); 
      setTotalPages(Math.ceil(data.length / ITEMS_PER_PAGE));
    } catch (err) {
      console.error("Error fetching artworks:", err);
    } finally {
      setLoading(false);
    }
  }, [search, category, rating, dateSort, likesSort]);

  useEffect(() => {
    fetch("https://showcase-server.vercel.app/artworks")
      .then((res) => res.json())
      .then((data) => {
        const cats = [...new Set(data.map((a) => a.category).filter(Boolean))];
        setCategories(cats);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetchArtworks(1);
  }, [fetchArtworks]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, category, rating, dateSort, likesSort]);

  const resetFilters = () => {
    setSearch("");
    setCategory("");
    setRating("");
    setDateSort("");
    setLikesSort("");
    setCurrentPage(1);
  };

  const SkeletonCard = () => (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse h-[420px]">
      <div className="w-full h-56 bg-gradient-to-r from-gray-200 to-gray-300"></div>
      <div className="p-6 space-y-3">
        <div className="h-6 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="flex gap-3 pt-3">
          <div className="h-5 bg-gray-200 rounded w-16"></div>
          <div className="h-5 bg-gray-200 rounded w-12"></div>
        </div>
        <div className="h-10 bg-gray-300 rounded-xl mt-4"></div>
      </div>
    </div>
  );

  const Pagination = () => (
    <div className="flex items-center justify-between mt-12 mb-16">
      <div className="text-sm text-gray-600 font-medium">
        Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
        {Math.min(currentPage * ITEMS_PER_PAGE, totalCount)} of {totalCount} artworks
      </div>
      
      <div className="flex items-center gap-2">
        <button
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md"
        >
          Previous
        </button>
        
        <div className="flex gap-1">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const pageNum = currentPage <= 3 
              ? i + 1 
              : currentPage >= totalPages - 2 
              ? totalPages - 4 + i 
              : currentPage - 2 + i;
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`px-3 py-2 text-sm font-semibold rounded-lg transition-all shadow-sm ${
                  currentPage === pageNum
                    ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 shadow-lg"
                    : "text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover:shadow-md"
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>
        
        <button
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md"
        >
          Next
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-gray-100">
      <div className="bg-gradient-to-r from-slate-900 via-gray-900 to-slate-900 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block mb-6 p-2 bg-gradient-to-br from-yellow-400/20 to-yellow-500/20 rounded-2xl backdrop-blur-sm">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center shadow-2xl shadow-yellow-500/30">
              <svg className="w-8 h-8 text-slate-900" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 2.18l8 4V17c0 4.52-3.13 8.74-8 9.86-4.87-1.12-8-5.34-8-9.86V8.18l8-4z"/>
              </svg>
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-400 bg-clip-text text-transparent drop-shadow-2xl">
            Explore Artworks
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Discover breathtaking artworks from talented artists worldwide. Filter, sort, and find your perfect piece.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-10">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 mb-12 border border-white/50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by title or artist..."
                onChange={(e) => debouncedSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-slate-200 focus:border-yellow-400 focus:outline-none focus:ring-4 focus:ring-yellow-400/20 transition-all text-slate-800 placeholder-slate-400 bg-slate-50/50"
              />
            </div>

            <div className="relative">
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-12 pr-10 py-4 rounded-2xl border-2 border-slate-200 focus:border-yellow-400 focus:outline-none focus:ring-4 focus:ring-yellow-400/20 transition-all text-slate-800 appearance-none bg-slate-50/50"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div className="relative">
              <select
                value={rating}
                onChange={(e) => {
                  setRating(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-12 pr-10 py-4 rounded-2xl border-2 border-slate-200 focus:border-yellow-400 focus:outline-none focus:ring-4 focus:ring-yellow-400/20 transition-all text-slate-800 appearance-none bg-slate-50/50"
              >
                <option value="">All Ratings</option>
                <option value="4">4+ Stars</option>
                <option value="3">3+ Stars</option>
              </select>
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <select
                value={dateSort}
                onChange={(e) => {
                  setDateSort(e.target.value);
                  setLikesSort("");
                  setCurrentPage(1);
                }}
                className="w-full py-4 px-3 rounded-xl border-2 border-slate-200 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 transition-all text-slate-800 bg-slate-50/50"
              >
                <option value="">Date</option>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
              <select
                value={likesSort}
                onChange={(e) => {
                  setLikesSort(e.target.value);
                  setDateSort("");
                  setCurrentPage(1);
                }}
                className="w-full py-4 px-3 rounded-xl border-2 border-slate-200 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/20 transition-all text-slate-800 bg-slate-50/50"
              >
                <option value="">Likes</option>
                <option value="most">Most Liked</option>
                <option value="least">Least Liked</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-6 border-t border-slate-100">
            {!loading && (
              <p className="text-sm text-slate-600 font-semibold">
                {totalCount} {totalCount === 1 ? "artwork" : "artworks"} found
                {(search || category || rating) && (
                  <span className="ml-2 text-xs bg-slate-200 px-2 py-1 rounded-full">
                    {search && `"${search}"`} {category && `• ${category}`} {rating && `• ${rating}+`}
                  </span>
                )}
              </p>
            )}
            
            {(search || category || rating || dateSort || likesSort) && (
              <button
                onClick={resetFilters}
                className="px-6 py-3 bg-gradient-to-r from-slate-200 to-slate-300 hover:from-slate-300 hover:to-slate-400 text-slate-800 font-bold rounded-2xl transition-all shadow-md hover:shadow-lg flex items-center gap-2 text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear All Filters
              </button>
            )}
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 pb-20">
          {loading ? (
            Array(ITEMS_PER_PAGE).fill().map((_, i) => <SkeletonCard key={i} />)
          ) : artworks.length === 0 ? (
            <div className="col-span-full text-center py-24">
              <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-slate-200 to-slate-300 rounded-3xl flex items-center justify-center">
                <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-4">No artworks found</h3>
              <p className="text-xl text-slate-500 mb-8 max-w-md mx-auto">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <button
                onClick={resetFilters}
                className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 font-black text-lg rounded-2xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 mx-auto"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.536-1.536a4 4 0 005.656 0l1.536-1.536a4 4 0 00-5.656-5.656l-1.536 1.536z" />
                </svg>
                Show All Artworks
              </button>
            </div>
          ) : (
            artworks.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE).map((art) => (
              <Link
                key={art._id}
                to={`/artwork/${art._id}`}
                className="group bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-3xl overflow-hidden hover:-translate-y-2 transition-all duration-500 flex flex-col h-[440px] border border-white/50 hover:border-yellow-200/50"
              >
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-4 py-2 bg-white/95 backdrop-blur-md text-slate-800 text-xs font-bold rounded-2xl shadow-2xl border border-white/50">
                      {art.category}
                    </span>
                  </div>
                </div>

                <div className="p-7 flex flex-col flex-1">
                  <h3 className="text-xl font-black text-slate-900 mb-3 line-clamp-2 group-hover:text-yellow-600 transition-colors duration-300 leading-tight">
                    {art.title}
                  </h3>
                  
                  <p className="text-sm text-slate-600 mb-4 flex items-center gap-2 line-clamp-2">
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {art.userName || "Unknown Artist"}
                  </p>

                  <div className="flex items-center gap-4 mb-6 text-sm">
                    <div className="flex items-center gap-1.5 text-rose-500 font-bold">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                      {art.likes || 0}
                    </div>
                    {art.rating && (
                      <div className="flex items-center gap-1 text-yellow-500 font-bold">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                        {art.rating}
                      </div>
                    )}
                  </div>

                  <div className="mt-auto">
                    <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 group-hover:from-yellow-500 group-hover:to-yellow-600 text-slate-900 font-black py-4 px-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 text-sm uppercase tracking-wide">
                      <span>View Details</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}

          {totalPages > 1 && <Pagination />}
        </div>
      </div>
    </div>
  );
};

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default ExploreArtworks;