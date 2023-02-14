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
  activeItem.reporter = user.username
  
  const handleChange = (e) => {
    let { name, value } = e.target;

    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }

    const newItem = { ...activeItem, [name]: value };
    setActiveItem(newItem);
  };

  const handleClose = () => setShow(false);

  const renderAssignees = () => {
    return (
      props.userList.map((item) =>
        <option>{ item.username }</option>
      ));   
  }
  
  return (
    <>
        <Modal className="text-black" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title> Create an Issue</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <>
            <Form.Group>
              <Form.Label> Issue Title </Form.Label>
              <Form.Control 
              placeholder="Take over the world"
              value = { activeItem.title }
              />
            </Form.Group>

            <Form.Group>
              <Form.Label> Issue Description </Form.Label>
              <Form.Control 
              placeholder="Cause inflation to reach 5000%!"
              value = { activeItem.description }
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Assignee</Form.Label>
              <Form.Select>
                {
                  renderAssignees()
                }
              </Form.Select>
            </Form.Group>
            </>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => props.onSave(activeItem)}> Save </Button>
          </Modal.Footer>
        </Modal>
    </>
  );
};

export default CustomModal;