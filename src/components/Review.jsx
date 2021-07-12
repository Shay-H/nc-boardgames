import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getReviewById } from "../utils/api";
import Comments from "./Comments";
import VoteButtons from "./VoteButtons";

function Review() {
  const [review, setReview] = useState({});
  const { review_id: reviewId } = useParams();
  const [disabledButtons, setDisabledElements] = useState({});

  useEffect(() => {
    getReviewById(reviewId).then(({ data }) => {
      setReview(data.review);
    });
  }, [reviewId]);

  const handleUpvote = (event) => {
    event.preventDefault();
    setDisabledElements({ upvote: true });
  };
  const handleDownvote = (event) => {
    event.preventDefault();
    setDisabledElements({ downvote: true });
  };

  return (
    <div className="review">
      <h2>{review.title}</h2>
      <p>
        by
        <Link to={`/users/${review.owner}`}> {review.owner} </Link>
      </p>
      <p> Category: {review.category} </p>
      <p id="review-body">{review.review_body}</p>
      <p>Votes: {review.votes}</p>
      <VoteButtons
        disabledButtons={disabledButtons}
        handleDownvote={handleDownvote}
        handleUpvote={handleUpvote}
      />
      <Comments reviewId={reviewId} />
    </div>
  );
}

export default Review;
