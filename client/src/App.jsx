// App.js:
//Descripcion del componente:
//Componente que renderiza la aplicacion, incluye las rutas de las diferentes paginas de la aplicacion

//importamos los componentes de react-router-dom para poder usarlos en la aplicacion, BrowserRouter, Routes, Route y Navigate
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PostsPage } from "./pages/PostsPage";
import { TopPostsPage } from "./pages/TopPostsPage";
import LoginPage from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { CreatePost } from "./pages/CreateForm";

function App() {
  return (
    <BrowserRouter>
      {/* Se envuelve la aplicacion con el componente BrowserRouter para poder usar las rutas en la aplicacion */}
      <Routes>
        <Route path="/foton" element={<Navigate to="/foton/posts" />} />
        <Route path="/foton/login" element={<LoginPage />} />
        <Route path="/foton/signup" element={<SignupPage />} />
        <Route path="/foton/posts" element={<PostsPage />} />
        <Route path="/foton/fotos-del-dia" element={<TopPostsPage />} />
        <Route path="foton/create" element={<CreatePost />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
