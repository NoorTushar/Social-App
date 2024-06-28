import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import { GoHomeFill } from "react-icons/go";
import { RxHamburgerMenu } from "react-icons/rx";
import toast from "react-hot-toast";

const NavBar = () => {
   const { user, logoutUser } = useAuth();
   const navigate = useNavigate();

   const handleLogout = async (e) => {
      e.preventDefault();
      try {
         await logoutUser();
         toast("See you soon 😊");
         navigate("/");
      } catch (error) {
         console.log(error);
      }
   };

   const navLinks = (
      <>
         <li>
            <Link to={"/"}>
               <GoHomeFill className="text-2xl text-black" />
            </Link>
         </li>
      </>
   );

   return (
      <nav className="navbar bg-base-100">
         <div className="navbar-start">
            <div className="dropdown">
               <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost lg:hidden"
               >
                  <RxHamburgerMenu />
               </div>
               <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
               ></ul>
            </div>
            <a className="btn btn-ghost text-xl">Social-App</a>
         </div>
         <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{navLinks}</ul>
         </div>
         <div className="navbar-end">
            {user ? (
               <div className="dropdown dropdown-end">
                  <div
                     tabIndex={0}
                     role="button"
                     className="btn btn-ghost btn-circle avatar"
                  >
                     <div className="w-10 rounded-full">
                        <img
                           alt="Tailwind CSS Navbar component"
                           src={user?.photoURL || user?.image}
                        />
                     </div>
                  </div>
                  <ul
                     tabIndex={0}
                     className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                  >
                     <li>
                        <button onClick={handleLogout}>Logout</button>
                     </li>
                  </ul>
               </div>
            ) : (
               <button>Login</button>
            )}
         </div>
      </nav>
   );
};

export default NavBar;
