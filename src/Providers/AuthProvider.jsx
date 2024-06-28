import { createContext, useEffect, useState } from "react";
import {
   GoogleAuthProvider,
   createUserWithEmailAndPassword,
   getAuth,
   onAuthStateChanged,
   sendPasswordResetEmail,
   signInWithEmailAndPassword,
   signInWithPopup,
   signOut,
   updateProfile,
} from "firebase/auth";
import { app } from "../Firebase/firebase.config";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import PropTypes from "prop-types";

export const AuthContext = createContext(null);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
   // current user:
   const [user, setUser] = useState(null);

   // loader for loading till we get the user
   const [loading, setLoading] = useState(true);

   // axiosPublic
   const axiosPublic = useAxiosPublic();

   // create firebase user
   const createUser = (email, password) => {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password);
   };

   // login using firebase email and password
   const loginUser = (email, password) => {
      setLoading(true);
      return signInWithEmailAndPassword(auth, email, password);
   };

   // reset password
   const resetPassword = (email) => {
      return sendPasswordResetEmail(auth, email);
   };

   // updating user with username and password
   const updateUser = (userName, userPhoto) => {
      setLoading(true);
      return updateProfile(auth.currentUser, {
         displayName: userName,
         photoURL: userPhoto,
      });
   };

   // login with Google using firebase
   const loginWithGoogle = () => {
      setLoading(true);
      return signInWithPopup(auth, googleProvider);
   };

   // logout
   const logoutUser = () => {
      return signOut(auth);
   };

   // const saveUser = useCallback(
   //    async (user) => {
   //       const currentUser = {
   //          email: user?.email,
   //          role: "guest",
   //          status: "Verified",
   //       };
   //       const { data } = await axiosPublic.put(`/people`, currentUser);
   //       return data;
   //    },
   //    [axiosPublic]
   // );

   useEffect(() => {
      const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
         console.log(currentUser);
         setUser(currentUser);
         if (currentUser) {
            try {
               // await saveUser(currentUser);
               const userInfo = { email: currentUser.email };
               const res = await axiosPublic.post("/jwt", userInfo);
               if (res.data.token) {
                  localStorage.setItem("access-token", res.data.token);
               }
            } catch (error) {
               console.error("Error saving user or generating token:", error);
            } finally {
               setLoading(false);
            }
         } else {
            localStorage.removeItem("access-token");
            setLoading(false);
         }
      });

      return () => unSubscribe();
   }, [axiosPublic]);

   const authInfo = {
      user,
      loading,
      createUser,
      loginUser,
      loginWithGoogle,
      updateUser,
      setLoading,
      logoutUser,
      resetPassword,
   };
   return (
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
   );
};

AuthProvider.propTypes = {
   children: PropTypes.node,
};

export default AuthProvider;
