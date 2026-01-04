import React, { useContext, useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { FiHome, FiImage, FiHeart, FiUser, FiLogOut, FiMenu, FiX, FiSettings } from "react-icons/fi";
import { AuthContext } from "./AuthProvider";

const DashboardLayout = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);

  const handleLogout = () => {
    logOut().then(() => {
      navigate("/login");
    });
  };

  const isActive = (path) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    return location.pathname.startsWith(path);
  };

  const menuItems = [
    { name: "Dashboard Home", path: "/dashboard", icon: <FiHome /> },
    { name: "My Gallery", path: "/dashboard/gallery", icon: <FiImage /> },
    { name: "My Favorites", path: "/dashboard/favorites", icon: <FiHeart /> },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:static inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white transition-transform duration-300 ease-in-out shadow-2xl`}>
        {/* Logo Section */}
        <div className="relative p-6 border-b border-gray-700/50">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-yellow-600/10"></div>
          <Link to="/" className="relative flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 p-2.5 rounded-xl shadow-lg">
                <svg className="w-6 h-6 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 2.18l8 4V17c0 4.52-3.13 8.74-8 9.86-4.87-1.12-8-5.34-8-9.86V8.18l8-4z"/>
                </svg>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-black bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                Artify
              </h2>
              <p className="text-[10px] font-medium text-gray-500 tracking-widest">DASHBOARD</p>
            </div>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="md:hidden absolute right-4 top-6 p-2 hover:bg-gray-700 rounded-lg transition-colors">
            <FiX size={20} />
          </button>
        </div>

        {/* User Profile Card */}
        <div className="p-4 mx-4 mt-4 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-700/50 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full blur-md opacity-50"></div>
              <img
                src={user?.photoURL || "https://via.placeholder.com/50"}
                alt="Profile"
                className="relative w-12 h-12 rounded-full border-2 border-yellow-400 object-cover"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-800"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">
                {user?.displayName || "User"}
              </p>
              <p className="text-xs text-gray-400 truncate">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-1 mt-2">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                isActive(item.path)
                  ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 shadow-lg shadow-yellow-500/30'
                  : 'text-gray-300 hover:bg-gray-800/50 hover:text-yellow-400'
              }`}
            >
              <span className={`text-xl transition-transform group-hover:scale-110 ${
                isActive(item.path) ? 'text-gray-900' : ''
              }`}>
                {item.icon}
              </span>
              <span className="font-semibold">{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-700/50 bg-gradient-to-t from-gray-900 to-transparent">
          <Link
            to="/dashboard/profile"
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group mb-2 ${
              isActive('/dashboard/profile')
                ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 shadow-lg shadow-yellow-500/30'
                : 'text-gray-300 hover:bg-gray-800/50 hover:text-yellow-400'
            }`}
          >
            <FiSettings className={`text-xl transition-transform group-hover:rotate-90 ${
              isActive('/dashboard/profile') ? 'text-gray-900' : ''
            }`} />
            <span className="font-semibold">Profile Settings</span>
          </Link>
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-300 group"
          >
            <FiLogOut className="text-xl transition-transform group-hover:translate-x-1" />
            <span className="font-semibold">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <header className="bg-white/80 backdrop-blur-xl shadow-lg border-b border-gray-200 z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <FiMenu size={24} className="text-gray-700" />
              </button>

              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  {location.pathname === '/dashboard' && 'Dashboard Overview'}
                  {location.pathname === '/dashboard/gallery' && 'My Gallery'}
                  {location.pathname === '/dashboard/favorites' && 'My Favorites'}
                  {location.pathname === '/dashboard/profile' && 'Profile Settings'}
                </h1>
                <p className="text-xs text-gray-500 mt-0.5">Welcome back, {user?.displayName?.split(' ')[0] || 'User'}!</p>
              </div>
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdown(!profileDropdown)}
                className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-100 transition-all duration-300 group"
              >
                <div className="relative">
                  <img
                    src={user?.photoURL || "https://via.placeholder.com/40"}
                    alt="Profile"
                    className="w-10 h-10 rounded-full border-2 border-yellow-400 object-cover shadow-md"
                  />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-bold text-gray-800">
                    {user?.displayName || "User"}
                  </p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <svg className={`w-4 h-4 text-gray-600 transition-transform ${profileDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {profileDropdown && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setProfileDropdown(false)} />
                  <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200 py-2 z-20 overflow-hidden">
                    {/* Header */}
                    <div className="px-4 py-3 bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <img
                          src={user?.photoURL || "https://via.placeholder.com/40"}
                          alt="Profile"
                          className="w-12 h-12 rounded-full border-2 border-yellow-400 object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-gray-800 truncate">
                            {user?.displayName || "User"}
                          </p>
                          <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <Link
                        to="/dashboard/profile"
                        onClick={() => setProfileDropdown(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gradient-to-r hover:from-yellow-50 hover:to-transparent transition-all"
                      >
                        <FiUser className="text-lg text-yellow-500" />
                        <span className="font-medium">Profile Settings</span>
                      </Link>
                      <Link
                        to="/dashboard"
                        onClick={() => setProfileDropdown(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-gray-700 hover:bg-gradient-to-r hover:from-yellow-50 hover:to-transparent transition-all"
                      >
                        <FiHome className="text-lg text-blue-500" />
                        <span className="font-medium">Dashboard Home</span>
                      </Link>
                    </div>

                    {/* Logout */}
                    <div className="border-t border-gray-100 pt-2">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-red-600 hover:bg-red-50 transition-all"
                      >
                        <FiLogOut className="text-lg" />
                        <span className="font-medium">Logout</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden animate-fadeIn"
        ></div>
      )}
    </div>
  );
};

export default DashboardLayout;