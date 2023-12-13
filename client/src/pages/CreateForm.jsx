import { useState } from "react";
import axios from "axios";
import { Header } from "../components/Header";
import { Navigation } from "../components/NavigationBar";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState();
  const [fileUrl, setFileUrl] = useState("");
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/foton/login";
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", file);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/posts/",
        formData,
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response);
      alert("Post creado con éxito!");
      window.location.href = "/foton/posts";
    } catch (error) {
      console.log(error);
    }
  };

  function handleChange(e) {
    console.log(e.target.files);
    setFileUrl(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  }

  return (
    <>
      <Header />
      <div className="content">
        <Navigation />
        <form onSubmit={handleSubmit} className="create-post-form">
          <h2 className="form-title">Nuevo post</h2>
          <div className="image-container">
            {fileUrl && (
              <img src={fileUrl} alt="Preview" className="image-preview" />
            )}
          </div>

          <div className="form-group">
            <label className="form-label">
              Title:
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-input"
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label className="form-label">
              Imagen:
              <input
                type="file"
                onChange={handleChange}
                className="form-input"
                required
              />
            </label>
          </div>
          <button type="submit" className="submit-button">
            Publicar
          </button>
        </form>
      </div>
    </>
  );
};

export { CreatePost };
