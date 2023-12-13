//Componete post
//Este cmponente se encarga de renderizar un post, recibe como prop un objeto post que contiene la informacion del post a renderizar
//El objeto post tiene la siguiente estructura:

import { useState } from "react";
import PropTypes from "prop-types"; // Se importa PropTypes para poder validar las props del componente
import { format } from "date-fns"; // Se importa la funcion format de date-fns para poder formatear la fecha
import { FaHeart, FaRegHeart } from "react-icons/fa"; //Se importan los iconos de react-icons para poder usarlos en el boton de like
import axios from "axios";
import {} from "date-fns/locale"; //Se importa el locale de date-fns para poder formatear la fecha en español

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

  //Renderiza el post usando la informacion del objeto post mediante HTML con las propiedades de title, image, username y date_posted además de un boton para dar like al post que muestra la cantidad de likes
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
// Esta parte del codigo se encarga de validar que los props que recibe el componente sean del tipo y forma esperada
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
