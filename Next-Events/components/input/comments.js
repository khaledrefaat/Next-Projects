import { useCallback, useEffect, useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(true);
  const [comments, setComments] = useState([]);

  const fetchComments = useCallback(() => {
    async function fetchComments() {
      try {
        const res = await fetch(
          'http://localhost:3000/api/comments/' + eventId
        );

        if (res.ok) {
          const data = await res.json();
          setComments(data);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchComments();
  }, [eventId]);

  async function toggleCommentsHandler() {
    fetchComments();
    setShowComments(prevStatus => !prevStatus);
  }

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  async function addCommentHandler(commentData) {
    // send data to API
    try {
      await fetch('http://localhost:3000/api/comments/' + eventId, {
        method: 'POST',
        body: JSON.stringify(commentData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      fetchComments();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList comments={comments} />}
    </section>
  );
}

export default Comments;
