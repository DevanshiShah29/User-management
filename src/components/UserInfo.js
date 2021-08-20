import React, { useEffect } from "react";

const UserInfo = (props) => {
  return (
    <div>
      <div id="myModal" className="modal">
        <div className="modal-content">
            <span className="close" onClick={() => props.handlePopup()}>
              &times;
            </span>
          <div>
           
            <img
              className="user-image"
              src={props.popupData.picture.large}
              alt="user"
            />
            <div className="name">
              {props.popupData.name.title +
                ". " +
                props.popupData.name.first +
                " " +
                props.popupData.name.last}
            </div>
            <div className="email">{props.popupData.email}</div>
            <div className="address">
              {props.popupData.location.street.number +
                ", " +
                props.popupData.location.street.name +
                ", " }
                <br/>
               { props.popupData.location.city +
                ", " +
                props.popupData.location.state +
                ", " +
                props.popupData.location.country}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
