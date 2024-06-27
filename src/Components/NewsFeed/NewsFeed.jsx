import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import useAllPosts from "../../Hooks/useAllPosts";
import PostCard from "../PostCard";

const NewsFeed = () => {
   const [posts, refetch] = useAllPosts();
   console.log(posts);
   return (
      <section className="max-w-[1000px] mx-auto border p-6">
         <div className="text-xl medium">News Feed</div>
         <div>Add a post</div>
         <Tabs>
            <div className="max-w-[200px]">
               <TabList>
                  <Tab>All Posts</Tab>
                  <Tab>Your Posts</Tab>
               </TabList>
            </div>

            {/* All Posts Panel */}
            <TabPanel>
               {posts.map((post) => (
                  <PostCard post={post} key={post._id} refetch={refetch} />
               ))}
            </TabPanel>

            <TabPanel>
               <h2>Any content 2</h2>
            </TabPanel>
         </Tabs>
      </section>
   );
};

export default NewsFeed;
