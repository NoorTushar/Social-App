import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import { useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";

const Login = () => {
   const { loginUser, setLoading } = useAuth();
   const axiosPublic = useAxiosPublic();
   // first we will get the location of the current page
   const location = useLocation();

   // after login correct redirection (4)
   const navigate = useNavigate();

   // after login correct redirection (5)
   // we want to send this path to the registration state props
   const locationState = location.state;

   const [showPassword, setShowPassword] = useState(false);
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm();

   const onSubmit = async (data) => {
      console.log(data);

      try {
         const result = await loginUser(data.email, data.password);
         console.log(result);
         reset();

         toast.success("LOGGED IN SUCCESSFULLY");

         // after login correct redirection (6)
         navigate(location?.state || "/");
      } catch (error) {
         const errorMessage = error.message
            .split("Firebase: Error (auth/")[1]
            .split(")")[0]
            .replace(/-/g, " ");

         toast.error(errorMessage?.toUpperCase());
      }
   };

   return (
      <div className="min-h-screen justify-center items-center flex">
         <div className="flex flex-col w-full max-w-md p-6 rounded-md sm:p-10 dark:bg-gray-50 dark:text-gray-800 shadow">
            <div className="mb-8 text-center">
               <h1 className="my-3 text-3xl font-bold">Login</h1>
               <p className="text-sm dark:text-gray-600">Welcome back!</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
               <div className="space-y-4">
                  {/* Email */}
                  <div>
                     <label htmlFor="email" className="block mb-2 text-sm">
                        Email address
                     </label>
                     <input
                        {...register("email", {
                           required: {
                              value: true,
                              message: "Must provide an email",
                           },
                           pattern: {
                              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                              message: "Must provide a valid email address",
                           },
                        })}
                        type="email"
                        name="email"
                        placeholder="Enter your email address here"
                        className="w-full px-3 py-2 border rounded-md outline-none dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                     />
                     {errors?.email && (
                        <span className="text-red-500 block mt-1 mb-2 font-didact">
                           {errors.email.message}
                        </span>
                     )}
                  </div>

                  {/* Password */}
                  <div>
                     <label htmlFor="password" className="block mb-2 text-sm">
                        Password
                     </label>
                     <div className="relative">
                        <input
                           {...register("password", {
                              required: {
                                 value: true,
                                 message: "Must provide a password.",
                              },
                           })}
                           type={showPassword ? "text" : "password"}
                           name="password"
                           placeholder="Enter Password"
                           className="w-full px-3 py-2 border rounded-md outline-none dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                        />
                        {/*  // toggle show/ hide password - (2) */}
                        {showPassword ? (
                           <IoMdEye
                              onClick={() => setShowPassword(false)}
                              className="absolute text-lg right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                           />
                        ) : (
                           <IoMdEyeOff
                              onClick={() => setShowPassword(true)}
                              className="absolute text-lg right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                           />
                        )}
                     </div>

                     {errors.password && (
                        <div className="text-red-500 mt-1 mb-2 font-didact">
                           <span>{errors.password.message}</span>
                           {errors.password.types?.hasUpperCase && (
                              <span className="block">
                                 {errors.password.types.hasUpperCase}
                              </span>
                           )}
                           {errors.password.types?.hasSpecialChar && (
                              <span className="block">
                                 {errors.password.types.hasSpecialChar}
                              </span>
                           )}
                        </div>
                     )}
                  </div>
               </div>
               {/* Buttons */}
               <div className="space-y-2">
                  <div>
                     <button
                        type="submit"
                        className="w-full px-8 py-3 font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50"
                     >
                        Login
                     </button>
                  </div>
                  <p className="px-6 text-sm text-center dark:text-gray-600">
                     Don`t have an account?
                     <Link
                        state={locationState}
                        to={"/register"}
                        className="hover:underline dark:text-violet-600"
                     >
                        Register
                     </Link>
                     .
                  </p>
               </div>
            </form>
         </div>
      </div>
   );
};

export default Login;
