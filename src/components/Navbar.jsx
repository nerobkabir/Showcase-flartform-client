import { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../pages/AuthProvider";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);
    if (savedMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setProfileOpen(false);
  }, [location]);

  const handleLogout = () => {
    logOut()
      .then(() => console.log("Logged out"))
      .catch(err => console.error(err));
    setProfileOpen(false);
  };

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  const navLinkClass = (path) => {
    const base = "relative px-4 py-2 rounded-lg transition-all duration-300 font-medium text-sm";
    return isActive(path)
      ? `${base} bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 shadow-lg shadow-yellow-500/30`
      : `${base} text-gray-300 dark:text-gray-200 hover:text-yellow-400 hover:bg-gray-800/50 dark:hover:bg-gray-700/50`;
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-gray-900/98 dark:bg-gray-950/98 backdrop-blur-xl shadow-2xl border-b border-gray-800 dark:border-gray-700"
            : "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 shadow-xl"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                <div className="relative bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 p-2 rounded-lg shadow-lg">
                  <svg className="w-7 h-7 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 2.18l8 4V17c0 4.52-3.13 8.74-8 9.86-4.87-1.12-8-5.34-8-9.86V8.18l8-4zM11 7v2h2V7h-2zm0 4v6h2v-6h-2z"/>
                  </svg>
                </div>
              </div>
              <div>
                <div className="text-3xl font-black bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text text-transparent group-hover:from-yellow-200 group-hover:to-yellow-400 transition-all duration-300">
                  Artify
                </div>
                <div className="text-[10px] font-medium text-gray-500 dark:text-gray-400 group-hover:text-yellow-400 transition-colors tracking-widest">
                  SHOWCASE
                </div>
              </div>
            </Link>

            <div className="hidden md:flex items-center space-x-2 bg-gray-800/50 dark:bg-gray-900/70 backdrop-blur-sm px-3 py-2 rounded-full border border-gray-700/50 dark:border-gray-600/50">
              <Link to="/" className={navLinkClass("/")}>
                Home
              </Link>
              <Link to="/explore" className={navLinkClass("/explore")}>
                Explore
              </Link>
              <Link to="/about" className={navLinkClass("/about")}>About</Link>
              <Link to="/contact" className={navLinkClass("/contact")}>Contact</Link>
              

              {user && (
                <>
                  <Link to="/dashboard" className={navLinkClass("/dashboard")}>
                    Dashboard
                  </Link>
                  <Link to="/add" className={navLinkClass("/add")}>
                    Add Artwork
                  </Link>
                </>
              )}
            </div>

            <div className="hidden md:flex items-center space-x-3">
              <button
                onClick={toggleDarkMode}
                className="p-2.5 rounded-full bg-gray-800/50 dark:bg-gray-700/50 hover:bg-gray-700 dark:hover:bg-gray-600 transition-all border border-gray-700/50 dark:border-gray-600/50"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd"></path>
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                  </svg>
                )}
              </button>

              {!user ? (
                <>
                  <Link to="/login">
                    <button className="px-5 py-2.5 text-sm font-semibold text-gray-300 dark:text-gray-200 border-2 border-gray-700 dark:border-gray-600 rounded-full hover:border-yellow-400 hover:text-yellow-400 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/20">
                      Login
                    </button>
                  </Link>
                  <Link to="/register">
                    <button className="relative px-6 py-2.5 text-sm font-bold text-gray-900 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 shadow-lg shadow-yellow-500/50 hover:shadow-yellow-400/70 hover:scale-105">
                      Register
                    </button>
                  </Link>
                </>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center space-x-3 bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-800 dark:to-gray-950 hover:from-gray-700 hover:to-gray-800 dark:hover:from-gray-700 dark:hover:to-gray-900 pl-2 pr-4 py-2 rounded-full transition-all duration-300 border-2 border-gray-700 dark:border-gray-600 hover:border-yellow-400 shadow-lg hover:shadow-yellow-400/20"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full blur-sm"></div>
                      <img
                        src={user?.photoURL || "https://i.ibb.co/1zR5X4t/default-user.png"}
                        alt="profile"
                        className="relative w-9 h-9 rounded-full border-2 border-yellow-400 object-cover"
                      />
                    </div>
                    <span className="text-sm font-semibold text-gray-200 dark:text-gray-100 max-w-[120px] truncate">
                      {user?.displayName || "User"}
                    </span>
                    <svg
                      className={`w-4 h-4 text-yellow-400 transition-transform duration-300 ${
                        profileOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {profileOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)} />
                      <div className="absolute right-0 mt-3 w-64 bg-gradient-to-br from-gray-800 via-gray-900 to-black dark:from-gray-900 dark:via-gray-950 dark:to-black rounded-2xl shadow-2xl border-2 border-gray-700/50 dark:border-gray-600/50 py-2 z-20 overflow-hidden">
                        <div className="relative px-4 py-4 bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 border-b border-gray-700/50 dark:border-gray-600/50">
                          <div className="flex items-center space-x-3">
                            <div className="relative">
                              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full blur-md opacity-50"></div>
                              <img
                                src={user?.photoURL || "https://i.ibb.co/1zR5X4t/default-user.png"}
                                alt="profile"
                                className="relative w-12 h-12 rounded-full border-2 border-yellow-400 object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-bold text-white truncate">
                                {user?.displayName || "User"}
                              </p>
                              <p className="text-xs text-gray-400 dark:text-gray-300 truncate mt-0.5">{user?.email}</p>
                            </div>
                          </div>
                        </div>

                        <div className="py-2">
                          <Link
                            to="/dashboard"
                            className="group flex items-center space-x-3 px-4 py-3 text-sm text-gray-300 dark:text-gray-200 hover:bg-gradient-to-r hover:from-yellow-400/10 hover:to-transparent transition-all duration-200"
                            onClick={() => setProfileOpen(false)}
                          >
                            <div className="p-2 bg-gray-800 dark:bg-gray-800 rounded-lg group-hover:bg-yellow-400/20 transition-colors">
                              <svg className="w-4 h-4 text-gray-400 dark:text-gray-300 group-hover:text-yellow-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                              </svg>
                            </div>
                            <span className="font-medium group-hover:text-yellow-400 transition-colors">Dashboard</span>
                          </Link>

                          <Link
                            to="/dashboard/profile"
                            className="group flex items-center space-x-3 px-4 py-3 text-sm text-gray-300 dark:text-gray-200 hover:bg-gradient-to-r hover:from-yellow-400/10 hover:to-transparent transition-all duration-200"
                            onClick={() => setProfileOpen(false)}
                          >
                            <div className="p-2 bg-gray-800 dark:bg-gray-800 rounded-lg group-hover:bg-yellow-400/20 transition-colors">
                              <svg className="w-4 h-4 text-gray-400 dark:text-gray-300 group-hover:text-yellow-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                            <span className="font-medium group-hover:text-yellow-400 transition-colors">Profile</span>
                          </Link>

                          <Link
                            to="/dashboard/gallery"
                            className="group flex items-center space-x-3 px-4 py-3 text-sm text-gray-300 dark:text-gray-200 hover:bg-gradient-to-r hover:from-yellow-400/10 hover:to-transparent transition-all duration-200"
                            onClick={() => setProfileOpen(false)}
                          >
                            <div className="p-2 bg-gray-800 dark:bg-gray-800 rounded-lg group-hover:bg-yellow-400/20 transition-colors">
                              <svg className="w-4 h-4 text-gray-400 dark:text-gray-300 group-hover:text-yellow-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <span className="font-medium group-hover:text-yellow-400 transition-colors">My Gallery</span>
                          </Link>

                          <Link
                            to="/dashboard/favorites"
                            className="group flex items-center space-x-3 px-4 py-3 text-sm text-gray-300 dark:text-gray-200 hover:bg-gradient-to-r hover:from-yellow-400/10 hover:to-transparent transition-all duration-200"
                            onClick={() => setProfileOpen(false)}
                          >
                            <div className="p-2 bg-gray-800 dark:bg-gray-800 rounded-lg group-hover:bg-yellow-400/20 transition-colors">
                              <svg className="w-4 h-4 text-gray-400 dark:text-gray-300 group-hover:text-yellow-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                              </svg>
                            </div>
                            <span className="font-medium group-hover:text-yellow-400 transition-colors">My Favorites</span>
                          </Link>
                        </div>

                        <div className="border-t border-gray-700/50 dark:border-gray-600/50 mt-2 pt-2">
                          <button
                            onClick={handleLogout}
                            className="group w-full flex items-center space-x-3 px-4 py-3 text-sm text-red-400 dark:text-red-300 hover:bg-gradient-to-r hover:from-red-500/10 hover:to-transparent transition-all duration-200"
                          >
                            <div className="p-2 bg-gray-800 dark:bg-gray-800 rounded-lg group-hover:bg-red-500/20 transition-colors">
                              <svg className="w-4 h-4 group-hover:text-red-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                              </svg>
                            </div>
                            <span className="font-medium group-hover:text-red-300 transition-colors">Logout</span>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-gray-800/50 dark:bg-gray-700/50 hover:bg-gray-700 dark:hover:bg-gray-600 transition-all"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd"></path>
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                  </svg>
                )}
              </button>

              <button
                className="p-2.5 rounded-xl hover:bg-gray-800/80 dark:hover:bg-gray-700/80 transition-all duration-300 border-2 border-transparent hover:border-yellow-400"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                <div className="w-6 h-5 flex flex-col justify-between">
                  <span className={`block h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
                  <span className={`block h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
                  <span className={`block h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className={`md:hidden overflow-hidden transition-all duration-500 ${menuOpen ? "max-h-[600px]" : "max-h-0"}`}>
          <div className="px-4 py-6 bg-gradient-to-b from-gray-800/98 to-gray-900/98 dark:from-gray-900/98 dark:to-gray-950/98 backdrop-blur-xl border-t border-gray-700/50 dark:border-gray-600/50 space-y-3">
            {user && (
              <div className="flex items-center space-x-4 px-4 py-4 bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-900 dark:to-gray-950 rounded-2xl mb-4 border-2 border-gray-700/50 dark:border-gray-600/50 shadow-xl">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full blur-md opacity-50"></div>
                  <img
                    src={user?.photoURL || "https://i.ibb.co/1zR5X4t/default-user.png"}
                    alt="profile"
                    className="relative w-14 h-14 rounded-full border-3 border-yellow-400 object-cover shadow-lg"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-base font-bold text-white truncate">{user?.displayName || "User"}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-300 truncate mt-1">{user?.email}</p>
                </div>
              </div>
            )}

            <Link
              to="/"
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive("/") && location.pathname === "/"
                  ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 shadow-lg shadow-yellow-500/30"
                  : "text-white dark:text-gray-100 hover:bg-gray-800 dark:hover:bg-gray-800 border border-gray-700/50 dark:border-gray-600/50"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="font-semibold">Home</span>
            </Link>

            <Link
              to="/explore"
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                isActive("/explore")
                  ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 shadow-lg shadow-yellow-500/30"
                  : "text-white dark:text-gray-100 hover:bg-gray-800 dark:hover:bg-gray-800 border border-gray-700/50 dark:border-gray-600/50"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="font-semibold">Explore Artworks</span>
            </Link>

            {user && (
              <>
                <Link
                  to="/dashboard"
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive("/dashboard")
                      ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 shadow-lg shadow-yellow-500/30"
                      : "text-white dark:text-gray-100 hover:bg-gray-800 dark:hover:bg-gray-800 border border-gray-700/50 dark:border-gray-600/50"
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <span className="font-semibold">Dashboard</span>
                </Link>

                <Link
                  to="/add"
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive("/add")
                      ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 shadow-lg shadow-yellow-500/30"
                      : "text-white dark:text-gray-100 hover:bg-gray-800 dark:hover:bg-gray-800 border border-gray-700/50 dark:border-gray-600/50"
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="font-semibold">Add Artwork</span>
                </Link>
              </>
            )}

            <div className="pt-4 border-t border-gray-700/50 dark:border-gray-600/50 space-y-3">
              {!user ? (
                <>
                  <Link to="/login" className="block">
                    <button className="w-full flex items-center justify-center space-x-2 px-6 py-3.5 text-gray-300 dark:text-gray-200 border-2 border-gray-700 dark:border-gray-600 rounded-xl hover:border-yellow-400 hover:text-yellow-400 transition-all font-bold shadow-lg">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      <span>Login</span>
                    </button>
                  </Link>
                  <Link to="/register" className="block">
                    <button className="w-full flex items-center justify-center space-x-2 px-6 py-3.5 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 rounded-xl hover:from-yellow-300 hover:to-yellow-400 transition-all font-bold shadow-xl shadow-yellow-500/50">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                      <span>Register</span>
                    </button>
                  </Link>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center space-x-2 px-6 py-3.5 text-red-400 dark:text-red-300 border-2 border-red-500/50 rounded-xl hover:bg-red-500/20 hover:border-red-400 transition-all font-bold shadow-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Logout</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
      
      <div className="h-20"></div>
    </>
  );
};

export default Navbar;