import axios from "axios";
import { useCallback, useEffect, useState } from "react";

function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);

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
          withCredentials: true,
        }
      );

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
          { withCredentials: true }
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
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchPosts]);

  return (
    <div>
      <Header />
      <Navigation />
      <h1>Posts</h1>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
