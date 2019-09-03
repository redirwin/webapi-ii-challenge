import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Comments(props) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/posts/${props.id}/comments`)
      .then(res => {
        setComments(res.data);
      })
      .catch(() => {
        setComments(false);
      });
  }, [props.id]);

  return (
    <div>
      <h4>Comments</h4>
      {comments ? (
        comments.map(comment => <p key={comment.id}>"{comment.text}"</p>)
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  );
}
