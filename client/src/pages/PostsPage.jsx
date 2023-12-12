import { useState, useEffect, useCallback } from "react";
import { Header } from "../components/Header";
import { Navigation } from "../components/NavigationBar";
import { Post } from "../components/Post";
import axios from "axios";

function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/foton/login";
  }

  const api = axios.create({
    baseURL: "http://localhost:8000/api",
    withCredentials: true,
  });

  const fetchPosts = useCallback(async () => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8000/api/posts/?page=${page}`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
          withCredentials: true,
        }
      );
      console.log(response);

      setPosts((prevPosts) => [...prevPosts, ...response.data.results]);
      setPage((prevPage) => prevPage + 1);
    } catch (err) {
      console.log("Error fetching posts ");
    }
    setLoading(false);
  }, [page, loading]);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:8000/api/posts/?page=1",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
            withCredentials: true,
          }
        );
        setPosts(response.data.results);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    getData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 20) {
        fetchPosts();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fetchPosts]);

  return (
    <div>
      <Header />
      <div className="content">
        <Navigation />

        <div className="posts-container">
          <h2>Inicio</h2>
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

export { PostsPage };
