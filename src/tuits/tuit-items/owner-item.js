import React from "react";
import { useDispatch } from "react-redux";
import { FaTwitter, FaCheck, FaTimes, FaDog } from "react-icons/fa";
import TuitStats from "../tuit-stats";
import "./tuit-item.css";
import {deleteTuitThunk} from "../../services/tuits-thunks"
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';

const SERVER_API_URL = process.env.REACT_APP_SERVER_API_URL;
const USERS_URL = `${SERVER_API_URL}/users`;


const OwnerTuit = ({ tuit }) => {
  const dispatch = useDispatch();
  const deleteTuitHandler = (id) => {
    dispatch(deleteTuitThunk(id));
}
const [users, setUsers] = useState([]);

useEffect(() => {
  // Step 2: Fetch data

  const fetchUsers = async () => {
      try {
          const response = await fetch(USERS_URL);  // Assuming you are calling your backend on the same domain
          if (!response.ok) {
              throw new Error('Failed to fetch users');
          }
          const data = await response.json();

          // Step 3: Update state with fetched data
          setUsers(data);
      } catch (error) {
          console.error("There was an error fetching the users:", error);
      }
  };

  fetchUsers();
}, []);
console.log(users)
const user = users.find(user => user.username === tuit.username);
const userId = user ? user._id : null;

const USERNAME = tuit.username
return (
  <div className="tuit-item-owner border rounded p-3 my-2" style={{ backgroundColor: 'rgba(255, 200, 200, 1)', position: 'relative'  }}>
    <FaTimes onClick={() => deleteTuitHandler(tuit._id)} style={{ cursor: 'pointer', position: 'absolute', top: '10px', right: '10px' }} />
    <div className="d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center">
      <FaDog style={{ marginRight: '10px' }} />
      <h5 className="mb-0">
            {userId ? 
              <Link to={`/profile/${userId}`}>{tuit.username}</Link> : 
              tuit.username
            }
          </h5>
        <span className="ml-2 badge badge-custom">{tuit.role}</span>
      </div>
      
      <small className="text-muted">{tuit.time}</small>
      
    </div>
    <hr />
    <b>Seeking a {tuit.seekingrole} for my {tuit.selectedDogBreed}, {tuit.selectedDogName}</b>
    <hr />
    <h6 className="mt-2">{tuit.title}</h6>
    <p>{tuit.tuit}</p>
    
    <div className="mt-3">
      <TuitStats tuit={tuit} />
      
    </div>
  </div>
);
};
export default OwnerTuit;
