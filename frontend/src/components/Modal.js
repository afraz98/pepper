import React, { useState, useContext } from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import AuthContext from "../context/AuthContext";
import Form from "react-bootstrap/Form";

import "../style/modal.css"

const CustomModal = (props) => {
  const { user } = useContext(AuthContext);
  const [activeItem, setActiveItem] = useState(props.activeItem)
  const [show, setShow] = useState(true);
  const date = new Date();
  
  const handleChange = (e) => {
    let { name, value } = e.target;

    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }

    if (activeItem.reporter === "No Reporter") {
      activeItem.reporter = user.username
    }
    
    // https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
    activeItem.date = date.toISOString().slice(0, 10)


    const newItem = { ...activeItem, [name]: value };
    setActiveItem(newItem);
  };
  
  const renderAssignees = () => {
    return (
      props.userList.map((item) =>
        <option>{ item.username }</option>
      ));   
  }
  
  return (
    <>
        <Modal className="text-black" show={show} onHide={props.toggle}>
          <Modal.Header closeButton>
            <Modal.Title> Create an Issue</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <>
            <Form.Group>
              <Form.Label> Issue Title </Form.Label>
              <Form.Control 
              placeholder="Take over the world"
              name="title"
              value = { activeItem.title }
              onChange = { e => handleChange(e) }
              />
            </Form.Group>

            <Form.Group>
              <Form.Label> Issue Description </Form.Label>
              <Form.Control 
              placeholder="Cause inflation to reach 5000%!"
              name="description"
              value = { activeItem.description }
              onChange = { e => handleChange(e) }
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Assignee</Form.Label>
              <Form.Select name="assignee" value = { activeItem.assignee } onChange = { e => handleChange(e) }>                
                {
                  renderAssignees()
                }
              </Form.Select>
            </Form.Group>
            </>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={() => props.onSave(activeItem)}> Save </Button>
          </Modal.Footer>
        </Modal>
    </>
  );
};

export default CustomModal;