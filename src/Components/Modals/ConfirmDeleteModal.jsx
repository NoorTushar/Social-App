/* eslint-disable react/prop-types */
import { RxCross2 } from "react-icons/rx";
import { TiTick } from "react-icons/ti";

const ConfirmDeleteModal = ({
   id,
   showDeleteModal,
   confirmDelete,
   handleCloseDeleteModal,
}) => {
   return (
      showDeleteModal && (
         <div className="fixed w-full top-0 left-0 right-0 bottom-0 flex items-center justify-center z-10 bg-black bg-opacity-20 mt-0">
            <div className="border max-w-sm w-full mx-auto shadow-lg bg-white p-10 space-y-4 rounded-xl">
               <h3 className="text-center text-xl font-semibold">
                  Confirm Delete?
               </h3>
               <p>Are you sure you want to delete this post?</p>
               <div className="space-x-4 flex items-center justify-center">
                  <button onClick={() => confirmDelete(id)}>
                     <TiTick className="text-green-600 text-3xl" />
                  </button>
                  <button onClick={handleCloseDeleteModal}>
                     <RxCross2 className="text-2xl text-red-600" />
                  </button>
               </div>
            </div>
         </div>
      )
   );
};

export default ConfirmDeleteModal;
