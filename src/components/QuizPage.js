import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadImage } from "../common/cloudinary";
import UserService from "../services/user.service";
import { toast } from "react-toastify";

const QuizPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [audio, setAudio] = useState("");
  const [images, setImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleAudioChange = async (e) => {
    await uploadImage(e.target.files[0], (url, flag) => {
      console.log(url, flag);
      if (url) setAudio(url);
    });
  };

  const handleImageChange = async (e, index) => {
    const newImages = [...images];
    await uploadImage(e.target.files[0], (url, flag) => {
      console.log(url, flag);
      if (url) newImages[index] = url;
    });
    // newImages[index] = e.target.files[0];
    setImages(newImages);
  };

  const handleRadioChange = (index) => {
    setSelectedImageIndex(index);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const formData = new FormData();
    // formData.append("title", title);
    // formData.append("audio", audio);
    // formData.append("image", images[selectedImageIndex]);
    console.log({ title, audio, images, correct: selectedImageIndex + 1 });
    const params = { title, audio, images, correct: selectedImageIndex + 1 };
    // Submit form data to API endpoint using fetch or Axios
    // ...

    const response = await UserService.createQuiz(params);
    if (response?.status == 200) {
      toast(response.data.message);
      navigate("/");
    }
    console.log(response);

    // Clear form inputs
    setTitle("");
    setAudio(null);
    setImages([]);
    setSelectedImageIndex(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" value={title} onChange={handleTitleChange} />
      </label>
      <br />
      <label>
        Audio:
        <input type="file" accept="audio/*" onChange={handleAudioChange} />
      </label>
      <br />
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index}>
          <label>
            Image {index + 1}:
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, index)}
            />
          </label>
          <label>
            <input
              type="radio"
              name="image"
              checked={selectedImageIndex === index}
              onChange={() => handleRadioChange(index)}
            />
            Select
          </label>
        </div>
      ))}
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default QuizPage;
