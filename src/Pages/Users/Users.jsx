import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { API_URL } from "../../Constants/Constants";

const Users = () => {
  const [userJWT, setUserJWT] = useState(null);
  const [users, setUsers] = useState([]);
  const token = sessionStorage.getItem("token");
  const [initialLoadCount, setInitialLoadCount] = useState(6); // Número de publicaciones a cargar inicialmente

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token && !userJWT) {
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

          setUserJWT(responseUser.data);

          const responseUsers = await axios.get(`${API_URL}/users`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const filteredData = responseUsers.data.filter(
            (user) => user.role.role !== "ADMIN" && user.username !== username
          );
          setUsers(filteredData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token, userJWT]);

  const handleScroll = () => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight;
    if (bottom) {
      setInitialLoadCount((prevCount) => prevCount + 6);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      {users.length > 0 ? (
        <div className="row">
          {users
            .sort((a, b) => b.idUser - a.idUser)
            .slice(0, initialLoadCount)
            .map((user) => (
              <div key={user.idUser} className="col-md-4 mb-3">
                <div className="card">
                  <img
                    src={
                      user.imageUser ? user.imageUser : "/img/user-avatar.svg"
                    }
                    alt="Perfil"
                    className="card-img-top mx-auto"
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
  
                  <div className="card-body bg-dark bg-gradient">
                    <b className="card-title text-white">{user.username}</b>
                    <p className="card-text text-white  mt-2">
                      {user.name} {user.firstSurname}
                    </p>
                    <i className="card-text text-white">{user.city}</i>
                  </div>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="col-md-12 text-center">
          <p className="mt-3">No hay usuarios disponibles</p>
        </div>
      )}
    </div>
  );  
};

export default Users;
