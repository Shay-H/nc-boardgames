import { Link } from "react-router-dom";
import { formatDateTime, parseCategory } from "../utils/format";

const ReviewsList = ({ reviews }) => {
  return (
    <ul className="reviews-list">
      {reviews.map((review, i) => {
        return (
          <li key={review.review_id}>
            <div className={i % 2 === 0 ? "list-card" : "list-card-alt"}>
              <Link to={`/reviews/${review.review_id}`}>
                <div className="list-card-img-container">
                  <img src={review.review_img_url} alt="" />
                </div>
                <div className="reviews-title-owner">
                  <div className="review-title">
                    <h3>{review.title}</h3>
                  </div>
                  <div className="review-owner">
                    <p>by {review.owner}</p>
                  </div>
                </div>
                <div className="card-info">
                  <p>
                    <b>Category: </b>
                    {parseCategory(review.category)}
                  </p>
                  <p>
                    <b>Votes: </b>
                    {review.votes}
                  </p>
                  <p>
                    <b>Comment count: </b>
                    {review.comment_count}
                  </p>
                </div>
                <p className="timestamp">
                  {`Created at ${formatDateTime(review.created_at)}`}
                </p>
              </Link>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ReviewsList;
