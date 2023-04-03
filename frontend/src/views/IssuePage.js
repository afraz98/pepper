import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";

import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

const IssuePage = () => {
    const { issueId } = useParams();
    const { user } = useContext(AuthContext);
    const [disabled, setDisabled] = useState(true);
    const [userList, setUserList] = useState([]);
    const [comments, setComments] = useState([]);

    let navigate = useNavigate();

    const refreshIssue = () => {
        console.log(`http://localhost:8000/api/issues/${issueId}/`)
        axios.get(`http://localhost:8000/api/issues/${issueId}/`).then((res) => { 
            setItem(res.data);
            setComments(item.comments)
        }).then(console.log(item));
    };

    useEffect(() => {
        refreshIssue()
        refreshUserList()
    }, []);

    const refreshUserList = () => {
        axios.get("http://localhost:8000/api/users/").then((res) => setUserList(res.data)).catch((err) => console.log(err));
    };

    const[item, setItem] = useState({
        title: "",
        description: "",
        completed: false,
        assignee: "Unassigned",
        priority: "Low",
        reporter: user.username,
        date: "",
        comments: []
    });

    const handleChange = (e) => {
        let { name, value } = e.target;
    
        if (e.target.type === "checkbox") {
          value = e.target.checked;
        }

        setItem({...item, [name]: value})
    };

    const handleIssueEditButtonClick = () => {
        setDisabled(false);
    }

    const handleCloseIssue = () => {
        console.log('Closing issue ...')
        setItem({...item, 'completed': true})
        console.log(item)
        updateIssue();
        navigate('/issues')    
    }

    const handleNewCommentSubmission = () => {
        // TODO: Implement comment creation frontend 
        // (1) Make comment creation form visible on button click
        // (2) Add button to save new comments
    }

    const renderComments = () => {
        return (
            <div>
                {
                    item.comments.map((comment) => 
                        <>
                            <Card className="bg-dark">
                                <Card.Header>{comment.author}</Card.Header>
                                <Card.Body>{comment.content}</Card.Body>
                                <Card.Footer className="">{comment.date}</Card.Footer>
                            </Card>
                            <hr/>
                        </>
                    )
                }
            </div>
        )
    }

    const renderAssignees = () => {
        return (
          userList.map((usr) =>
            <option key={usr.id}>{ usr.username }</option>
          ));   
    }

    const updateIssue = () => {
        console.log(item)
        if (item.id) {
            axios.put(`http://localhost:8000/api/issues/${item.id}/`, item);
            return;
        }
    }

    return (
        <main className="container">
            <div className="row">
                <div className="col-md-6 col-sm-10 mx-auto p-0">
                    <div className="issue-page">
                        <div className="p-3">
                            <Container>
                                <Row>
                                <Col><h3>Issue #{issueId}</h3></Col> 
                                <Col style={{display: 'flex', justifyContent: 'right'}}><Button onClick={handleIssueEditButtonClick}> <FontAwesomeIcon icon={faPencil}/> </Button></Col>
                                </Row>
                            </Container>
                            <hr/>

                            <Form.Group>
                                <Form.Label> Issue Title </Form.Label>
                                <Form.Control 
                                    name="title"
                                    value = { item.title }
                                    className="bg-dark text-white"
                                    onChange = { e => handleChange(e) }
                                    disabled={disabled}
                                />
                                </Form.Group>

                                <Form.Group>
                                <Form.Label> Issue Description </Form.Label>
                                <Form.Control 
                                    name="description"
                                    value = { item.description }
                                    as="textarea" rows={5}
                                    className="bg-dark text-white"
                                    onChange = {e => handleChange(e) }
                                    disabled={disabled}
                                />
                                </Form.Group>

                            <hr/>

                            <Form>
                            <Form.Group>
                                <Form.Label>Assignee</Form.Label>
                                <Form.Select className="bg-dark text-white" name="assignee" value={item.assignee} disabled={disabled} onChange={(e)=>handleChange(e)}>
                                    {
                                        renderAssignees()
                                    }
                                </Form.Select>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Priority</Form.Label>
                                <Form.Select className="bg-dark text-white" name="priority" value={item.priority} disabled={disabled} onChange={(e)=>handleChange(e)}>                
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
                                <Container>
                                <Row>
                                    <Col><Button className="btn btn-danger" onClick={handleCloseIssue}> Close Issue </Button></Col>
                                    <Col><Button onClick={updateIssue}> Save </Button></Col>
                                </Row>
                                </Container>
                            </Form>
                            <hr/>
                            
                            <Form>
                                <Form.Control 
                                    name="description"
                                    as="textarea" rows={5}
                                    className="bg-dark text-white"
                                />

                                <hr/>

                                <Button onClick={handleNewCommentSubmission}> Save </Button>
                            </Form>

                            <div>
                            <ul className="list-group list-group-flush border-top-0">
                                { 
                                    renderComments() 
                                }
                            </ul> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </main>
    )
}

export default IssuePage;