import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import {
  deleteCommentByCommentId,
  getCommentsByReviewId,
  getCommentsByUsername,
  patchCommentById,
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
  const [voteChange, setVoteChange] = useState({});
  const [disabledElements, setDisabledElements] = useState({});

  useEffect(() => {
    if (reviewId) {
      getCommentsByReviewId(reviewId).then(({ data }) => {
        data.comments.forEach((comment) => {
          setDisabledElements((curr) => {
            const updated = { ...curr };
            if (!updated[comment.comment_id]) updated[comment.comment_id] = {};
            return updated;
          });
        });
        setComments(
          data.comments.sort(
            (commentA, commentB) => commentA.comment_id - commentB.comment_id
          )
        );
      });
    } else if (username) {
      getCommentsByUsername(username).then(({ data }) =>
        setComments(
          data.comments.sort(
            (commentA, commentB) => commentA.comment_id - commentB.comment_id
          )
        )
      );
    }
  }, [reviewId, commentsChanged, username]);

  const deleteComment = (commentId) => {
    deleteCommentByCommentId(commentId).then(() => {
      setCommentsChanged((currCommentsChanged) => currCommentsChanged + 1);
    });
  };

  const handleUpvote = (event, commentId) => {
    const commentPatch = { comment_id: commentId };
    switch (voteChange[commentId]) {
      case -1:
        commentPatch.inc_votes = 2;
        break;
      case 1:
        commentPatch.inc_votes = -1;
        break;
      default:
        commentPatch.inc_votes = 1;
    }
    setVoteChange((curr) => {
      const updated = { ...curr };
      updated[commentId] = 1;
      return updated;
    });
    setDisabledElements((curr) => {
      const updated = { ...curr };
      updated[commentId].upvote = true;
      updated[commentId].downvote = false;
      return updated;
    });
    patchCommentById(commentId, commentPatch)
      .then(() => {})
      .catch(() => {
        setVoteChange((curr) => {
          const updated = { ...curr };
          updated[commentId] = 0;
          return updated;
        });
        setDisabledElements((curr) => {
          const updated = { ...curr };
          updated[commentId].upvote = false;
          return updated;
        });
      });
  };

  const handleDownvote = (event, commentId) => {
    const commentPatch = { comment_id: commentId };
    switch (voteChange[commentId]) {
      case 1:
        commentPatch.inc_votes = -2;
        break;
      case -1:
        commentPatch.inc_votes = 1;
        break;
      default:
        commentPatch.inc_votes = -1;
    }
    setVoteChange((curr) => {
      const updated = { ...curr };
      updated[commentId] = -1;
      return updated;
    });
    setDisabledElements((curr) => {
      const updated = { ...curr };
      updated[commentId].downvote = true;
      updated[commentId].upvote = false;
      return updated;
    });
    patchCommentById(commentId, commentPatch)
      .then(() => {})
      .catch(() => {
        setVoteChange((curr) => {
          const updated = { ...curr };
          updated[commentId] = 0;
          return updated;
        });
        setDisabledElements((curr) => {
          const updated = { ...curr };
          updated[commentId].downvote = false;
          return updated;
        });
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
                <p>
                  <b>Votes: </b>{" "}
                  {comment.votes +
                    (voteChange[comment.comment_id]
                      ? voteChange[comment.comment_id]
                      : 0)}
                </p>
                <p className="timestamp">
                  <i>Created at {formatDateTime(comment.created_at)}</i>
                </p>
                {comment.author === user.username ? (
                  <button
                    className="delete-button"
                    onClick={(event) => {
                      deleteComment(comment.comment_id);
                    }}
                  >
                    Delete comment
                  </button>
                ) : null}
              </div>
              {!username && user.username !== comment.author ? (
                <VoteButtons
                  handleUpvote={handleUpvote}
                  handleDownvote={handleDownvote}
                  commentId={comment.comment_id}
                  disabledElements={disabledElements[comment.comment_id]}
                />
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Comments;
