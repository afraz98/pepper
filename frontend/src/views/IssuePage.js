import { useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";

const IssuePage = () => {
    const { issueId } = useParams();
    return (
        <main className="container">
        <div className="row">
            <div className="col-md-6 col-sm-10 mx-auto p-0">
                <div className="issue-page">
                    <div className="p-3">
                        <h1>Issue #{issueId}</h1>
                        <Form variant="dark">
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control placeholder="Title" disabled />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control placeholder="Description" disabled />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Assignee</Form.Label>
                            <Form.Select name="assignee" placeholder="No Assignee" disabled>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Priority</Form.Label>
                            <Form.Select name="priority" disabled>                
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                                <option>Critical</option>
                                <option>Severe</option>
                            </Form.Select>
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