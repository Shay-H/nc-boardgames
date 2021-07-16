import { useState } from "react";
import { parseCategory } from "../utils/format";

const NewReview = ({ categories, setReviewToPost }) => {
  const [newReview, setNewReview] = useState({
    title: "",
    designer: "",
    review_img_url: "",
    review_body: "",
    category: "strategy",
  });

  const editNewReview = (event, propToEdit) => {
    setNewReview((currState) => {
      const newState = { ...currState };
      newState[propToEdit] = event.target.value;
      return newState;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setReviewToPost(newReview);
    setNewReview({
      title: "",
      designer: "",
      review_img_url: "",
      review_body: "",
      category: "strategy",
    });
  };

  return (
    <form action="" className="new-review-form">
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        onChange={(event) => editNewReview(event, "title")}
        value={newReview.title}
      />
      <label htmlFor="designer">Game designer</label>
      <input
        type="text"
        name="designer"
        onChange={(event) => editNewReview(event, "designer")}
        value={newReview.designer}
      />
      <label htmlFor="review-img-url">Add an image by URL</label>
      <input
        type="url"
        name="review-img-url"
        onChange={(event) => editNewReview(event, "review_img_url")}
        value={newReview.review_img_url}
      />
      <label htmlFor="review-body">Write your review</label>
      <textarea
        name="review-body"
        id=""
        cols="30"
        rows="10"
        onChange={(event) => editNewReview(event, "review_body")}
        value={newReview.review_body}
      />
      <label htmlFor="category-name">Category</label>
      <select
        name="category-name"
        onChange={(event) => {
          editNewReview(event, "category");
        }}
      >
        {categories.map((category) => {
          return (
            <option value={category.slug} key={category.slug}>
              {parseCategory(category.slug)}
            </option>
          );
        })}
      </select>
      <button onClick={(event) => handleSubmit(event, newReview)}>
        Submit review
      </button>
    </form>
  );
};

export default NewReview;
