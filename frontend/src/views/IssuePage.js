import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button"

const IssuePage = () => {
    const { issueId } = useParams();
    const { user } = useContext(AuthContext);
    useEffect(() => {refreshIssue()})

    const[item, setItem] = useState({
        title: "",
        description: "",
        completed: false,
        assignee: "Unassigned",
        priority: "Low",
        reporter: user.username,
        date: ""
    });



    const refreshIssue = () => {
        console.log(`http://localhost:8000/api/issues/${issueId}/`)
        axios.get(`http://localhost:8000/api/issues/${issueId}/`).then((res) => setItem(res.data));
    };

    const closeIssue = () => {
        // TODO: Change item.completed to true, navigate back to /issues
    }

    return (
        <main className="container">
        <div className="row">
            <div className="col-md-6 col-sm-10 mx-auto p-0">
                <div className="issue-page">
                    <div className="p-3">
                        <h3>Issue #{issueId}</h3>
                        <hr/>

                        <h1> {item.title} </h1>
                        <p> {item.description} </p>

                        <hr/>

                        <Form>
                        <Form.Group>
                            <Form.Label>Assignee</Form.Label>
                            <Form.Select className="bg-dark text-white" name="assignee" disabled>
                                <option>{user.username}</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Priority</Form.Label>
                            <Form.Select className="bg-dark text-white" name="priority" value={item.priority} disabled>                
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                                <option>Critical</option>
                                <option>Severe</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label> Reporter </Form.Label>
                            <Form.Control className="bg-dark text-white" value={item.reporter} disabled/>
                        </Form.Group>

                        <hr/>
                        <div className="px-auto mx-auto">
                            <Button className="btn btn-danger" onClick={closeIssue}> Close Issue </Button>
                            <Button variant="outline-danger" onClick={closeIssue}> Comment </Button>
                        </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
        </main>
    )
}

export default IssuePage;   