import React, { createContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile,} from "firebase/auth";
import { auth } from "../firebase/firebase.init";

export const AuthContext = createContext();

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Register with Email & Password
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Update user profile (name, photo)
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // Login with Email & Password
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google Sign-in
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // Logout
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Track user state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    loginUser,
    signInWithGoogle,
    updateUserProfile,
    logOut,
  };

  return <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>;
};

export default AuthProvider;
