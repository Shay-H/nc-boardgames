import { useEffect, useState } from "react";
import { getCategories, getReviews } from "../utils/api";
import { parseCategory, parseFilters } from "../utils/format";
import Loading from "./Loading";
import ReviewsList from "./ReviewsList";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [reviewsFilter, setReviewsFilter] = useState({
    isLoaded: false,
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

  return (
    <div>
      <ReviewsFilterForm setReviewsFilter={setReviewsFilter} />
      {!reviewsFilter.isLoaded ? (
        <Loading />
      ) : (
        <ReviewsList reviews={reviews} />
      )}
    </div>
  );
};

export default Reviews;

const ReviewsFilterForm = ({ setReviewsFilter }) => {
  const [categories, setCategories] = useState([]);

  const addFilterToState = (event, filterCategory) =>
    setReviewsFilter((currFilterState) => {
      const newFilterState = { ...currFilterState };
      if (event.target.value !== "") {
        newFilterState[filterCategory] = event.target.value;
      } else {
        delete newFilterState[filterCategory];
      }
      return newFilterState;
    });

  useEffect(() => {
    getCategories().then(({ data }) => {
      setCategories(data.categories);
    });
  }, []);

  return (
    <div className="reviews-filter-container">
      <form className="reviews-filter-form">
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
          <option value="created_at">New</option>
          <option value="votes">Top</option>
          <option value="comment_count">Activity</option>
        </select>
      </form>
    </div>
  );
};
