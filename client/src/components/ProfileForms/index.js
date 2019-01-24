import React from "react";
import "./style.css";
import Wrapper from "../Wrapper";
import freelancers from "../../freelancers.json";
import ProfileCard from "../ProfileCard"
import { Grid, Row, Col } from "react-bootstrap";


function ProfileForms(props) {

    return (
        <div>
            <Wrapper>
                <Grid>
                    <Row>
                        <Col style={{ paddingBottom:"20px"}} xs={12} sm={12} md={6}>
                            <ProfileCard 
                                image={"../" + freelancers[props.id].image}
                            />
                        </Col>
                        <Col xs={12} sm={12} md={6}>
                            <div className="p-card">
                                <div className="p-input">
                                    <p >
                                        <strong>Justo ID: </strong>
                                        #{props.id}
                                    </p><hr/>
                                    <form>
                                        <p>
                                            <strong>Username: </strong> 
                                            <input data_id={props.id} type="text" name="username" placeholder="erik@scott.com" />
                                        </p><hr/>
                                    </form>
                                    <form>
                                        <p>
                                            <strong>Password: </strong> 
                                            <input data_id={props.id} type="password" name="password" />
                                        </p><hr/>
                                    </form>
                                    <form>
                                        <p>
                                            <strong>Name: </strong> 
                                            <input data_id={props.id} type="text" name="name" placeholder="Erik"/>
                                        </p><hr/>
                                    </form>
                                    <form>
                                        <p>
                                            <strong>Profession: </strong> 
                                            <input data_id={props.id} type="text" name="profession" placeholder="Lead Instructor"/>
                                        </p><hr/>
                                    </form>
                                    <form>
                                        <p>     
                                            <strong>Rate/hour: </strong> 
                                            <input data_id={props.id} type="text" name="rate" placeholder="$35"/>
                                        </p><hr/>
                                    </form>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </Wrapper>
        </div>
    );
}

export default ProfileForms;