import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PostsPage } from "./pages/PostsPage";
import { TopPostsPage } from "./pages/TopPostsPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/foton" element={<Navigate to="/foton/posts" />} />
        <Route path="/foton/login" element={<LoginPage />} />
        <Route path="/foton/posts" element={<PostsPage />} />
        <Route path="/foton/fotos-del-dia" element={<TopPostsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
