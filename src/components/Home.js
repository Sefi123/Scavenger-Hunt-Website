// import UserService from "../services/user.service";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import UserService from "../services/user.service";
import { GiAbstract022 } from "react-icons/gi";
import Spinner from "react-bootstrap/Spinner";
import "./home.css";

function Home() {
  const navigate = useNavigate();
  const [scavengers, setScavengers] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    fetchScavengers();
  }, []);

  const fetchScavengers = async () => {
    setLoader(true);
    const user = await JSON.parse(localStorage.getItem("user"));
    const response = await UserService.getScavengerHunt({ id: user?.id });
    setLoader(false);
    if (response) setScavengers(response?.data);
  };

  function Grid({ items }) {
    return (
      <div className="grid-container">
        {items.map((scavenger, index) => (
          <Card
            key={index}
            onClick={() => navigate("/cardList", { state: { scavenger } })}
            className="card-height"
          >
            <Card.Body>
              <Card.Title className="home-card-title-container">
                <GiAbstract022 />
                Title: {scavenger?.title}
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Category:{" "}
                {scavenger?.category?.map((data) => data?.title)?.toString()}
              </Card.Subtitle>
              <Card.Text>
                Total Cards:{" "}
                {scavenger?.category?.map((obj) => obj.cards)?.flat()?.length}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="home">
      <main>
        <div className="hero">
          <h1>Welcome to Scavenger Hunt</h1>
          <p>
            Want some excitement? You are come on right place. You can create
            Scavenger Hunt for play. Just Click below button to create Scavenger
            Hunt. Hope You'll enjoy it!
          </p>
          <button onClick={() => navigate("/scavenger_form")}>CREATE</button>
        </div>
      </main>

      <div className="home-scavenger-list-title">Scavengers List</div>

      {scavengers?.length == 0 && loader ? (
        <div className="home-loader">
          <Spinner animation="border" variant="secondary" />
        </div>
      ) : (
        <Grid items={scavengers} />
      )}
      <footer className="classic-footer">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h3>About Us</h3>
              <p>
                A scavenger hunt is a fun activity that involves searching for a
                list of items in a designated area. With the advancement of
                technology, the traditional scavenger hunt has evolved into a
                mobile app that provides a modern twist on this classic game.
              </p>
            </div>
            <div className="col-md-6">
              <h3>Contact Us</h3>
              <ul>
                <li>123 Main Street</li>
                <li>Anytown, USA 12345</li>
                <li>Phone: (123) 456-7890</li>
                <li>Email: info@mysite.com</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
