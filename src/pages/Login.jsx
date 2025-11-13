import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
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
    const email = e.target.email.value;
    const password = e.target.password.value;

    loginUser(email, password)
      .then(() => {
        Swal.fire("Success!", "Logged in successfully!", "success");
        navigate(from, { replace: true });
      })
      .catch(() => setError("Invalid email or password"));
  };

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then(() => {
        toast.success("Logged in with Google!");
        navigate(from, { replace: true });
      })
      .catch(() => toast.error("Google login failed"));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Toaster />
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login to Artify</h2>
        <form onSubmit={handleLogin}>
          <input type="email" name="email" placeholder="Email" required className="w-full p-2 mb-3 border rounded-md" />
          <input type="password" name="password" placeholder="Password" required className="w-full p-2 mb-4 border rounded-md" />
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
          <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-md">
            Login
          </button>
        </form>

        <button
          onClick={handleGoogleLogin}
          className="w-full mt-3 border border-gray-300 py-2 rounded-md hover:bg-gray-100"
        >
          Sign in with Google
        </button>

        <p className="mt-4 text-sm text-center">
          Don’t have an account?{" "}
          <Link to="/register" className="text-yellow-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
