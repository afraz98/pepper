import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";

import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

import CommentForm from "../components/CommentForm";
import { ListGroup } from "react-bootstrap";

const IssuePage = () => {
    const { issueId } = useParams();
    const { user } = useContext(AuthContext);
    const [disabled, setDisabled] = useState(true);
    const [userList, setUserList] = useState([]);
    const date = new Date();

    let navigate = useNavigate();

    const refreshIssue = () => {
        console.log(`http://localhost:8000/api/issues/${issueId}/`)
        axios.get(`http://localhost:8000/api/issues/${issueId}/`).then((res) => { 
            setItem(res.data);
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
        setItem({...item, 'completed': true})
        updateIssue();
        navigate('/issues')    
    }

    const handleNewCommentSubmission = (comment) => {
        const timestamp = date.toISOString().slice(0, 10)
        console.log(user.username, comment, timestamp)
        // TODO: Post new comment to comment table
    }

    const renderComments = () => {
        return (
            <div>
                {
                    item.comments.map((comment, index) => (
                        <ListGroup.Item className="bg-dark" key={index}>
                        <Card className="bg-dark text-white">
                            <Card.Header>{comment.author}</Card.Header>
                            <Card.Body>{comment.content}</Card.Body>
                            <Card.Footer className="text-muted">{comment.date}</Card.Footer>
                        </Card>
                        </ListGroup.Item>
                    ))
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
                                    className="bg-dark text-white my-2"
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
                                <Form.Select className="bg-dark text-white mb-2" name="assignee" value={item.assignee} disabled={disabled} onChange={(e)=>handleChange(e)}>
                                    {
                                        renderAssignees()
                                    }
                                </Form.Select>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Priority</Form.Label>
                                <Form.Select className="bg-dark text-white mb-2" name="priority" value={item.priority} disabled={disabled} onChange={(e)=>handleChange(e)}>                
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

                            <Container>
                            <CommentForm onSubmit={handleNewCommentSubmission} />
                            
                            <ListGroup className="bg-dark">
                                {
                                    renderComments()
                                }
                            </ListGroup>
                            </Container>
                    </div>
                </div>
            </div>
        </div>
        </main>
    )
}

export default IssuePage;