import React from "react";
import "./style.css";
import Wrapper from "../Wrapper";
import ProfileTracker from "../ProfileTracker"
import FreelancerCard from "../FreelancerCard"
import freelancers from "../../freelancers.json";
import { Grid, Row, Col } from "react-bootstrap";
import axios from 'axios';
import Upload from '.'



class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timerStarted: false,
            timerStopped: true,
            hours: 0,
            minutes: 0,
            seconds: 0,
            hourlyPay: 20,
            payAmount: 0,
            captures: [],
            id: props.id,
            freelancers,
            user_id: null
        };
        this.doMath = this.doMath.bind(this)
    }

    componentWillMount(){
      this.setState({ user_id: this.props.id })
      axios.post('/api/requestInfoOnUser', () => {
        console.log('retrieve user')
      })
      .then(res => {
        console.log(this.state.id)
        console.log(res)
      })
    }

    handleTimerStart(e) {
        e.preventDefault();
        if (this.state.timerStopped) {
            this.timer= setInterval(()=> {
                this.setState({
                    timerStarted: true,
                    timerStopped: false
                })
                if(this.state.timerStarted) {
                    this.setState((prevState) => { return {seconds: prevState.seconds +1}});

                    if(this.state.seconds >= 60) {
                        this.setState((prevState) =>{ return { minutes: prevState.minutes + 1, seconds: 0}});
                    }
                    if (this.state.minutes >= 60) {
                        this.setState((prevState) =>{return { hours: prevState.hours + 1, minutes: 0, seconds: 0}});
                    }
                }
            }, 1000);
        }
    }

    handleTimerStop (e) {
        e.preventDefault();
        this.setState({timerStarted: false, timerStopped: true});
        clearInterval(this.timer);
    }

    handleTimerReset(e){
        e.preventDefault();
        this.setState({
            timerStarted: false,
            timerStopped: true,
            seconds: 0,
            minutes: 0,
            hours: 0 })
        clearInterval(this.timer)
    }

    doMath(hrs, mins, secs)  {
        let countAmount = (hrs+mins/60+secs/60/60)*this.state.hourlyPay
        this.setState({payAmount: countAmount })
        return this.state.payAmount
    }

    handleTimeCapture () {
        this.setState((prevState)=>({ captures: [...prevState.captures, this.state.hours + ":" + this.state.minutes + ":" + this.state.seconds]}))
        this.doMath(this.state.hours, this.state.minutes, this.state.seconds)
    }

    render() {
        return (
            <div>
                <Wrapper>
                    <Grid>
                        <Row>

                            <Col xs={12} sm={12} md={6}>
                                <FreelancerCard
                                    name={freelancers[this.state.user_id].name}
                                    image={"../" + freelancers[this.state.user_id].image}
                                    active={freelancers[this.state.user_id].active}
                                    showPeople={this.showPeople}
                                />
                            </Col>

                            <Col xs={12} sm={12} md={6}>
                                <ProfileTracker
                                    key={freelancers[this.state.user_id].id}
                                    id={freelancers[this.state.user_id].id}
                                    name={freelancers[this.state.user_id].name}
                                    profession={freelancers[this.state.user_id].profession}
                                    hours={this.state.hours} minutes={this.state.minutes} seconds= {this.state.seconds}
                                    rate={freelancers[this.state.user_id].rate}
                                    payAmount={this.state.payAmount}>
                                </ProfileTracker>
                                <div className="timer-controls">
                                    <div style={{ paddingTop:"20px",color:"#ECECEC" }}>Use the buttons below to track your progress:</div>
                                    <button className="timer-buttons" onClick={this.handleTimerStart.bind(this)}><span className="glyphicon glyphicon-play"></span></button>
                                    <button className="timer-buttons" onClick={this.handleTimerStop.bind(this)}><span className="glyphicon glyphicon-pause"></span></button>
                                    <button className="timer-buttons" onClick={this.handleTimeCapture.bind(this)}><span className="glyphicon glyphicon-usd"></span></button>
                                    <button className="timer-buttons" onClick={this.handleTimerReset.bind(this)}><span className="glyphicon glyphicon-refresh"></span></button>
                                </div>
                            </Col>

                        </Row>
                    </Grid>
                </Wrapper>
            </div>
        )
    }
}

export default Timer;
