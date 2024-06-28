const CommentBox = ({ comment, user }) => {
   console.log(user);
   return (
      <div className="p-2 border rounded-lg my-2">
         <div className="flex items-start gap-2">
            <img
               src={user?.photoURL}
               className="size-8 rounded-full object-cover"
               alt=""
            />
            <div>
               <div>
                  <h4 className="font-medium">{user?.userName}</h4>
                  <span className="text-xs">
                     {new Date(comment?.commentTime).toLocaleString()}
                  </span>
               </div>
               <p className="text-sm mt-2">{comment?.comment}</p>
            </div>
         </div>
      </div>
   );
};

export default CommentBox;
