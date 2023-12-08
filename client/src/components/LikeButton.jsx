import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";

function LikeButton({ post }) {
  const [isLiked, setIsLiked] = useState(post.user_has_liked);
  const [likes, setLikes] = useState(post.likes);

  const cantidadLikes = Array.isArray(likes) ? likes.length : 0;
  const handleLike = () => {
    setIsLiked((prevIsLiked) => !prevIsLiked);
    /*Send like to backend*/
  };

  return (
    <div className="like-button">
      <button onClick={handleLike}>
        {isLiked ? <FaHeart /> : <FaRegHeart />}
      </button>
      <p>{cantidadLikes}</p>
    </div>
  );
}

export { LikeButton };
