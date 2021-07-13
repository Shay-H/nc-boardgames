import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getUserByUsername, getUsers } from "../utils/api";

const Users = () => {
  const [users, setUsers] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getUsers().then(({ data }) => {
      const userPromises = data.users.map((user) => {
        return getUserByUsername(user.username);
      });
      Promise.all(userPromises).then((values) =>
        setUsers(values.map(({ data }) => data.user))
      );
    });
  }, []);

  const handleClick = (event, username) => {
    history.push(`/users/${username}`);
  };

  return (
    <div>
      <ul id="user-list">
        {users.map((user) => {
          return (
            <li key={user.username}>
              <div
                className="list-card"
                onClick={(event) => handleClick(event, user.username)}
              >
                <img src={user.avatar_url} alt={`${user.username}'s avatar`} />
                <p>
                  <b>Username: </b>
                  {user.username}
                </p>
                <p>
                  <b>Name: </b> {user.name}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Users;
