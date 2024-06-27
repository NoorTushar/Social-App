import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAllPosts = () => {
   const axiosPublic = useAxiosPublic();

   const { data: posts = [], refetch } = useQuery({
      queryKey: ["posts"],
      queryFn: async () => {
         const { data } = await axiosPublic("/posts");
         return data;
      },
   });

   return [posts, refetch];
};

export default useAllPosts;
