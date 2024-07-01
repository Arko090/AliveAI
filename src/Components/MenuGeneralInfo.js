import React from "react";
import "../StyleSheets/Comp.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from "@fortawesome/free-solid-svg-icons";

const MenuGeneralInfo = () => {
  const profile = {
    image: 'profile-image.jpg',
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 34567890',
    address: '123 Main St, Springfield, USA',
  };

  return (
    <div className="container profile-container">
        <br></br> 
      <div>
      <span style={{paddingLeft : "20px", fontSize: "1.8em"}}><FontAwesomeIcon icon={faUser}/>  General Information</span>
      <button style={{float: "right", border: "none", background: "none"}}>Edit</button>
      </div>
      <br></br>
      <br></br>
      <div className="profile-field">
        <label htmlFor="full-name">Full Name:</label>
        <p id="full-name">{profile.fullName}</p>
      </div>
      <div className="profile-field">
        <label htmlFor="email">Email ID:</label>
        <p id="email">{profile.email}</p>
      </div>
      <div className="profile-field">
        <label htmlFor="phone"> Phone Number: </label>
        <p id="phone">{profile.phone}</p>
      </div>
      <div className="profile-field">
        <label htmlFor="address">Address:</label>
        <p id="address">{profile.address}</p>
      </div>
    </div>
  );
};

export default MenuGeneralInfo;