import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import UserService from "../services/user.service";
import "./cardList.css";

const CardList = () => {
  const { state } = useLocation();
  const { scavenger } = state;
  const [cards, setCards] = useState([]);
  const [scavengerId, setScavengerId] = useState(null);
  const [loader, setLoader] = useState("");
  useEffect(() => {
    setScavengerId(scavenger?.id);
    const getCards = scavenger?.category?.map((obj) => obj.cards);
    console.log(getCards?.flat());
    setCards(getCards?.flat());
  }, []);

  const generatePDF = async (id) => {
    const response = await UserService.generateCardQR({ id });
    setLoader("");
    console.log(response);
  };

  const Card = ({ card, index }) => {
    console.log(card);
    return (
      // <div className="card-component" key={index}>
      //   <div className="image-container">
      //     {card?.images.map((image, index) => (
      //       <img src={image} alt={""} key={index} />
      //     ))}
      //   </div>
      //   <div className="audio-container">
      //     <audio controls>
      //       <source src={card?.audio} type="audio/mpeg" />
      //     </audio>
      //   </div>
      //   <div className="text-container">
      //     <h2>{card?.title}</h2>
      //     <p>Points: {card?.points}</p>
      //     {loader == card?.id ? (
      //       <div className="home-loader">
      //         <Spinner animation="border" variant="secondary" />
      //       </div>
      //     ) : (
      //       <button
      //         onClick={() => {
      //           setLoader(card?.id);
      //           generatePDF(`${scavengerId},${card?.id}`);
      //         }}
      //       >
      //         Generate PDF
      //       </button>
      //     )}
      //   </div>
      // </div>
      <div className="card card-item-container" key={index}>
        <div className="card-header">
          <h2>{card?.card_title}</h2>
          <div className="points">{card?.points}</div>
        </div>
        <div className="card-image">
          <img src={card?.image} alt="Card Image" />
        </div>
        <div className="card-text">
          {card?.options?.map((text, optionIndex) => (
            <p key={optionIndex} className="card-list-option-container">
              <p>{optionIndex + 1}:</p>
              <p>{text}</p>
            </p>
          ))}
        </div>
        {loader == card?.id ? (
          <div className="home-loader">
            <Spinner animation="border" variant="secondary" />
          </div>
        ) : (
          <button
            onClick={() => {
              setLoader(card?.id);
              generatePDF(`${scavengerId},${card?.id}`);
            }}
          >
            Generate PDF
          </button>
        )}
      </div>
    );
  };

  return (
    <div>
      <div className="card-page-title">CardList</div>
      <div className="grid-container">
        {cards?.length != 0 &&
          cards?.map((card, index) => {
            return <Card card={card} index={index} />;
          })}
      </div>
    </div>
  );
};

export default CardList;
