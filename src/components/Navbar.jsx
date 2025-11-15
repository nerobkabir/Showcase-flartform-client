import { useState, useContext } from "react";
import { Link } from "react-router-dom"; 
import { AuthContext } from "../pages/AuthProvider";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoverUser, setHoverUser] = useState(false);
  const { user, logOut} = useContext(AuthContext);
  

  const handleLogout = () => {
    logOut()
      .then(() => console.log("Logged out"))
      .catch(err => console.error(err));
  };

  

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="flex justify-between items-center px-6 py-4">
        <div className="text-2xl font-bold text-yellow-400">
          <Link to="/">Artify</Link>
        </div>
        


        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-yellow-400">Home</Link>
          <Link to="/explore" className="hover:text-yellow-400">Explore Artworks</Link>
          
          {user && (
            <>
              <Link to="/add" className="hover:text-yellow-400">Add Artwork</Link>
              <Link to="/gallery" className="hover:text-yellow-400">My Gallery</Link>
              <Link to="/favorites" className="hover:text-yellow-400">My Favorites</Link>
            </>
          )}
        </div>

        <div className="hidden md:flex items-center space-x-4 relative">
          {!user ? (
            <>
              <Link to="/login">
                <button
                
                className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded-md"
              >
                Login
              </button>
              </Link>
              <Link to="/register">
                <button className="border border-yellow-400 px-3 py-1 rounded-md hover:bg-yellow-400 hover:text-black">
                  Register
                </button>
              </Link>
            </>
          ) : (
            <div
              className="relative"
              onMouseEnter={() => setHoverUser(true)}
              onMouseLeave={() => setHoverUser(false)}
            >
              <img
                src={user?.photoURL ? user.photoURL : "https://i.ibb.co/1zR5X4t/default-user.png"}
                alt="user"
                className="w-10 h-10 rounded-full border-2 border-yellow-400 cursor-pointer"
              />
              {hoverUser && (
                <div className="absolute right-0 mt-2 w-44 bg-gray-800 rounded-md shadow-lg p-3 text-center z-50">
                  <p className="text-sm text-gray-300 mb-2 border-b border-gray-600 pb-1">
                    {user.displayName || "User"}
                  </p>
                  <button
                    onClick={handleLogout}
                    className="text-red-400 hover:text-red-500"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col space-y-1 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="block w-6 h-0.5 bg-white"></span>
          <span className="block w-6 h-0.5 bg-white"></span>
          <span className="block w-6 h-0.5 bg-white"></span>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-gray-800 flex flex-col items-center space-y-4 py-4">
          <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-yellow-400">Home</Link>
          <Link to="/explore" onClick={() => setMenuOpen(false)} className="hover:text-yellow-400">Explore Artworks</Link>
          {user && (
            <>
              <Link to="/add" onClick={() => setMenuOpen(false)} className="hover:text-yellow-400">Add Artwork</Link>
              <Link to="/gallery" onClick={() => setMenuOpen(false)} className="hover:text-yellow-400">My Gallery</Link>
              <Link to="/favorites" onClick={() => setMenuOpen(false)} className="hover:text-yellow-400">My Favorites</Link>
            </>
          )}
          {!user ? (
            <Link to="/login" onClick={() => setMenuOpen(false)}>
            <button
              
              className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded-md"
            >
              Login
            </button>
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="text-red-400 hover:text-red-500"
            >
              Logout
            </button>
          )}
        
        </div>
      )}
    </nav>
  );
};

export default Navbar;
