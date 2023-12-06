import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PostsPage } from "./pages/PostsPage";
import { TopPostsPage } from "./pages/TopPostsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/posts" />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/fotos-del-dia" elementt={<TopPostsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
