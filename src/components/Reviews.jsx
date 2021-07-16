import { useEffect, useState } from "react";
import { getCategories, getReviews, postReview } from "../utils/api";
import { parseCategory, parseFilters } from "../utils/format";
import Loading from "./Loading";
import ReviewsList from "./ReviewsList";
import NewReview from "./NewReview";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const Reviews = () => {
  const user = useContext(UserContext);
  const [reviews, setReviews] = useState([]);
  const [reviewsFilter, setReviewsFilter] = useState({
    isLoaded: false,
    p: 1,
  });
  const parsedReviewQuery = parseFilters(reviewsFilter);
  const [categories, setCategories] = useState([]);
  const [reviewExpanded, setReviewExpanded] = useState(false);
  const [reviewToPost, setReviewToPost] = useState({});
  const [reviewsPosted, setReviewsPosted] = useState(0);

  useEffect(() => {
    getCategories().then(({ data }) => {
      setCategories(data.categories);
    });
  }, []);

  useEffect(() => {
    getReviews(parsedReviewQuery).then(({ data }) => {
      setReviews(data.reviews);
      setReviewsFilter((currReviewsFilter) => {
        const newReviewsFilter = { ...currReviewsFilter };
        newReviewsFilter.isLoaded = true;
        return newReviewsFilter;
      });
    });
  }, [parsedReviewQuery, reviewsPosted]);

  useEffect(() => {
    if (reviewToPost.title) {
      reviewToPost.owner = user.username;
      postReview(reviewToPost).then((response) => {
        setReviewsPosted((curr) => curr + 1);
      });
    }
  }, [reviewToPost, user.username]);

  return (
    <div>
      <button
        onClick={() => {
          setReviewExpanded((curr) => !curr);
        }}
      >
        {reviewExpanded ? "Cancel" : "Post new review"}
      </button>
      {reviewExpanded ? (
        <NewReview categories={categories} setReviewToPost={setReviewToPost} />
      ) : null}
      <ReviewsFilterForm
        setReviewsFilter={setReviewsFilter}
        categories={categories}
      />
      {!reviewsFilter.isLoaded ? (
        <Loading />
      ) : (
        <ReviewsList reviews={reviews} />
      )}
    </div>
  );
};

export default Reviews;

const ReviewsFilterForm = ({ setReviewsFilter, categories }) => {
  const addFilterToState = (event, filterCategory) =>
    setReviewsFilter((currReviewsFilter) => {
      const newFilterState = { ...currReviewsFilter };
      if (event.target.value !== "") {
        newFilterState[filterCategory] = event.target.value;
      } else {
        delete newFilterState[filterCategory];
      }
      return newFilterState;
    });

  const iteratePage = (num) => {
    setReviewsFilter((currReviewsFilter) => {
      const newReviewsFilter = { ...currReviewsFilter };
      newReviewsFilter.p += num;
      return newReviewsFilter;
    });
  };

  return (
    <div className="reviews-filter-container">
      <button
        onClick={() => {
          iteratePage(-1);
        }}
      >
        Prev
      </button>
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
      <button
        onClick={() => {
          iteratePage(+1);
        }}
      >
        Next
      </button>
    </div>
  );
};
