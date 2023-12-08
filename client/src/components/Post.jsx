import { useState } from "react";
import PropTypes from "prop-types";

function Post({ post }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);

  const handleLike = () => {
    setIsLiked((prevIsLiked) => !prevIsLiked);
  };
  const cantidadLikes = Array.isArray(likes) ? likes.length : 0;

  return (
    <div className="post">
      <img src={post.image} alt="" />
      <p>{post.user.username}</p>
      <p>{post.title}</p>
      <p>Likes: {cantidadLikes}</p>
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
