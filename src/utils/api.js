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

export const getReviews = () => {
  return Api.get(`/reviews`);
};

export const getReviewById = (reviewId) => {
  return Api.get(`/reviews/${reviewId}`);
};
