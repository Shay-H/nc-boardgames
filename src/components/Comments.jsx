import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCommentsByReviewId } from "../utils/api";

const Comments = ({ reviewId }) => {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    getCommentsByReviewId(reviewId).then(({ data }) => {
      setComments(data.comments);
    });
  });

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
                  </Link>{" "}
                  says:
                </p>
                <p className="comment-body">{comment.body}</p>
                <p className="timestamp">
                  <i>Created at {reviewId.created_at}</i>
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Comments;
