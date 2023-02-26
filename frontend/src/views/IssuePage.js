import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";

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

    return (
        <main className="container">
        <div className="row">
            <div className="col-md-6 col-sm-10 mx-auto p-0">
                <div className="issue-page">
                    <div className="p-3">
                        <h3>Issue #{issueId}</h3>
                        <Form variant="dark">
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control value={item.title} disabled />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control value={item.description} disabled />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Assignee</Form.Label>
                            <Form.Select name="assignee" disabled>
                                <option>{user.username}</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Priority</Form.Label>
                            <Form.Select name="priority" value={item.priority} disabled>                
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                                <option>Critical</option>
                                <option>Severe</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label> Reporter </Form.Label>
                            <Form.Control value={item.reporter} disabled/>
                        </Form.Group>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
        </main>
    )
}

export default IssuePage;