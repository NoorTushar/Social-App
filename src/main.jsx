import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes";
import AuthProvider from "./Providers/AuthProvider";
import { Toaster } from "react-hot-toast";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
   <React.StrictMode>
      <AuthProvider>
         <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <Toaster />
            <Tooltip id="my-tooltip" />
         </QueryClientProvider>
      </AuthProvider>
   </React.StrictMode>
);
