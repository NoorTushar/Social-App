import "react-tabs/style/react-tabs.css";
import useAllPosts from "../../Hooks/useAllPosts";
import PostCard from "../PostCard";
import useAuth from "../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

import toast from "react-hot-toast";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const NewsFeed = () => {
   const { user } = useAuth();
   const [posts, refetch] = useAllPosts();
   const axiosPublic = useAxiosPublic();
   const axiosSecure = useAxiosSecure();

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm();

   const onSubmit = async (data) => {
      console.log(data);
      const imageFile = { image: data.postImage[0] };
      console.log(imageFile);

      const res = await axiosPublic.post(image_hosting_api, imageFile, {
         headers: {
            "content-type": "multipart/form-data",
         },
      });

      if (res.data.success) {
         const postData = {
            postImage: res.data.data.display_url,
            postDescription: data.postDescription,
            postTime: new Date().toISOString(),
            postedBy: {
               email: user.email,
               userName: user.displayName,
               photoURL: user.photoURL,
            },
         };
         console.log(postData);

         try {
            const { data } = await axiosSecure.post("/posts", postData);
            if (data.insertedId) {
               toast.success("Posted Successfully");
               refetch();
               reset();
            }
         } catch (error) {
            toast.error(error);
         }
      }
   };

   return (
      <section className="max-w-[1000px] mx-auto border p-6 pt-[80px]">
         <div className="text-2xl font-medium text-purple-700">News Feed</div>
         <div className="border rounded-lg p-6 my-2 flex gap-4 flex-wrap bg-gray-100 w-full">
            <img
               src={user?.photoURL}
               className="size-12 object-cover rounded-full"
               alt=""
            />
            <form
               onSubmit={handleSubmit(onSubmit)}
               className="flex-1 flex flex-col w-full"
            >
               <div className="w-full">
                  <textarea
                     placeholder="What's on your mind?"
                     className="placeholder:text-xl w-full  p-4 focus:outline-purple-600 duration-300 rounded-lg"
                     rows="3"
                     {...register("postDescription", {
                        required: {
                           value: true,
                           message: "Must provide description.",
                        },
                     })}
                  />
                  {errors?.postDescription && (
                     <span className="text-red-500 block mt-1 mb-2 font-didact">
                        {errors.postDescription.message}
                     </span>
                  )}
               </div>

               <div className="flex items-center space-x-2 my-2">
                  <label>Image: </label>
                  <input
                     type="file"
                     {...register("postImage", {
                        required: {
                           value: true,
                           message: "Must provide an image.",
                        },
                     })}
                  />
                  {errors?.postImage && (
                     <span className="text-red-500 block mt-1 mb-2 font-didact">
                        {errors.postImage.message}
                     </span>
                  )}
               </div>

               <div className="text-end mt-2 gap-2 flex items-center justify-between  flex-wrap">
                  <div className="space-x-2">
                     <button
                        className="btn btn-sm bg-slate-400 text-white"
                        type="reset"
                     >
                        Reset
                     </button>
                     <button
                        className="btn btn-primary bg-violet-600 text-white btn-sm"
                        type="submit"
                     >
                        Post
                     </button>
                  </div>
               </div>
            </form>
         </div>

         {/* All Posts Panel */}

         {posts.map((post) => (
            <PostCard
               post={post}
               key={post._id}
               refetch={refetch}
               user={user}
            />
         ))}
      </section>
   );
};

export default NewsFeed;
