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

export const getReviews = (queries = "") => {
  return Api.get(`/reviews?${queries}`);
};

export const getReviewById = (reviewId) => {
  return Api.get(`/reviews/${reviewId}`);
};

export const getCommentsByReviewId = (reviewId) => {
  return Api.get(`/reviews/${reviewId}/comments`);
};
