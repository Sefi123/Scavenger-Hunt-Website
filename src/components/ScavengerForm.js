import React, { useState } from "react";
import Collapsible from "react-collapsible";
import { v4 } from "uuid";
import { uploadImage } from "../common/cloudinary";
import UserService from "../services/user.service";
import "./scavengerForm.css";

const Form = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [password, setPassword] = useState("");
  const [categories, setCategories] = useState([
    {
      title: "",
      cards: [
        {
          id: v4(),
          card_title: "",
          images: [],
          audio: "",
          points: 0,
        },
      ],
    },
  ]);

  const handleCategoryChange = (index, event) => {
    const { name, value } = event.target;
    const list = [...categories];
    list[index][name] = value;
    setCategories(list);
  };

  const handleCardValues = (cardIndex, index, event) => {
    const { name, value } = event.target;
    const list = [...categories];
    // list[index].cards[cardIndex];
    list[index].cards[cardIndex][name] = value;
    console.log(name, value, list[index].cards[cardIndex]);
    setCategories([...list]);
  };

  const handleImageChange = async (cardIndex, index, event) => {
    const { files } = event.target;
    const list = [...categories];
    const imageList = [...list[index]?.cards[cardIndex]?.images];
    for (let i = 0; i < files.length; i++) {
      await uploadImage(files[i], (url, flag) => {
        console.log(url, flag);
        if (url) imageList.push(url);
      });
    }
    console.log(imageList);
    list[index].cards[cardIndex].images = [...imageList];
    setCategories(list);
  };

  const handleAudioChange = async (cardIndex, index, event) => {
    const { files } = event.target;
    const list = [...categories];
    await uploadImage(files[0], (url, flag) => {
      console.log(url, flag);
      if (url) list[index].cards[cardIndex].audio = url;
    });
    // list[index].cards[cardIndex].audio = files[0];
    setCategories(list);
  };

  const handleAddCategory = () => {
    setCategories([
      ...categories,
      {
        title: "",
        cards: [
          {
            id: v4(),
            card_title: "",
            images: [],
            audio: "",
            points: 0,
          },
        ],
      },
    ]);
  };

  const handleAddCard = (index) => {
    let duplicateArray = categories;
    console.log(duplicateArray[index]);
    duplicateArray[index] = {
      ...duplicateArray[index],
      cards: [
        ...duplicateArray[index].cards,
        {
          id: v4(),
          card_title: "",
          images: [],
          audio: "",
          points: 0,
        },
      ],
    };
    setCategories([...duplicateArray]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log({ title, location, password, category: categories });
    const params = { title, location, password, category: categories };
    const response = await UserService.createScavengerHunt(params);
    console.log(response);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container form-group">
      <h2>Create Scavenger Hunt</h2>
      <div>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Location:
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      {categories.map((category, index) => (
        <div key={index} className="category-container">
          <h5>Category {index + 1}</h5>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={category.title}
              onChange={(event) => handleCategoryChange(index, event)}
            />
          </label>
          {category?.cards?.length !== 0 &&
            category?.cards?.map((card, cardIndex) => (
              <Collapsible trigger={`Card ${cardIndex + 1}`} key={cardIndex}>
                <span>
                  <label>
                    Card Title:
                    <input
                      type="text"
                      name="card_title"
                      value={card.card_title}
                      onChange={(event) =>
                        handleCardValues(cardIndex, index, event)
                      }
                    />
                  </label>
                  <div className="card-group">
                    <label>
                      Images:
                      <input
                        type="file"
                        name="images"
                        multiple
                        onChange={(event) =>
                          handleImageChange(cardIndex, index, event)
                        }
                      />
                    </label>
                  </div>
                  <label>
                    Audio:
                    <input
                      type="file"
                      name="audio"
                      onChange={(event) =>
                        handleAudioChange(cardIndex, index, event)
                      }
                    />
                  </label>
                  <label>
                    Points:
                    <input
                      type="number"
                      name="points"
                      value={card?.points}
                      onChange={(event) => {
                        if (+event.target.value <= 100)
                          handleCardValues(cardIndex, index, event);
                      }}
                    />
                  </label>
                </span>
              </Collapsible>
            ))}
          <button
            type="button"
            onClick={() => handleAddCard(index)}
            className="add-card-button "
          >
            Add Card
          </button>
        </div>
      ))}

      <div className="buttons-container ">
        <button
          type="button"
          onClick={handleAddCategory}
          className="add-button add-category-button-color"
        >
          Add Category
        </button>
        <button type="submit" className="add-button">
          Submit
        </button>
      </div>
    </form>
  );
};

export default Form;
