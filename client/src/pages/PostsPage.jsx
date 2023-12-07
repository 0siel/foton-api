import { Header } from "../components/Header";
import { Navigation } from "../components/NavigationBar";
import axios from "axios";

function PostsPage() {
  const api = axios.create({
    baseURL: "http://localhost:8000/api",
    withCredentials: true,
  });

  const fetchPosts = async () => {
    try {
      const response = await api.get("/posts/");
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Header />
      <div className="content">
        <Navigation />
      </div>
      <h1>Posts Page</h1>
      <button onClick={fetchPosts}>Fetch Posts</button>
    </div>
  );
}

export { PostsPage };
