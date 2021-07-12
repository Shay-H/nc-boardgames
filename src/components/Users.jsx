import { useEffect, useState } from "react";
import { getUserByUsername, getUsers } from "../utils/api";

const Users = () => {
  const [users, setUsers] = useState([]);

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

  return (
    <div>
      <ul id="user-list">
        {users.map((user) => {
          return (
            <li className="user-card" key={user.username}>
              <div>
                <p>
                  <b>Username: </b>
                  {user.username}
                </p>
                <p>
                  <b>Name: </b> {user.name}
                </p>
                <img src={user.avatar_url} alt={`${user.username}'s avatar`} />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Users;
