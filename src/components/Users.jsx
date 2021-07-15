import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getUserByUsername, getUsers } from "../utils/api";
import Loading from "./Loading";

const Users = () => {
  const [users, setUsers] = useState([]);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    getUsers().then(({ data }) => {
      const userPromises = data.users.map((user) => {
        return getUserByUsername(user.username);
      });
      Promise.all(userPromises).then((values) => {
        setUsers(values.map(({ data }) => data.user));
      });
      setIsLoading(false);
    });
  }, []);

  const handleClick = (event, username) => {
    history.push(`/users/${username}`);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <ul id="user-list">
        {users.map((user, i) => {
          return (
            <li key={user.username}>
              <div
                className={i % 2 === 0 ? "list-card" : "list-card-alt"}
                onClick={(event) => handleClick(event, user.username)}
              >
                <img src={user.avatar_url} alt={`${user.username}'s avatar`} />
                <div className="card-info">
                  <p>
                    <b>Username: </b>
                    {user.username}
                  </p>
                  <p>
                    <b>Name: </b> {user.name}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Users;
