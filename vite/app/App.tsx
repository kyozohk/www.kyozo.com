import { Routes, Route, MemoryRouter } from "react-router";
import { Layout } from "@/app/components/Layout";
import { ModalLayout } from "@/app/components/ModalLayout";
import { VisionaryCircleLayout } from "@/app/components/VisionaryCircleLayout";
import { Home } from "@/app/pages/Home";
import { Bio } from "@/app/pages/Bio";
import { Feed } from "@/app/pages/Feed";
import { Community } from "@/app/pages/Community";
import { Contact } from "@/app/pages/Contact";
import { ArticleDetail } from "@/app/pages/ArticleDetail";
import { ModalHome } from "@/app/pages/ModalHome";
import { NotFound } from "@/app/pages/NotFound";
import { Explore } from "@/app/pages/Explore";
import { VisionaryCircleHome } from "@/app/pages/VisionaryCircleHome";
import { VisionaryCircleBio } from "@/app/pages/VisionaryCircleBio";
import { VisionaryCircleFeed } from "@/app/pages/VisionaryCircleFeed";
import { VisionaryCircleCommunity } from "@/app/pages/VisionaryCircleCommunity";
import { VisionaryCircleArticleDetail } from "@/app/pages/VisionaryCircleArticleDetail";

export default function App() {
  return (
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="bio" element={<Bio />} />
          <Route path="feed" element={<Feed />} />
          <Route path="article/:id" element={<ArticleDetail />} />
          <Route path="community" element={<Community />} />
          <Route path="contact" element={<Contact />} />
          <Route path="explore" element={<Explore />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/modal" element={<ModalLayout />}>
          <Route index element={<ModalHome />} />
        </Route>
        <Route path="/visionary-circle" element={<VisionaryCircleLayout />}>
          <Route index element={<VisionaryCircleHome />} />
          <Route path="bio" element={<VisionaryCircleBio />} />
          <Route path="feed" element={<VisionaryCircleFeed />} />
          <Route path="community" element={<VisionaryCircleCommunity />} />
          <Route path="article/:id" element={<VisionaryCircleArticleDetail />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
}