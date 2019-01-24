import Navs from "../components/Nav"
import React, { Component } from "react";
import Wrapper from "../components/Wrapper";
import FreelancerCard from "../components/FreelancerCard";
import AddUser from "../components/AddUser";
import freelancers from "../freelancers.json";
import { Grid, Row } from "react-bootstrap";

class Dashboard extends Component {

    state ={
      freelancers
    }

    showPeople = id => {
        console.log(this.state.freelancers,id);
        const freelancers = this.state.freelancers.find(freelancer => freelancer.id === id)
        this.setState({freelancers:[freelancers]});
      };

    render() {
        return (
            <div>
              <Navs page ="Dashboard" image ="<i class='fas fa-plus'></i>"/>
                <Wrapper>
                    <Grid>
                        <Row>
                            {this.state.freelancers.map(freelancer => (
                                !freelancer.employer ?
                                <FreelancerCard style={{ float:"left"}}
                                    key={freelancer.id}
                                    id={freelancer.id}
                                    name={freelancer.name}
                                    image={freelancer.image}
                                    active={freelancer.active}
                                    showPeople={this.showPeople}
                                /> : <span></span>
                            ))}

                            <AddUser />
                        </Row>
                    </Grid>
                </Wrapper>
            </div>
        );
    }
}

export default Dashboard;
