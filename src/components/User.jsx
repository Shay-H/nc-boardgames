import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReviews, getUserByUsername } from "../utils/api";

const User = () => {
  const [user, setUser] = useState({});
  const [reviews, setReviews] = useState([]);
  const { username } = useParams();
  const [disabledButtons, setDisabledButtons] = useState({});

  useEffect(() => {
    getUserByUsername(username).then(({ data }) => {
      setUser(data.user);
      console.log(data.user);
    });
  }, [username]);

  useEffect(() => {
    getReviews("?owner");
  });

  return (
    <div className="user-container">
      <div className="user-info">
        <img
          src={user.avatar_url}
          class="review-img"
          alt={`${user.username}'s avatar`}
        />
        <h2>{user.username}</h2>
        <p>
          <b>Name: </b>
          {user.name}
        </p>
      </div>
      <div className="reviews-cotnainer"></div>
    </div>
  );
};

export default User;
