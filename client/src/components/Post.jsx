import { useState } from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import axios from "axios";
import {} from "date-fns/locale";

function Post({ post }) {
  const cantidadLikes = Array.isArray(post.likes) ? post.likes.length : 0;
  const user_id = localStorage.getItem("user_id");
  const user_has_liked = post.likes.includes(parseInt(user_id));
  const [isLiked, setIsLiked] = useState(user_has_liked);
  const [likes, setLikes] = useState(cantidadLikes);
  const token = localStorage.getItem("token");
  const postId = post.id;

  const sendLike = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/posts/${postId}/like/`,
        {},
        {
          headers: {
            Authorization: `Token ${token}`,
          },
          withCredentials: true,
        }
      );

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleLike = () => {
    setIsLiked((prevIsLiked) => !prevIsLiked);
    sendLike();
    if (isLiked) {
      setLikes((prevLikes) => prevLikes - 1);
      return;
    }
    setLikes((prevLikes) => prevLikes + 1);
  };

  //const date = format(new Date(post.date_posted), "dd MMM");
  const date = format(new Date(post.date_posted), "dd MMM, hh:mm a");

  return (
    <div className="post">
      <img src={post.image} alt="" />
      <p>{post.user.username}</p>
      <p>
        <b>{post.title}</b>
      </p>
      <p>{date}</p>
      <div className="like-section">
        <button onClick={handleLike}>
          {isLiked ? (
            <FaHeart style={{ color: "red", fill: "red", stroke: "red" }} />
          ) : (
            <FaRegHeart />
          )}
        </button>
        <p>{likes}</p>
      </div>
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    image: PropTypes.string.isRequired,
    likes: PropTypes.arrayOf(PropTypes.number).isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    date_posted: PropTypes.string.isRequired,
    user_has_liked: PropTypes.bool.isRequired,
    // Add other required properties of the post object if any
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      profile_picture: PropTypes.string.isRequired,
      // Add other required properties of the user object if any
    }).isRequired,
  }).isRequired,
};

export { Post };
