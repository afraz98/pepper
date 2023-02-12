import React, { useState, useContext } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Input, Label } from "reactstrap";
import AuthContext from "../context/AuthContext";

const CustomModal = (props) => {
  const { user } = useContext(AuthContext);
  const [activeItem, setActiveItem] = useState(props.activeItem)

  activeItem.reporter = user.username
  const handleChange = (e) => {
    let { name, value } = e.target;

    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }

    const newItem = { ...activeItem, [name]: value };
    setActiveItem(newItem);
  };
  
  return (
    <Modal isOpen={true} toggle={props.toggle}>
      <ModalHeader toggle={props.toggle}>Create an issue</ModalHeader>
      <ModalBody>
        <Form>
          
          <FormGroup>
            <Label for="issue-title">Title</Label>
            <Input
              type="text"
              id="issue-title"
              name="title"
              value={activeItem.title}
              onChange={ e => handleChange(e) }
              placeholder="Issue Title"
            />
          </FormGroup>
          
          <FormGroup>
            <Label for="issue-description">Description</Label>
            <Input
              type="text"
              id="issue-description"
              name="description"
              value={activeItem.description}
              onChange={ e => handleChange(e) }
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
              value={ activeItem.priority }
              onChange={ e => handleChange(e) }
            </Input>
          </FormGroup>

        </Form>
      </ModalBody>
      
      <ModalFooter>
        <Button color="success" onClick={() => props.onSave(activeItem)}> Save </Button>
      </ModalFooter>
    </Modal>
  );
  
};

export default CustomModal