/* eslint-disable react/prop-types */
import toast from "react-hot-toast";

const ResetPasswordModal = ({
   resetPassword,
   openResetModal,
   setOpenResetModal,
}) => {
   const handleResetPassword = (e) => {
      e.preventDefault();
      const email = e.target.email.value;
      if (!email) {
         toast.error("Provide an email");
         return;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
         toast.error("Please enter a valid email");
         return;
      }

      resetPassword(email)
         .then(() => {
            toast.success("Check Email");
            setOpenResetModal(false);
         })
         .catch((error) => {
            console.log(error);
         });
   };
   return (
      openResetModal && (
         <div className="fixed w-full top-0 left-0 right-0 bottom-0 flex items-center justify-center z-10 bg-black bg-opacity-20 mt-0">
            <div className="border max-w-sm w-full mx-auto shadow-lg bg-white p-10 space-y-4 rounded-xl">
               <h3 className="text-center text-xl font-semibold text-violet-600">
                  Enter Email
               </h3>
               <form
                  onSubmit={handleResetPassword}
                  action="
            "
               >
                  <div>
                     <input
                        type="email"
                        name="email"
                        required
                        placeholder="enter email"
                        className="border w-full p-2"
                     />
                  </div>

                  <div className="flex flex-wrap justify-between">
                     <button className="btn btn-primary bg-purple-600 border-purple-600 text-white btn-sm mt-3">
                        Reset Password
                     </button>
                     <button
                        onClick={() => setOpenResetModal(false)}
                        className="btn btn-primary bg-slate-500 border-purple-600 text-white btn-sm mt-3"
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

export default ResetPasswordModal;
