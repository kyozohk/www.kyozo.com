import { createBrowserRouter, RouteObject } from "react-router";
import { Layout } from "@/app/components/Layout";
import { ModalLayout } from "@/app/components/ModalLayout";
import { Home } from "@/app/pages/Home";
import { Bio } from "@/app/pages/Bio";
import { Feed } from "@/app/pages/Feed";
import { Community } from "@/app/pages/Community";
import { Contact } from "@/app/pages/Contact";
import { ArticleDetail } from "@/app/pages/ArticleDetail";
import { ModalHome } from "@/app/pages/ModalHome";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "bio", element: <Bio /> },
      { path: "feed", element: <Feed /> },
      { path: "article/:id", element: <ArticleDetail /> },
      { path: "community", element: <Community /> },
      { path: "contact", element: <Contact /> },
    ],
  },
  {
    path: "/modal",
    element: <ModalLayout />,
    children: [
      { index: true, element: <ModalHome /> },
    ],
  },
];

export const router = createBrowserRouter(routes);