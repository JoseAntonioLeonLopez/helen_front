import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { API_URL } from "../../Constants/Constants";

const Users = () => {
  const [userJWT, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const decodedToken = jwtDecode(token);
        const username = decodedToken.sub;
        const responseUser = await axios.get(
          `${API_URL}/users/username/${username}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(responseUser.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    
    const fetchUsers = async () => {
      try {
        const responseUsers = await axios.get(`${API_URL}/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const filteredData = responseUsers.data.filter(user => user.role.role !== 'ADMIN' && user.username !== (userJWT?.username ?? null));
        setUsers(filteredData);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (token) { 
      fetchUser();
      fetchUsers();
    }
  }, [token, userJWT]);

  return (
    <div>
      <div className="row">
        {users.map((user) => (
          <div key={user.idUser} className="col-md-4 mb-4">
            <div className="card">
              <img
                src={user.imageUser ? user.imageUser : "/img/user-avatar.svg"}
                alt="Perfil"
                className="card-img-top mx-auto"
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />

              <div className="card-body bg-dark bg-gradient">
                <h5 className="card-title text-white">{user.username}</h5>
                <p className="card-text text-white">
                  {user.name} {user.firstSurname}
                </p>
                <p className="card-text text-white">{user.city}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
