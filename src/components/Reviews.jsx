import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getReviews } from "../utils/api";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [reviewQueries, setReviewQueries] = useState({});

  useEffect(() => {
    getReviews().then(({ data }) => {
      setReviews(data.reviews);
    });
  }, []);

  return (
    <div>
      <ul>
        {reviews.map((review) => {
          return (
            <li>
              <Link to={`/reviews/${review.review_id}`}>
                <h3>{review.title}</h3>
              </Link>
              <p>by {review.owner}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Reviews;
