import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';
import { API_URL } from "../../Constants/Constants";
import PublicationCard from "../../Components/Publications/PublicationCard";

const TopPublication = () => {
  const [publications, setPublications] = useState([]);
  const [users, setUsers] = useState([]);
  const [likes, setLikes] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [userFromToken, setUserFromToken] = useState(null);
  const [userLikes, setUserLikes] = useState({});
  const [initialLoadCount, setInitialLoadCount] = useState(6); // Número de publicaciones a cargar inicialmente

  useEffect(() => {
    const fetchUserFromToken = async () => {
      try {
        const token = sessionStorage.getItem("token");
        if (token) {
          const decodedToken = jwtDecode(token); 
          const username = decodedToken.sub; 
          const response = await axios.get(`${API_URL}/users/username/${username}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserFromToken(response.data);
        }
      } catch (error) {
        console.error("Error fetching user from token:", error);
      } 
    };

    fetchUserFromToken();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await axios.get(`${API_URL}/publications/top`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPublications(response.data);
        setLoaded(true);
      } catch (error) {
        console.error("Error fetching publications:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ocurrió un error al cargar las publicaciones. Por favor, inténtalo de nuevo más tarde.",
        });
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const userPromises = publications.map(async (publication) => {
          const response = await axios.get(
            `${API_URL}/users/${publication.fkUser}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          return response.data;
        });
        const users = await Promise.all(userPromises);
        setUsers(users);
      } catch (error) {
        console.error("Error fetching users:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Ocurrió un error al cargar la información de los usuarios. Por favor, inténtalo de nuevo más tarde.",
        });
      }
    };

    if (publications.length > 0) {
      fetchUsers();
    }
  }, [publications]);

  useEffect(() => {
    const likesCount = publications.reduce((acc, publication) => {
      // Verificar si publication.favorites es null o undefined antes de acceder a su propiedad length
      if (publication.favorites) {
        acc[publication.idPublication] = publication.favorites.length;
      }
      return acc;
    }, {});
    setLikes(likesCount);
  }, [publications]);

  useEffect(() => {
    const userLikesMap = publications.reduce((acc, publication) => {
      // Verificar si publication.favorites es null o undefined antes de llamar a some()
      const likedByUser = publication.favorites && publication.favorites.some(favorite => favorite.fkUser === userFromToken.idUser);
      acc[publication.idPublication] = likedByUser;
      return acc;
    }, {});    
    setUserLikes(userLikesMap);
  }, [publications, userFromToken]);

  const handleLikeClick = async (publicationId) => {
    try {
      const token = sessionStorage.getItem("token");
      const liked = userLikes[publicationId];
  
      if (liked) {
        await axios.delete(`${API_URL}/userFav/${userFromToken.idUser}/${publicationId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await axios.post(
          `${API_URL}/userFav/${publicationId}`,
          { fkUser: userFromToken.idUser },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
  
      const updatedLikes = { ...likes };
      updatedLikes[publicationId] = liked ? updatedLikes[publicationId] - 1 : updatedLikes[publicationId] + 1;
      setLikes(updatedLikes);
      
      setUserLikes((prevUserLikes) => ({
        ...prevUserLikes,
        [publicationId]: !liked,
      }));
    } catch (error) {
      console.error("Error liking/unliking publication:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al dar/quitar like a la publicación. Por favor, inténtalo de nuevo más tarde.",
      });
    }
  };  

  const handleScroll = () => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight;
    if (bottom) {
      setInitialLoadCount((prevCount) => prevCount + 6);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderPublicationCards = () => {
    const sortedPublications = publications.length > 0 ? publications.sort((a, b) => b.idPublication - a.idPublication) : [];
    const slicedPublications = sortedPublications.slice(0, initialLoadCount);
    const rows = [];
    for (let i = 0; i < slicedPublications.length; i += 3) {
      const rowItems = [];
      for (let j = i; j < i + 3 && j < slicedPublications.length; j++) {
        rowItems.push(
          <PublicationCard
            key={slicedPublications[j].idPublication}
            publication={slicedPublications[j]}
            user={users[j]}
            liked={userLikes[slicedPublications[j].idPublication]}
            likes={likes[slicedPublications[j].idPublication]}
            onLikeClick={() => handleLikeClick(slicedPublications[j].idPublication)}
          />
        );
      }
      rows.push(
        <div className="row" key={i}>
          {rowItems}
        </div>
      );
    }
    return rows;
  };

  return (
    <div className="container">
      {/* Manejar la carga inicial de publicaciones */}
      {!loaded ? (
        <div className="row justify-content-center">
          <div className="col-md-12 text-center">
            <p>Cargando publicaciones...</p>
          </div>
        </div>
      ) : (
        // Mostrar las publicaciones solo si loaded es true y publications no está vacío
        publications.length > 0 ? renderPublicationCards() : (
          <div className="row justify-content-center">
            <div className="col-md-12 text-center">
              <p>No hay publicaciones disponibles</p>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default TopPublication;
