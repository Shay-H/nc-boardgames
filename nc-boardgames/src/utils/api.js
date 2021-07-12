import axios from "axios";

const Api = axios.create({
  baseURL: "https://northcoders-boardgame-api.herokuapp.com/api",
});

export const getCategories = () => {
  return Api.get("/categories");
};
