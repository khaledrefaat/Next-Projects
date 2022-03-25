import classes from './comment-list.module.css';

function CommentList({ comments }) {
  return (
    <ul className={classes.comments}>
      {/* Render list of comments - fetched from API */}
      {comments &&
        comments.map(({ _id, name, text }) => (
          <li key={_id}>
            <p>{text}</p>
            <div>
              By <address>{name}</address>
            </div>
          </li>
        ))}
    </ul>
  );
}

export default CommentList;
