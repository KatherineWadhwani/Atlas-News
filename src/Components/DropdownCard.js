/* Purpose: Displays article as a dropdown card which includes the article's title, image, source, and publication date. When clicked on, card toggles
open, revealing a sumamry and link to the full article. Clidking on the card again will toggle it closed. */

import React, { useState } from "react";
import "../Styles/DropdownCard.css";

const DropdownCard = ({ img, title, URL, summary, source, date }) => {


  //Variable to determine if card is expanded or collapsed.
  const [isOpen, setIsOpen] = useState(false);

  //Toggle if card is expanded or collapsed.
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className={`dropdown-card ${isOpen ? "open" : ""}`} id="card" onClick={handleToggle}>
        <div className="img-holder">
          <div className="card-img">
            {img}
          </div>
        </div>
        <div className="card-info">
          <div className="card-title">
            {title}
          </div>
          <div className="card-source">
            Source: {source}, {date}
          </div>
        </div>
        <svg
          className={`dropdown-icon ${isOpen ? "open" : ""}`}
          onClick={handleToggle}
          width="22"
          height="39"
          viewBox="0 0 22 39"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_1641_7843)">
            <path
              d="M0.799268 37.3847C0.287497 36.8728 0 36.1786 0 35.4547C0 34.7309 0.287497 34.0366 0.799268 33.5247L15.2485 19.0755L0.799268 4.62634C0.302001 4.11148 0.026846 3.42191 0.0330658 2.70615C0.0392856 1.99038 0.326382 1.3057 0.832522 0.79956C1.33866 0.293421 2.02335 0.00632298 2.73911 0.000103196C3.45487 -0.00611659 4.14444 0.26904 4.6593 0.766307L21.0385 17.1455C21.5503 17.6574 21.8378 18.3517 21.8378 19.0755C21.8378 19.7994 21.5503 20.4936 21.0385 21.0055L4.6593 37.3847C4.14737 37.8965 3.45315 38.184 2.72928 38.184C2.00542 38.184 1.31119 37.8965 0.799268 37.3847Z"
              fill="darkblue"
            />
          </g>
          <defs>
            <clipPath id="clip0_1641_7843">
              <rect width="22" height="39" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
      {isOpen && <div className="dropdown-content">

        <div className="summary">
          {summary}
        </div>
        <a href={URL.props.children} className="button" target="_blank">Click to View Article</a>

      </div>}
    </div>
  );
};

export default DropdownCard;
