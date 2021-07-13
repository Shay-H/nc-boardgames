import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories, getReviews } from "../utils/api";
import { formatDateTime, parseCategory, parseFilters } from "../utils/format";
import Loading from "./Loading";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [reviewsFilter, setReviewsFilter] = useState({
    // isLoaded: false,
    reviews: [],
  });
  const parsedReviewQuery = parseFilters(reviewsFilter);

  useEffect(() => {
    getReviews(parsedReviewQuery).then(({ data }) => {
      setReviews(data.reviews);
      setReviewsFilter((currReviewsFilter) => {
        const newReviewsFilter = { ...currReviewsFilter };
        newReviewsFilter.isLoaded = true;
        return newReviewsFilter;
      });
    });
  }, [parsedReviewQuery]);

  // if (!reviewsFilter.isLoaded) return <Loading />;
  return (
    <div>
      <ReviewsFilterForm setReviewsFilter={setReviewsFilter} />
      <ReviewsList reviews={reviews} />
    </div>
  );
};

export default Reviews;

const ReviewsFilterForm = ({ setReviewsFilter }) => {
  const [filterFormState, setFilterFormState] = useState({});
  const [categories, setCategories] = useState([]);

  const handleSubmit = (event) => {
    // event.preventDefault();
    // setReviewsFilter(() => {
    //   const newReviewsFilter = { ...filterFormState };
    //   // newReviewsFilter.isLoaded = false;
    //   newReviewsFilter.reviews = [];
    //   return newReviewsFilter;
    // });
  };

  const addFilterToState = (event, filterCategory) =>
    setFilterFormState((currFilterState) => {
      const newFilterState = { ...currFilterState };
      if (event.target.value !== "") {
        newFilterState[filterCategory] = event.target.value;
      } else {
        delete newFilterState[filterCategory];
      }
      setReviewsFilter(newFilterState);
      return newFilterState;
    });

  useEffect(() => {
    getCategories().then(({ data }) => {
      setCategories(data.categories);
    });
  }, []);

  return (
    <div className="reviews-filter-container">
      <form onSubmit={handleSubmit} className="reviews-filter-form">
        <label htmlFor="category-name">Category</label>
        <select
          name="category-name"
          onChange={(event) => {
            addFilterToState(event, "category");
          }}
        >
          <option value={""} key="all">
            All
          </option>
          {categories.map((category) => {
            return (
              <option value={category.slug} key={category.slug}>
                {parseCategory(category.slug)}
              </option>
            );
          })}
        </select>
        <label htmlFor="sort-by">Sort by</label>
        <select
          name="sort-by"
          className="sort-by"
          onChange={(event) => {
            addFilterToState(event, "sort_by");
          }}
        >
          <option value="created_at">Created at</option>
          <option value="comment_count">Comment count</option>
          <option value="votes">Votes</option>
        </select>
        {/* <button>Submit</button> */}
      </form>
    </div>
  );
};

const ReviewsList = ({ reviews }) => {
  return (
    <div className="reviews-container">
      <ul>
        {reviews.map((review) => {
          return (
            <li key={review.review_id}>
              <div className="list-card">
                <Link to={`/reviews/${review.review_id}`}>
                  <div className="list-card-img-container">
                    <img src={review.review_img_url} alt="" />
                  </div>
                  <div className="reviews-title-owner">
                    <h3>{review.title}</h3>
                    <p>by {review.owner}</p>
                  </div>
                  <div className="review-info">
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
    </div>
  );
};
