import React, { useState, useEffect, useContext } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import '../style/issuepage.css'
import { useNavigate } from "react-router-dom";

import '../style/createissue.css'

const CreateIssue = () => {
    const { user } = useContext(AuthContext);
    const [userList, setUserList] = useState([]);
    const date = new Date();
    
    const[item, setItem] = useState({
        title: "",
        description: "",
        completed: false,
        assignee: "Unassigned",
        priority: "Low",
        reporter: user.username,
        date: date.toISOString().slice(0, 10),
    });

    let navigate = useNavigate();
    
    // Update user list
    useEffect(() => {refreshList()}, [])

    const refreshList = () => {
        axios.get("http://localhost:8000/api/users/").then((res) => setUserList(res.data)).catch((err) => console.log(err));
    };

    const handleChange = (e) => {
        let { name, value } = e.target;
    
        if (e.target.type === "checkbox") {
          value = e.target.checked;
        }

        setItem({...item, [name]: value})
    };

    const handleSubmit = () => {
        if (item.id) {
          axios.put(`http://localhost:8000/api/issues/${item.id}/`, item);
          return;
        }
        axios.post("http://localhost:8000/api/issues/", item);

        navigate("/issues")
    };

    const renderAssignees = () => {
        return (
          userList.map((usr) =>
            <option key={usr.id}>{ usr.username }</option>
          ));   
      }

    return (
        <main className="container">
            <div className="row">
                <div className="col-md-6 col-sm-10 mx-auto p-0">
                    <div className="login">
                        <section>
                                <>
                                <Form.Group>
                                <Form.Label> Issue Title </Form.Label>
                                <Form.Control 
                                    placeholder="Take over the world"
                                    name="title"
                                    value = { item.title }
                                    onChange = { e => handleChange(e) }
                                />
                                </Form.Group>

                                <Form.Group>
                                <Form.Label> Issue Description </Form.Label>
                                <Form.Control 
                                    placeholder="Cause inflation to reach 5000%!"
                                    name="description"
                                    value = { item.description }
                                    onChange = { e => handleChange(e) }
                                />
                                </Form.Group>

                                <Form.Group>
                                <Form.Label>Assignee</Form.Label>
                                <Form.Select name="assignee" value = { item.assignee } onChange = { e => handleChange(e) }>                
                                    {
                                        renderAssignees()
                                    }
                                </Form.Select>
                                </Form.Group>


                                <Form.Group>
                                <Form.Label>Priority</Form.Label>
                                <Form.Select name="priority" value = { item.priority } onChange = { e => handleChange(e) }>                
                                    <option>Low</option>
                                    <option>Medium</option>
                                    <option>High</option>
                                    <option>Critical</option>
                                    <option>Severe</option>
                                </Form.Select>
                                </Form.Group>
                                
                                <hr/>

                                <Button variant="primary" type="submit" onClick={handleSubmit}> Create </Button>
                                </>
                        </section>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default CreateIssue;