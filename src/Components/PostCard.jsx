/* eslint-disable react/prop-types */
import { AiOutlineDelete } from "react-icons/ai";
import ConfirmDeleteModal from "./Modals/ConfirmDeleteModal";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { FaRegComment, FaRegEdit } from "react-icons/fa";

import useAxiosSecure from "../Hooks/useAxiosSecure";
import EditModal from "./Modals/EditModal";

const PostCard = ({ post, refetch, user }) => {
   const axiosSecure = useAxiosSecure();
   const [showDeleteModal, setShowDeleteModal] = useState(false);
   const [showEditModal, setShowEditModal] = useState(false);

   const alreadyLiked = post?.likes?.find(
      (like) => like.likedBy === user.email
   );

   // delete a post
   const { mutateAsync: deletePost } = useMutation({
      mutationKey: ["post"],
      mutationFn: async (id) => {
         const result = await axiosSecure.delete(`/post/${id}`);
         return result;
      },
      onSuccess: () => {
         toast.success("The post has been deleted!");
         handleCloseDeleteModal();
         refetch();
      },
      onError: () => {
         toast.error("Sorry, could not delete post!");
         handleCloseDeleteModal();
      },
   });

   const handleCloseDeleteModal = () => {
      setShowDeleteModal(false);
   };

   const confirmDelete = async (id) => {
      console.log(`id to delete: ${id}`);
      await deletePost(id);
      handleCloseDeleteModal();
   };

   // like a post / unlike a post
   const handleLike = async (id) => {
      const likeData = {
         likedBy: user?.email,
      };

      const { data } = await axiosSecure.patch(`/posts/like/${id}`, likeData);
      console.log(data);
      refetch();
   };

   // edit a post
   const handleCloseEditModal = () => {
      setShowEditModal(false);
   };

   const { mutateAsync: editPost } = useMutation({
      mutationKey: ["post"],
      mutationFn: async (id) => {
         //  const result = await axiosSecure.delete(`/post/${id}`); change api
         //  return result;
      },
      onSuccess: () => {
         toast.success("The post has been deleted!");
         handleCloseEditModal();
         refetch();
      },
      onError: () => {
         toast.error("Sorry, could not delete post!");
         handleCloseEditModal();
      },
   });

   const confirmEdit = async (id) => {
      console.log(`id to edit: ${id}`);
      //   await editPost(id);
      handleCloseEditModal();
   };

   return (
      <div className="border flex flex-col max-w-xl mx-auto p-6 overflow-hidden rounded-lg shadow-md dark:bg-gray-50 dark:text-gray-800">
         <div className="flex space-x-4">
            <img
               alt=""
               src={post.postedBy.photoURL}
               className="object-cover w-12 h-12 rounded-full shadow dark:bg-gray-500"
            />
            <div className="flex flex-col space-y-1">
               <a
                  rel="noopener noreferrer"
                  href="#"
                  className="text-sm font-semibold"
               >
                  {post.postedBy.userName}
               </a>
               <span className="text-xs dark:text-gray-600">
                  {new Date(post.postTime).toLocaleDateString()}
               </span>
            </div>
         </div>
         <div>
            <p className=" dark:text-gray-600 my-2">{post.postDescription}</p>
            <img
               src={post.postImage}
               alt=""
               className="object-cover w-full mb-4 h-60 sm:h-96 dark:bg-gray-500 rounded-lg"
            />
         </div>
         {/* Action buttons bottom */}
         <div className="flex justify-between items-center">
            {/* Comment and Like buttons */}
            <div className="flex items-center space-x-2">
               {/* comments */}
               <button
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content="Comment"
                  type="button"
                  className="flex items-center p-1 space-x-1.5"
               >
                  <FaRegComment className="text-purple-600 text-xl" />
                  <span>{post?.comments?.length || "0"}</span>
               </button>
               {/* Likes */}
               <button
                  onClick={() => handleLike(post._id)}
                  type="button"
                  className="flex items-center p-1 space-x-1.5"
               >
                  {alreadyLiked ? (
                     <AiFillLike
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Remove Like"
                        className="text-purple-600 text-xl"
                     />
                  ) : (
                     <AiOutlineLike
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Like"
                        className="text-purple-600 text-xl"
                     />
                  )}

                  <span>{post?.likes?.length || "0"}</span>
               </button>
            </div>
            {/* Edit and Delete if the current user posted it */}
            {user?.email === post?.postedBy?.email && (
               <div className="space-x-3">
                  {/* Edit */}
                  <button
                     data-tooltip-id="my-tooltip"
                     data-tooltip-content="Edit post"
                     onClick={() => setShowEditModal(true)}
                  >
                     <FaRegEdit className="text-violet-600 text-xl " />
                  </button>
                  {/* Delete */}
                  <button
                     data-tooltip-id="my-tooltip"
                     data-tooltip-content="Delete post"
                     onClick={() => setShowDeleteModal(true)}
                  >
                     <AiOutlineDelete className="text-violet-600 text-xl " />
                  </button>
               </div>
            )}
         </div>
         <ConfirmDeleteModal
            id={post._id}
            showDeleteModal={showDeleteModal}
            handleCloseDeleteModal={handleCloseDeleteModal}
            confirmDelete={confirmDelete}
         />
         <EditModal
            post={post}
            showEditModal={showEditModal}
            handleCloseEditModal={handleCloseEditModal}
            refetch={refetch}
         />
      </div>
   );
};

export default PostCard;
