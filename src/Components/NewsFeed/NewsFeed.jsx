import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const NewsFeed = () => {
   return (
      <section className="max-w-[1000px] mx-auto border p-6">
         <div className="text-xl medium">News Feed</div>
         <Tabs>
            <div className="max-w-[200px]">
               <TabList>
                  <Tab>All Posts</Tab>
                  <Tab>Your Posts</Tab>
               </TabList>
            </div>

            <TabPanel>
               <h2>Any content 1</h2>
            </TabPanel>

            <TabPanel>
               <h2>Any content 2</h2>
            </TabPanel>
         </Tabs>
      </section>
   );
};

export default NewsFeed;
