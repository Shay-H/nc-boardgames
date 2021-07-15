import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReviews, getUserByUsername } from "../utils/api";
import ReviewsList from "./ReviewsList";

const User = () => {
  const [user, setUser] = useState({});
  const { username } = useParams();
  const [disabledButtons, setDisabledButtons] = useState({});

  useEffect(() => {
    getUserByUsername(username).then(({ data }) => {
      setUser(data.user);
    });
  }, [username]);

  return (
    <div className="user-container">
      <div className="user-info">
        <img
          src={user.avatar_url}
          className="user-avatar"
          alt={`${user.username}'s avatar`}
        />
        <h2>{user.username}</h2>
        <p>
          <b>Name: </b>
          {user.name}
        </p>
      </div>
      <div className="user-reviews-and-comments">
        <UserReviews username={username} />
      </div>
    </div>
  );
};

export default User;

const UserReviews = ({ username }) => {
  const [userReviews, setUserReviews] = useState([]);

  useEffect(() => {
    getReviews().then(({ data }) => {
      const newUserReviews = data.reviews.filter(
        (review) => review.owner === username
      );
      setUserReviews(newUserReviews);
    });
  }, [username]);

  return (
    <div className="user-reviews-container">
      <div className="user-reviews-header">
        <h3>Reviews</h3>
        <div className="user-reviews-list">
          <ReviewsList reviews={userReviews} />
        </div>
      </div>
    </div>
  );
};

const UserComments = ({ username }) => {
  const [userComments, setUserComments] = useState([]);

  useEffect(() => {}, [username]);

  return (
    <div className="user-comments-container">
      <div className="user-comments-header">
        <h3>Comments</h3>
      </div>
    </div>
  );
};
