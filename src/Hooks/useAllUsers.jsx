import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllUsers = () => {
   const axiosSecure = useAxiosSecure();

   const { data: users = [], refetch } = useQuery({
      queryKey: ["users"],
      queryFn: async () => {
         const { data } = await axiosSecure("/users");
         return data;
      },
   });

   return [users, refetch];
};

export default useAllUsers;
