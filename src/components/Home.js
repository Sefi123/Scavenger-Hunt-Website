// import UserService from "../services/user.service";

import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="home">
      {/* <header>
        <nav>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </nav>
      </header> */}

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

      <footer className="classic-footer">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h3>About Us</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at
                enim vel odio vulputate scelerisque. Sed eget justo vel mauris
                porttitor placerat non non lorem.
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
