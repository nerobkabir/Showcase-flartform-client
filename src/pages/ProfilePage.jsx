import React, { useContext, useEffect, useState } from "react";

import toast, { Toaster } from "react-hot-toast";
import { updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase.init";
import { AuthContext } from "./AuthProvider";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState(null);
  
  const [formData, setFormData] = useState({
    displayName: "",
    photoURL: "",
    bio: "",
    phone: "",
    location: "",
  });

  useEffect(() => {
    if (!user?.email) return;

    fetch(`https://showcase-server.vercel.app/users/${user.email}`)
      .then(res => res.json())
      .then(data => {
        setProfileData(data);
        setFormData({
          displayName: user.displayName || "",
          photoURL: user.photoURL || "",
          bio: data?.bio || "",
          phone: data?.phone || "",
          location: data?.location || "",
        });
      });
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateProfile(auth.currentUser, {
        displayName: formData.displayName,
        photoURL: formData.photoURL,
      });

      await fetch(`https://showcase-server.vercel.app/users/${user.email}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          displayName: formData.displayName,
          photoURL: formData.photoURL,
          bio: formData.bio,
          phone: formData.phone,
          location: formData.location,
          email: user.email,
        }),
      });

      toast.success("Profile updated successfully!");
      setEditing(false);
      
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Toaster />
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>

        <div className="relative px-6 pb-6">
          <div className="flex justify-between items-start -mt-16">
            <img
              src={formData.photoURL || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
            />
            
            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="mt-16 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
              >
                Edit Profile
              </button>
            ) : (
              <button
                onClick={() => setEditing(false)}
                className="mt-16 bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            )}
          </div>

          {!editing ? (
            <div className="mt-6 space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{user?.displayName || "User"}</h1>
                <p className="text-gray-500">{user?.email}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Bio</label>
                    <p className="text-gray-800 mt-1">{profileData?.bio || "No bio added yet"}</p>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-600">Phone</label>
                    <p className="text-gray-800 mt-1">{profileData?.phone || "Not provided"}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Location</label>
                    <p className="text-gray-800 mt-1">{profileData?.location || "Not provided"}</p>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-600">Member Since</label>
                    <p className="text-gray-800 mt-1">
                      {new Date(user?.metadata?.creationTime).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Photo URL
                  </label>
                  <input
                    type="url"
                    name="photoURL"
                    value={formData.photoURL}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Tell us about yourself..."
                ></textarea>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;