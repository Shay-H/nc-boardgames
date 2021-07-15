import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReviews, getUserByUsername } from "../utils/api";
import Comments from "./Comments";
import Loading from "./Loading";
import ReviewsList from "./ReviewsList";

const User = () => {
  const [user, setUser] = useState({});
  const { username } = useParams();
  const [isLoaded, setIsLoaded] = useState(false);
  const [disabledElements, setDisabledElements] = useState({});

  useEffect(() => {
    setIsLoaded(false);
    getUserByUsername(username).then(({ data }) => {
      setUser(data.user);
      setIsLoaded(true);
    });
  }, [username]);

  if (!isLoaded) return <Loading />;
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
        <UserReviews username={username} disabledElements={disabledElements} />
      </div>
    </div>
  );
};

export default User;

const UserReviews = ({ username, disabledElements }) => {
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
      <div className="user-comments-header">
        <h3>Comments</h3>
        <div className="user-comments-list">
          <Comments username={username} disabledElements={disabledElements} />
        </div>
      </div>
    </div>
  );
};
