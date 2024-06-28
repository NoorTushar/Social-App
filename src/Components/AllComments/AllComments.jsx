const AllComments = ({ comment, user }) => {
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
               {" "}
               <h4 className="font-medium">{user?.userName}</h4>
               <p className="text-sm">{comment?.comment}</p>
            </div>
         </div>
      </div>
   );
};

export default AllComments;
