import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label } from "reactstrap";

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;

    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }

    const activeItem = { ...this.state.activeItem, [name]: value };

    this.setState({ activeItem });
  };

  render() {
    const { toggle, onSave } = this.props;

    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>Create an issue</ModalHeader>
        <ModalBody>
          <Form>
            
            <FormGroup>
              <Label for="issue-title">Title</Label>
              <Input
                type="text"
                id="issue-title"
                name="title"
                value={this.state.activeItem.title}
                onChange={this.handleChange}
                placeholder="Issue Title"
              />
            </FormGroup>
            
            <FormGroup>
              <Label for="issue-description">Description</Label>
              <Input
                type="text"
                id="issue-description"
                name="description"
                value={this.state.activeItem.description}
                onChange={this.handleChange}
                placeholder="Issue description"
              />
            </FormGroup>

            <FormGroup>
            <Label for="priority-selection">Description</Label>
              <Input id="priority-selection" type="select">
                <option> Critical </option>
                <option> Severe </option>
                <option> High </option>
                <option> Medium </option>
                <option> Low </option>
                onChange={this.handleChange}
                value={this.state.activeItem.priority}
              </Input>
            </FormGroup>

          </Form>
        </ModalBody>
        
        <ModalFooter>
          <Button color="success" onClick={() => onSave(this.state.activeItem)}> Save </Button>
        </ModalFooter>
      
      </Modal>
    );
  }
}