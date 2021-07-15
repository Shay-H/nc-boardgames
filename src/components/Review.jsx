import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getReviewById } from "../utils/api";
import AddCommentForm from "./AddCommentForm";
import Comments from "./Comments";
import VoteButtons from "./VoteButtons";

function Review() {
  const [review, setReview] = useState({});
  const { review_id: reviewId } = useParams();
  const [disabledElements, setDisabledElements] = useState({});
  const [commentsChanged, setCommentsChanged] = useState(0);

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
      <p>Votes: {review.votes}</p>
      <VoteButtons
        disabledElements={disabledElements}
        handleDownvote={handleDownvote}
        handleUpvote={handleUpvote}
      />
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
