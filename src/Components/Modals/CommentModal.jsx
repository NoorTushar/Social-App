/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const CommentModal = ({
   handleCloseCommentModal,
   showCommentModal,
   user,
   post,
   refetch,
}) => {
   const axiosSecure = useAxiosSecure();
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm();

   const onSubmit = async (data) => {
      const commentData = {
         comment: data.comment,
         commentBy: user.email,
         commentTime: new Date().toISOString(),
      };

      console.log(commentData);

      try {
         const { data } = await axiosSecure.patch(
            `/posts/comment/${post._id}`,
            commentData
         );
         refetch();
         handleCloseCommentModal();
         toast.success("Comment Successful");
      } catch (error) {
         console.log(error);
      }
   };
   return (
      showCommentModal && (
         <div className="fixed w-full top-0 left-0 right-0 bottom-0 flex items-center justify-center z-10 bg-black bg-opacity-20 mt-0">
            <div className="border max-w-sm w-full mx-auto shadow-lg bg-white p-10 space-y-4 rounded-xl">
               <h3 className="text-center text-xl font-semibold text-violet-600">
                  Insert your comment
               </h3>
               <form onSubmit={handleSubmit(onSubmit)}>
                  <div>
                     <textarea
                        rows={"3"}
                        placeholder="Comment Here"
                        className="placeholder:text-xl w-full border p-4 focus:outline-purple-600 duration-300 rounded-lg"
                        {...register("comment", {
                           required: {
                              value: true,
                              message: "Must type a comment.",
                           },
                        })}
                     />
                     {errors?.comment && (
                        <span className="text-red-500 block mt-1 mb-2 font-didact">
                           {errors.comment.message}
                        </span>
                     )}
                  </div>
                  <div className="flex items-center justify-evenly mt-2">
                     <button>
                        <FaCheck className="text-green-600 text-2xl" />
                     </button>
                     <button onClick={handleCloseCommentModal}>
                        <RxCross2 className="text-2xl text-red-600" />
                     </button>
                  </div>
               </form>
            </div>
         </div>
      )
   );
};

export default CommentModal;
