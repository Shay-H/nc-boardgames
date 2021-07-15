import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import {
  deleteCommentByCommentId,
  getCommentsByReviewId,
  getCommentsByUsername,
} from "../utils/api";
import { formatDateTime } from "../utils/format";
import VoteButtons from "./VoteButtons";

const Comments = ({
  reviewId,
  commentsChanged,
  setCommentsChanged,
  username,
}) => {
  const user = useContext(UserContext);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    if (reviewId) {
      getCommentsByReviewId(reviewId).then(({ data }) => {
        setComments(
          data.comments.sort((commentA, commentB) => commentA - commentB)
        );
      });
    } else if (username) {
      getCommentsByUsername(username).then(({ data }) =>
        setComments(
          data.comments.sort((commentA, commentB) => commentA - commentB)
        )
      );
    }
  }, [reviewId, commentsChanged, username]);

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
                {username ? (
                  <Link to={`/reviews/${comment.review_id}`}>
                    <h4>Go to review</h4>
                  </Link>
                ) : null}
                <p>
                  <Link to={`/users/${comment.author}`}>
                    <b>{comment.author}</b>
                  </Link>
                  {" said"}:
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
              <VoteButtons />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Comments;
