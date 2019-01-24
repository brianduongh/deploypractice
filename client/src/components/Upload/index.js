import React from "react";
import { Button, Modal } from "react-bootstrap";
// import freelancers from "../../freelancers.json";


class Upload extends React.Component {
    constructor(props, context) {
      super(props, context);
  
      this.handleShow = this.handleShow.bind(this);
      this.handleClose = this.handleClose.bind(this);
  
      this.state = {
        show: false,
        // freelancers,
        // user_id: null 
      };
    }

    // componentWillMount(){
    //     console.log(this.props.id);
    //     this.setState({ user_id: this.props.id })
    // }

    handleClose() {
      this.setState({ show: false });
    }
  
    handleShow() {
      this.setState({ show: true });
    }
  
    render() {
  
      return (
        <div>
  
          <Button bsStyle="primary" bsSize="large" onClick={this.handleShow}>
            Upload a Picture
          </Button>
  
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <div>
                    <form method="post" enctype="multipart/form-data" action={`/account/${this.props.id}`}>
                        <input type="file" name="file"/>
                        <input type="submit" value="Submit"/>
                    </form>
                    

                </div>
            </Modal.Body>

            <Modal.Footer>
              <Button onClick={this.handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    }
  }

export default Upload;


  
