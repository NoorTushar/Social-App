import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { ImSpinner9 } from "react-icons/im";

const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
   const axiosPublic = useAxiosPublic();
   const [showPassword, setShowPassword] = useState(false);
   const [registrationLoading, setRegistrationLoading] = useState(false);

   const {
      register,
      handleSubmit,
      getValues,
      reset,
      formState: { errors },
   } = useForm();

   const { createUser, updateUser, setLoading } = useAuth();

   // after registration correct redirection - (3)
   const location = useLocation();

   // after registration correct redirection - (4)
   const navigate = useNavigate();

   const onSubmit = async (data) => {
      setRegistrationLoading(true);
      const imageFile = { image: data.image[0] };

      const res = await axiosPublic.post(image_hosting_api, imageFile, {
         headers: {
            "content-type": "multipart/form-data",
         },
      });

      if (res.data.success) {
         const userData = {
            ...data,
            photoURL: res.data.data.display_url,
         };

         console.log(userData);

         // create user imported from AuthContext
         try {
            await createUser(data.email, data.password);
            await updateUser(data.userName, res.data.data.display_url);
            const finalResult = await axiosPublic.post("/users", userData);
            console.log(finalResult.data);
            setRegistrationLoading(false);
            // have to set loading to false else after
            // redirecting to page, it will keep showing the loader
            setLoading(false);
            reset();
            toast.success("LOGGED IN SUCCESSFULLY");

            // navigate to private route or homepage
            navigate(location?.state || "/");
         } catch (error) {
            console.log(error);
            const errorMessage = error?.message
               .split("Firebase: Error (auth/")[1]
               .split(")")[0]
               .replace(/-/g, " ");

            toast.error(errorMessage?.toUpperCase());
         }
      }
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
                        className={`w-full px-8 py-3 font-semibold rounded-md bg-violet-600 text-white text-center flex justify-center items-center`}
                     >
                        {registrationLoading ? (
                           <ImSpinner9 className="animate-spin" />
                        ) : (
                           "Register"
                        )}
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
