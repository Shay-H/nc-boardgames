import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getReviewById } from "../utils/api";

function Review() {
  const [review, setReview] = useState({});
  const { review_id: reviewId } = useParams();

  useEffect(() => {
    getReviewById(reviewId).then(({ data }) => {
      setReview(data.review);
    });
  }, [reviewId]);

  console.log(reviewId);
  return (
    <div>
      <ul>
        <li>
          <h2>{review.title}</h2>
          <p>
            by
            <Link to={`/users/${review.owner}`}> {review.owner} </Link>
          </p>
          <p> Category: {review.category} </p>
          <p>{review.review_body}</p>
          <p>Votes: {review.votes}</p>
        </li>
      </ul>
    </div>
  );
}

export default Review;
