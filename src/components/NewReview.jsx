import { useState } from "react";

const NewReview = () => {
  const [newReview, setNewReview] = useState({});

  return (
    <form action="" className="new-review-form">
      <label htmlFor="title">Title</label>
      <input type="text" name="title" />
      <label htmlFor="review-url">Add an image by URL</label>
      <input type="review-url" name="image" />
      <label htmlFor="review-body">Write your review</label>
      <textarea name="review-body" id="" cols="30" rows="10"></textarea>
    </form>
  );
};

export default NewReview;
