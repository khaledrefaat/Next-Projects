import { useCallback, useContext, useEffect, useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotificationContext from '../../store/notification-context';

function Comments({ eventId }) {
  const [showComments, setShowComments] = useState(true);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState('');

  const notificationCtx = useContext(NotificationContext);

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
    notificationCtx.showNotification({
      title: 'Posting...',
      message: 'Posting your comment...',
      status: 'pending',
    });
    try {
      const res = await fetch('http://localhost:3000/api/comments/' + eventId, {
        method: 'POST',
        body: JSON.stringify(commentData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.msg);
      }

      fetchComments();
      notificationCtx.showNotification({
        title: 'Success',
        message: 'Successfully posted your comment ^_^',
        status: 'success',
      });
    } catch (err) {
      console.log(err);
      notificationCtx.showNotification({
        title: 'Error',
        message: err.message,
        status: 'error',
      });
    }
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList comments={comments} />}
      {
        <p style={{ color: 'red', textAlign: 'center', marginTop: 5 }}>
          {error}
        </p>
      }
    </section>
  );
}

export default Comments;
