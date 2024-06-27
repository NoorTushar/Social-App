import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import { useState } from "react";

const Register = () => {
   const [showPassword, setShowPassword] = useState(false);
   const {
      register,
      handleSubmit,
      getValues,
      reset,
      formState: { errors },
   } = useForm();

   const onSubmit = async (data) => {
      console.log(data);
   };

   return (
      <div className="min-h-screen justify-center items-center flex">
         <div className="flex flex-col w-full max-w-md p-6 rounded-md sm:p-10 dark:bg-gray-50 dark:text-gray-800 shadow">
            <div className="mb-8 text-center">
               <h1 className="my-3 text-3xl font-bold">Register</h1>
               <p className="text-sm dark:text-gray-600">Register for free!</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-12">
               <div className="space-y-4">
                  {/* Username */}
                  <div>
                     <label htmlFor="userName" className="block mb-2 text-sm">
                        Username
                     </label>
                     <input
                        {...register("userName", {
                           required: {
                              value: true,
                              message: "Must provide a username.",
                           },
                        })}
                        type="text"
                        name="userName"
                        placeholder="Enter your username here"
                        className="w-full px-3 py-2 border rounded-md outline-none dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                     />
                     {errors?.userName && (
                        <span className="text-red-500 block mt-1 mb-2 font-didact">
                           {errors.userName.message}
                        </span>
                     )}
                  </div>
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
                  {/* Profile Picture */}
                  <div>
                     <label htmlFor="image" className="block mb-2 text-sm">
                        Profile Picture
                     </label>
                     <input
                        {...register("image", {
                           required: {
                              value: true,
                              message: "Must provide an image.",
                           },
                        })}
                        type="file"
                        name="image"
                        placeholder="Enter your email address here"
                        className="w-full px-3 py-2 border rounded-md outline-none dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                     />
                     {errors?.image && (
                        <span className="text-red-500 block mt-1 mb-2 font-didact">
                           {errors.image.message}
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
                              minLength: {
                                 value: 6,
                                 message:
                                    "Password must be at least 6 characters long.",
                              },
                              validate: {
                                 hasUpperCase: (value) =>
                                    /[A-Z]/.test(value) ||
                                    "Password must have at least one uppercase letter.",
                                 hasSpecialChar: (value) =>
                                    /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                                    "Password must have at least one special character.",
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
                  {/* Confirm Password */}
                  <div>
                     <label
                        htmlFor="confirmPassword"
                        className="block mb-2 text-sm"
                     >
                        Confirm Password
                     </label>
                     <input
                        {...register("confirmPassword", {
                           required: {
                              value: true,
                              message: "Must confirm the password.",
                           },
                           validate: (value) =>
                              value === getValues("password") ||
                              "Passwords do not match.",
                        })}
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        className="w-full px-3 py-2 border rounded-md outline-none dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800"
                     />
                     {errors?.confirmPassword && (
                        <span className="text-red-500 block mt-1 mb-2 font-didact">
                           {errors.confirmPassword.message}
                        </span>
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
                        Register
                     </button>
                  </div>
                  <p className="px-6 text-sm text-center dark:text-gray-600">
                     Already have an account?
                     <Link
                        to={"/login"}
                        className="hover:underline dark:text-violet-600"
                     >
                        Login
                     </Link>
                     .
                  </p>
               </div>
            </form>
         </div>
      </div>
   );
};

export default Register;