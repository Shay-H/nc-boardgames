import { useContext } from "react";
import { useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useRequestData } from "../hooks/useRequestData";
import {
  deleteReviewByReviewId,
  getReviewById,
  patchReviewById,
} from "../utils/api";
import AddCommentForm from "./AddCommentForm";
import Comments from "./Comments";
import Loading from "./Loading";
import VoteButtons from "./VoteButtons";

function Review({ votedOn, setVotedOn }) {
  const user = useContext(UserContext);
  const { review_id: reviewId } = useParams();
  const [disabledElements, setDisabledElements] = useState({});
  const [commentsChanged, setCommentsChanged] = useState(0);
  const history = useHistory();
  const { data: review, isLoaded } = useRequestData(
    getReviewById,
    "review",
    reviewId
  );

  const [voteChange, setVoteChange] = useState(0);

  const handleUpvote = (event) => {
    event.preventDefault();
    const reviewPatch = { review_id: reviewId };
    switch (voteChange) {
      case -1:
        reviewPatch.inc_votes = 2;
        break;
      case 0:
        reviewPatch.inc_votes = 1;
        break;
      default:
        reviewPatch.inc_votes = -1;
    }
    setVoteChange(1);
    setDisabledElements({ upvote: true });
    patchReviewById(reviewId, reviewPatch)
      .then(() => {})
      .catch(() => {
        setVoteChange(0);
        setDisabledElements({ upvote: false });
      });
  };

  const handleDownvote = (event) => {
    event.preventDefault();
    const reviewPatch = { review_id: reviewId };
    switch (voteChange) {
      case 1:
        reviewPatch.inc_votes = -2;
        break;
      case 0:
        reviewPatch.inc_votes = -1;
        break;
      default:
        reviewPatch.inc_votes = 1;
    }
    patchReviewById(reviewId, reviewPatch).then(() => {
      setDisabledElements({ downvote: true });
      setVoteChange(-1);
    });
  };

  const deleteReview = () => {
    deleteReviewByReviewId(reviewId).then(() => {
      history.push("/reviews");
    });
  };

  if (!isLoaded) return <Loading />;
  return (
    <div className="review">
      {user.username === review.owner ? (
        <button className="delete-button" onClick={deleteReview}>
          Delete Review
        </button>
      ) : null}
      <img
        src={review.review_img_url}
        className="review-img"
        alt={`${review.title}`}
      />
      <h2>{review.title}</h2>
      <div className="review-info">
        <p>
          by
          <Link to={`/users/${review.owner}`}>
            {" "}
            <b>{review.owner}</b>{" "}
          </Link>
        </p>
        <p>
          {" "}
          Category: <b>{review.category}</b>{" "}
        </p>
      </div>
      <p id="review-body">{review.review_body}</p>
      {user.username !== review.author ? (
        <div className="review-vote">
          <p>Votes: {review.votes + voteChange}</p>
          <VoteButtons
            disabledElements={disabledElements}
            handleDownvote={handleDownvote}
            handleUpvote={handleUpvote}
          />
        </div>
      ) : null}
      <Comments
        reviewId={reviewId}
        commentsChanged={commentsChanged}
        setCommentsChanged={setCommentsChanged}
      />
      <AddCommentForm
        reviewId={reviewId}
        setCommentsChanged={setCommentsChanged}
      />
    </div>
  );
}

export default Review;
