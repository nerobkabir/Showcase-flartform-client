import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { FiImage, FiHeart, FiThumbsUp, FiEye } from "react-icons/fi";

const DashboardOverview = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    totalArtworks: 0,
    totalFavorites: 0,
    totalLikes: 0,
    publicArtworks: 0,
    privateArtworks: 0
  });
  const [monthlyData, setMonthlyData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [recentArtworks, setRecentArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    console.log("Fetching dashboard data for:", user.email);

    // Fetch data from existing endpoints
    Promise.all([
      fetch(`https://showcase-server.vercel.app/my-artworks?email=${user.email}`).then(res => res.json()),
      fetch(`https://showcase-server.vercel.app/favorites?email=${user.email}`).then(res => res.json()),
    ])
      .then(([artworks, favorites]) => {
        console.log("Artworks:", artworks);
        console.log("Favorites:", favorites);

        // Calculate stats
        const totalLikes = artworks.reduce((sum, art) => sum + (art.likes || 0), 0);
        const publicArtworks = artworks.filter(art => art.visibility === 'Public').length;
        
        setStats({
          totalArtworks: artworks.length,
          totalFavorites: favorites.length,
          totalLikes: totalLikes,
          publicArtworks: publicArtworks,
          privateArtworks: artworks.length - publicArtworks
        });

        // Process monthly data
        const monthlyMap = {};
        artworks.forEach(art => {
          if (art.createdAt) {
            const month = new Date(art.createdAt).toLocaleString('default', { month: 'short' });
            monthlyMap[month] = (monthlyMap[month] || 0) + 1;
          }
        });
        
        const monthlyChart = Object.keys(monthlyMap).map(month => ({
          month,
          artworks: monthlyMap[month]
        }));
        setMonthlyData(monthlyChart);

        // Process category data
        const categoryMap = {};
        artworks.forEach(art => {
          if (art.category) {
            categoryMap[art.category] = (categoryMap[art.category] || 0) + 1;
          }
        });
        
        const categoryChart = Object.keys(categoryMap).map(category => ({
          name: category,
          value: categoryMap[category]
        }));
        setCategoryData(categoryChart);

        // Get recent artworks
        const sorted = [...artworks].sort((a, b) => {
          const dateA = new Date(a.createdAt || 0);
          const dateB = new Date(b.createdAt || 0);
          return dateB - dateA;
        }).slice(0, 10);
        setRecentArtworks(sorted);

        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      });
  }, [user]);

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Artworks</p>
              <h3 className="text-3xl font-bold mt-2">{stats.totalArtworks}</h3>
            </div>
            <FiImage size={40} className="opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Total Favorites</p>
              <h3 className="text-3xl font-bold mt-2">{stats.totalFavorites}</h3>
            </div>
            <FiHeart size={40} className="opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm">Total Likes</p>
              <h3 className="text-3xl font-bold mt-2">{stats.totalLikes}</h3>
            </div>
            <FiThumbsUp size={40} className="opacity-80" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Public Artworks</p>
              <h3 className="text-3xl font-bold mt-2">{stats.publicArtworks}</h3>
            </div>
            <FiEye size={40} className="opacity-80" />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart - Monthly Uploads */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Monthly Upload Trend</h2>
          {monthlyData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="artworks" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-400">
              <div className="text-center">
                <FiImage size={48} className="mx-auto mb-2 opacity-30" />
                <p>No artworks uploaded yet</p>
              </div>
            </div>
          )}
        </div>

        {/* Pie Chart - Category Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Category Distribution</h2>
          {categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-400">
              <div className="text-center">
                <FiImage size={48} className="mx-auto mb-2 opacity-30" />
                <p>No categories yet</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recent Artworks Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Recent Artworks</h2>
        </div>
        {recentArtworks.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Visibility</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Likes</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentArtworks.map((art) => (
                  <tr key={art._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <img src={art.image} alt={art.title} className="w-12 h-12 object-cover rounded" />
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{art.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{art.category}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${art.visibility === 'Public' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {art.visibility}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{art.likes || 0}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {art.createdAt ? new Date(art.createdAt).toLocaleDateString() : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-gray-400">
            <FiImage size={64} className="mx-auto mb-4 opacity-20" />
            <p className="text-lg font-medium mb-2">No artworks found</p>
            <p className="text-sm">Start creating some amazing artworks!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardOverview;