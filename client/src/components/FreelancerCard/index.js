import React from "react";
import "./style.css";
import { Image, Label } from "react-bootstrap";
import { Link } from "react-router-dom";

function FreelancerCard(props) {


  return (
    <div className="f-card" xs={12} sm={12} md={4}>

    <Link to={"/account/"+props.id}>
      <Image className="profile-sm" alt={props.first_name} src={props.image} circle />
      <div className="f-text">
        <p>{props.first_name} {props.last_name}</p>
        {!props.active ? <p><Label bsStyle="default">Idle</Label></p> : <p><Label bsStyle="success">Active{props.active}</Label></p>}
      </div>
    </Link>

    </div>
  );
}

export default FreelancerCard;
