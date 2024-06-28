/* eslint-disable react/prop-types */
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const EditModal = ({ post, showEditModal, handleCloseEditModal }) => {
   const [changeImage, setChangeImage] = useState(false);

   console.log(post);
   const {
      register,
      handleSubmit,
      reset,
      getValues,
      formState: { errors },
   } = useForm();

   const onSubmit = async (data) => {
      console.log(data);
      const postDescription = getValues("postDescription");
      console.log(postDescription);
   };

   return (
      showEditModal && (
         <div className="fixed w-full top-0 left-0 right-0 bottom-0 flex items-center justify-center z-10 bg-black bg-opacity-20 mt-0">
            <div className="border max-w-lg w-full mx-auto shadow-lg bg-white p-10  rounded-xl relative">
               <h3 className="text-center text-xl font-semibold text-violet-600">
                  Edit Post
               </h3>

               <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-4 mt-6"
               >
                  <div className="w-full">
                     <textarea
                        placeholder="What's on your mind?"
                        className="placeholder:text-xl w-full border p-4 focus:outline-purple-600 duration-300 rounded-lg"
                        rows="3"
                        defaultValue={post.postDescription}
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

                  {changeImage ? (
                     <div>
                        <div className="flex items-center space-x-2">
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
                        <button
                           type="button"
                           onClick={() => setChangeImage(false)}
                           className="btn btn-neutral btn-sm mt-3"
                        >
                           Use previous image
                        </button>
                     </div>
                  ) : (
                     <div className="space-y-4">
                        <p>Image: {post?.postImage}</p>
                        <button
                           type="button"
                           onClick={() => setChangeImage(true)}
                           className="btn btn-neutral btn-sm"
                        >
                           Change Image
                        </button>
                     </div>
                  )}

                  <div className="flex items-center justify-evenly mt-6">
                     <button
                        type="submit"
                        className="btn btn-primary text-white bg-violet-600"
                     >
                        Confirm
                     </button>
                     <button
                        onClick={handleCloseEditModal}
                        className="btn  btn-error text-white bg-red-500"
                     >
                        Cancel
                     </button>
                  </div>
               </form>
            </div>
         </div>
      )
   );
};

export default EditModal;
