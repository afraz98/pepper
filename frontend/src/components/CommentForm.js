import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

function CommentForm(props) {
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(comment);
    setComment('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formComment">
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Add a public comment..."
          value={comment}
          className='bg-dark text-white my-2'
          onChange={(e) => setComment(e.target.value)}
        />
      </Form.Group>

      <Button className="my-2" variant="primary" type="submit" disabled={!comment}>
        Comment
      </Button>
    </Form>
  );
}

export default CommentForm;
