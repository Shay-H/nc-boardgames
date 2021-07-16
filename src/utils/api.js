import axios from "axios";

const Api = axios.create({
  baseURL: "https://northcoders-boardgame-api.herokuapp.com/api",
});

export const getCategories = () => {
  return Api.get("/categories");
};

export const getUsers = () => {
  return Api.get("/users");
};

export const getUserByUsername = (username) => {
  return Api.get(`/users/${username}`);
};

export const getCommentsByUsername = (username) => {
  return Api.get(`/comments?author=${username}`);
};

export const getReviews = (queries = "") => {
  return Api.get(`/reviews?${queries}`);
};

export const getReviewById = (reviewId) => {
  return Api.get(`/reviews/${reviewId}`);
};

export const getCommentsByReviewId = (reviewId) => {
  return Api.get(`/reviews/${reviewId}/comments`);
};

export const postCommentByReviewId = (reviewId, commentObj) => {
  return Api.post(`/reviews/${reviewId}/comments`, commentObj);
};

export const deleteCommentByCommentId = (commentId) => {
  return Api.delete(`/comments/${commentId}`);
};

export const patchReviewById = (reviewId, reviewPatch) => {
  return Api.patch(`/reviews/${reviewId}`, reviewPatch);
};

export const deleteReviewByReviewId = (reviewId) => {
  return Api.delete(`/reviews/${reviewId}`);
};

export const postReview = (reviewToPost) => {
  return Api.post(`/reviews`, reviewToPost);
};

export const patchCommentById = (commentId, commentPatch) => {
  return Api.patch(`/comments/${commentId}`, commentPatch);
};
