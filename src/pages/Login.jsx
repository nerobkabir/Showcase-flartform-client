import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { AuthContext } from "./AuthProvider";

const Login = () => {
  const { loginUser, signInWithGoogle } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    setError("");

    loginUser(email, password)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Welcome back! 🎨",
          text: "Logged in successfully!",
          confirmButtonColor: "#f59e0b",
          timer: 2000,
          showConfirmButton: false,
        });
        navigate(from, { replace: true });
      })
      .catch((err) => {
        setError("Invalid email or password. Please try again.");
        toast.error("Login failed!");
      });
  };

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then(() => {
        toast.success("Logged in with Google!");
        navigate(from, { replace: true });
      })
      .catch(() => toast.error("Google login failed"));
  };

  const fillDemoCredentials = () => {
    document.querySelector('input[name="email"]').value = "demo@artify.com";
    document.querySelector('input[name="password"]').value = "Demo@123";
    toast("Demo credentials filled!", { icon: "ℹ️" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 flex items-center justify-center px-4 py-12">
      <Toaster position="top-right" />
      
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-black text-gray-900 mb-2">Welcome to Artify</h1>
            <p className="text-gray-600">Log in to explore amazing artworks</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                required
                className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-500/20 transition-all text-gray-800 placeholder-gray-500 bg-white/70"
              />
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-500/20 transition-all text-gray-800 placeholder-gray-500 bg-white/70"
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-700 px-4 py-3 rounded-xl text-sm font-medium">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Login
            </button>
          </form>

          <div className="mt-6">
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 hover:border-gray-400 py-4 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-all shadow-md hover:shadow-lg"
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
              Continue with Google
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={fillDemoCredentials}
              className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              👤 Use Demo Account (demo@artify.com / Demo@123)
            </button>
          </div>

          <p className="mt-8 text-center text-gray-600">
            Don’t have an account?{" "}
            <Link to="/register" className="font-bold text-yellow-600 hover:text-yellow-700 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;