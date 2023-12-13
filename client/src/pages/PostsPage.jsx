import { useState, useEffect, useCallback } from "react";
import { Header } from "../components/Header";
import { Navigation } from "../components/NavigationBar";
import { Post } from "../components/Post";
import axios from "axios";

//Creacion de la pagina de Posts
function PostsPage() {
  const [posts, setPosts] = useState([]); //Arreglo de posts
  const [page, setPage] = useState(2); //Indice da la pagina hacia la que se hace la peticion
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token"); //Obtiene el token del local storage para incluirlo en el header de la peticion

  if (!token) {
    // Si no existe un token en el local storage, redirige a la pagina de login para obtener uno
    window.location.href = "/foton/login";
  }
  //Funcion que hace la peticion a la API para obtener los posts
  const fetchPosts = useCallback(async () => {
    if (loading) return; //Si esta esperando una respuesta, no hace nada

    setLoading(true); //Cambia el estado de loading a true para indicar que se esta esperando una respuesta
    try {
      //Peticion a la API para obtener los posts
      const response = await axios.get(
        `http://localhost:8000/api/posts/?page=${page}`,
        {
          //Incluye el token en el header de la peticion
          headers: {
            Authorization: `Token ${token}`,
          },
          withCredentials: true, //Incluye las cookies en la peticion
        }
      );
      //console.log(response);
      //Agrega los posts de la útltima peticion a los posts que ya se tenian
      setPosts((prevPosts) => [...prevPosts, ...response.data.results]);
      setPage((prevPage) => prevPage + 1); //Aumenta el indice de la pagina para la siguiente peticion
    } catch (err) {
      //console.log("Error fetching posts ");
    }
    setLoading(false); //Cambia el estado de loading a false para indicar que ya se obtuvo una respuesta
  }, [page, loading, token]); //Dependencias de la funcion

  //Funcion que se ejecuta cuando se monta el componente, obtiene los posts de la primera pagina
  useEffect(() => {
    const getData = async () => {
      setLoading(true); //Cambia el estado de loading a true para indicar que se esta esperando una respuesta
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
  }, [token]); //Dependencias de la funcion

  //Funcion que se ejecuta cuando se monta el componente, agrega un listener al scroll para detectar cuando se llega al final de la pagina
  useEffect(() => {
    //Funcion que se ejecuta cuando se hace scroll
    const handleScroll = () => {
      //Obtiene la posicion del scroll
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      //Si se llega al final de la pagina, hace una peticion a la API para obtener los posts de la siguiente pagina
      if (scrollTop + clientHeight >= scrollHeight - 20) {
        fetchPosts();
      }
    };

    //Agrega el listener al scroll
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll); //Elimina el listener al desmontar el componente
    };
  }, [fetchPosts]); //Dependencias de la funcion

  //Renderiza los posts
  return (
    <div>
      <Header />
      <div className="content">
        <Navigation />

        <div className="posts-container">
          {/**/}
          <h2>Inicio</h2>
          <div>
            {/*
            Ejecuta la funcion map para renderizar cada post en el arreglo de posts, llamando al componente Post, pasandole como prop el post y agraegandole un key
            */}
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
