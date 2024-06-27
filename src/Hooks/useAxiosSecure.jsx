import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
   baseURL: import.meta.env.VITE_API_URL,
});
const useAxiosSecure = () => {
   const navigate = useNavigate();
   const { logoutUser } = useAuth();
   // interceptor request er time e token pathabo
   axiosSecure.interceptors.request.use(
      function (config) {
         // will take the token from local storage
         const token = localStorage.getItem("access-token");
         // console.log("request stopped by interceptor", token);
         // will store the token in the headers.authorization
         config.headers.authorization = `Bearer ${token}`;
         // will simply return the config
         return config;
      },
      function (error) {
         // do something with request error
         return Promise.reject(error);
      }
   );

   // interceptor response use kore 401 and 403 handle korbo
   axiosSecure.interceptors.response.use(
      function (response) {
         // returning normal response with 200 status codes
         // without doing anything else
         return response;
      },
      // but if the response has errors, i.e, status code outside 200
      async function (error) {
         // will get the status code from the error
         const status = error?.response?.status;

         console.log("status error in the interceptor", status);
         // if 401 or 403 message from response then will logout user
         // and navigate to login page
         if (status === 401 || status === 403) {
            await logoutUser();
            navigate("/login");
         }

         return Promise.reject(error);
      }
   );
   return axiosSecure;
};

export default useAxiosSecure;
