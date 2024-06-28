import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllPosts = () => {
   const axiosSecure = useAxiosSecure();

   const { data: posts = [], refetch } = useQuery({
      queryKey: ["posts"],
      queryFn: async () => {
         const { data } = await axiosSecure("/posts");
         return data;
      },
   });

   return [posts, refetch];
};

export default useAllPosts;
