import Navs from "../components/Nav"
import React, { Component } from "react";
import Wrapper from "../components/Wrapper";
import FreelancerCard from "../components/FreelancerCard";
import AddUser from "../components/AddUser";
import freelancers from "../freelancers.json";
import { Grid, Row } from "react-bootstrap";
import axios from 'axios';

class Dashboard extends Component {

    state ={
      freelancers
    }

    showPeople = id => {
        console.log(this.state.freelancers.id);
        const freelancers = this.state.freelancers.find(freelancer => freelancer.id === id)
        this.setState({freelancers:[freelancers]});
      };

    handleLogout() {
      axios.post('/api/logout', () => {
        console.log('logged out')
      })
      .then(() => {
        this.props.history.push('/dashboard');
      })
    }

    componentDidMount() {
      axios.get('/api/allUsers', () => {
        console.log(true)
      }).then(res => {
        console.log(res.data.users);
        this.setState({
          freelancers: res.data.users
        })
      })
    }

    render() {
        return (
            <div>
              <Navs
              page="Dashboard"
              image="<i class='fas fa-plus'></i>"
              logout={this.handleLogout}
              />
                <Wrapper>
                    <Grid>
                        <Row>
                            {this.state.freelancers.map(freelancer => (
                                !freelancer.employer ?
                                <FreelancerCard style={{ float:"left"}}
                                    key={freelancer.id}
                                    id={freelancer.id}
                                    first_name={freelancer.first_name}
                                    last_name={freelancer.last_name}
                                    image="images/user.png"
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
