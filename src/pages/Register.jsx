import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import { AuthContext } from "./AuthProvider";

const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photo = e.target.photo.value;
    const password = e.target.password.value;

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setError("Password must contain uppercase, lowercase, and at least 6 characters.");
      return;
    }

    createUser(email, password)
      .then(() => {
        updateUserProfile(name, photo)
          .then(() => {
            Swal.fire("Success!", "Account created successfully!", "success");
            navigate("/");
          })
          .catch(() => toast.error("Profile update failed"));
      })
      .catch(() => setError("Registration failed! Try again."));
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Toaster />
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Register to Artify</h2>
        <form onSubmit={handleRegister}>
          <input type="text" name="name" placeholder="Full Name" required className="w-full p-2 mb-3 border rounded-md" />
          <input type="email" name="email" placeholder="Email" required className="w-full p-2 mb-3 border rounded-md" />
          <input type="text" name="photo" placeholder="Photo URL" required className="w-full p-2 mb-3 border rounded-md" />
          <input type="password" name="password" placeholder="Password" required className="w-full p-2 mb-4 border rounded-md" />
          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
          <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-md">
            Register
          </button>
        </form>

        <button
          onClick={handleGoogleSignup}
          className="w-full mt-3 border border-gray-300 py-2 rounded-md hover:bg-gray-100"
        >
          Sign up with Google
        </button>

        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-yellow-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
