import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { Navigation } from "../components/NavigationBar";
import { Post } from "../components/Post";
import axios from "axios";

function TopPostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/foton/login";
  }

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:8000/api/top-posts/",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
            withCredentials: true,
          }
        );
        console.log(response.data);
        setPosts(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    getData();
  }, [token]);

  return (
    <div>
      <Header />
      <div className="content">
        <Navigation />

        <div className="posts-container">
          <h2>Fotos del día</h2>
          <div>
            {posts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </div>
          {loading && <p>Loading...</p>}
        </div>
      </div>
    </div>
  );
}

export { TopPostsPage };
