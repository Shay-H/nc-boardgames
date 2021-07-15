import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { deleteCommentByCommentId, getCommentsByReviewId } from "../utils/api";
import { formatDateTime } from "../utils/format";

const Comments = ({ reviewId, commentsChanged, setCommentsChanged }) => {
  const user = useContext(UserContext);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    getCommentsByReviewId(reviewId).then(({ data }) => {
      setComments(
        data.comments.sort((commentA, commentB) => commentA - commentB)
      );
    });
  }, [reviewId, commentsChanged]);

  const deleteComment = (commentId) => {
    deleteCommentByCommentId(commentId).then(() => {
      setCommentsChanged((currCommentsChanged) => currCommentsChanged + 1);
    });
  };

  return (
    <div className="comments">
      <ul className="comments-list">
        {comments.map((comment) => {
          return (
            <li className="comment" key={comment.comment_id}>
              <div className="comment-card">
                <p>
                  <Link to={`/users/${comment.author}`}>
                    <b>{comment.author}</b>
                  </Link>
                  says:
                </p>
                <p className="comment-body">{comment.body}</p>
                <p className="timestamp">
                  <i>Created at {formatDateTime(comment.created_at)}</i>
                </p>
                {comment.author === user.username ? (
                  <button
                    onClick={(event) => {
                      deleteComment(comment.comment_id);
                    }}
                  >
                    Delete
                  </button>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Comments;
