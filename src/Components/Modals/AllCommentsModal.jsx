/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const AllCommentsModal = ({
   post,
   getUserInfo,
   showAllComments,
   setShowAllComments,
}) => {
   const axiosSecure = useAxiosSecure();

   const { data: singlePost = {} } = useQuery({
      queryKey: ["singlePost", post._id],
      enabled: !!post._id, // Ensures query is enabled when post._id is available
      queryFn: async () => {
         const { data } = await axiosSecure(`/posts/${post._id}`);
         return data;
      },
   });

   return (
      showAllComments && (
         <div className="fixed w-full h-full top-0 left-0 flex items-center justify-center bg-black bg-opacity-20 z-10">
            <div className="max-w-lg w-full mx-auto bg-white shadow-lg rounded-xl p-6">
               <div className="text-end">
                  <button
                     onClick={() => setShowAllComments(false)}
                     className="btn btn-sm btn-primary bg-violet-600 text-white mt-4"
                  >
                     Close
                  </button>
               </div>
               <h3 className="text-center text-xl font-semibold text-violet-600 mb-4">
                  All Comments
               </h3>
               {singlePost?.comments?.length > 0 ? (
                  <div>
                     {singlePost.comments.map((comment, index) => {
                        const user = getUserInfo(comment.commentBy);
                        return (
                           <div key={index}>
                              <div className="p-2 border rounded-lg my-2">
                                 <div className="flex items-start gap-2">
                                    <img
                                       src={user?.photoURL}
                                       className="size-8 rounded-full object-cover"
                                       alt=""
                                    />
                                    <div>
                                       <div>
                                          <h4 className="font-medium">
                                             {user?.userName}
                                          </h4>
                                          <span className="text-sm">
                                             {new Date(
                                                comment?.commentTime
                                             ).toLocaleString()}
                                          </span>
                                       </div>
                                       <p className="text-sm mt-2">
                                          {comment?.comment}
                                       </p>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        );
                     })}
                  </div>
               ) : (
                  <p className="text-center py-4 text-gray-600">
                     No comments yet
                  </p>
               )}
               <button
                  onClick={() => setShowAllComments(false)}
                  className="btn btn-sm btn-primary bg-violet-600 text-white mt-4"
               >
                  Close
               </button>
            </div>
         </div>
      )
   );
};

export default AllCommentsModal;
