import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import Swal from "sweetalert2";
import { AuthContext } from "./AuthProvider";

const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;

    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setError("Password must contain at least one uppercase letter.");
      return;
    }
    if (!/[a-z]/.test(password)) {
      setError("Password must contain at least one lowercase letter.");
      return;
    }

    createUser(email, password)
      .then((result) => {
        return updateUserProfile(name, photo).then(() => result);
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Welcome to Artify! 🎉",
          text: "Account created successfully!",
          confirmButtonColor: "#f59e0b",
          timer: 2500,
          showConfirmButton: false,
        });
        navigate("/");
      })
      .catch((err) => {
        setError("Registration failed. Email might already be in use.");
        toast.error("Registration failed!");
      });
  };

  const handleGoogleSignup = () => {
    signInWithGoogle()
      .then(() => {
        toast.success("Signed up with Google!");
        navigate("/");
      })
      .catch(() => toast.error("Google signup failed"));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 flex items-center justify-center px-4 py-12">
      <Toaster position="top-right" />

      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-black text-gray-900 mb-2">Join Artify</h1>
            <p className="text-gray-600">Create your account and start sharing art</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-500/20 transition-all text-gray-800 placeholder-gray-500 bg-white/70"
              />
            </div>

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
                type="text"
                name="photo"
                placeholder="Photo URL (optional)"
                className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-500/20 transition-all text-gray-800 placeholder-gray-500 bg-white/70"
              />
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Password (min 6 chars, upper & lower)"
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
              Create Account
            </button>
          </form>

          <div className="mt-6">
            <button
              onClick={handleGoogleSignup}
              className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 hover:border-gray-400 py-4 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-all shadow-md hover:shadow-lg"
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
              Sign up with Google
            </button>
          </div>

          <p className="mt-8 text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-yellow-600 hover:text-yellow-700 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;