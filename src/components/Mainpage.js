import React from 'react';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useState } from 'react';
import regeneratorRuntime from "regenerator-runtime";
import UserProfile from './UserProfile';
import { db } from "../Util/Firebase";
import '../assets/css/uikit.css'
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import UserData from './UserData';

function Mainpage() {
  const location = useLocation();
  const [Task, setTask] = useState('');
  const [Status, setStatus] = useState('');
  const [UserData, setUserData] = useState([]);
  const Username = Object.entries(location.state.detail)[3][1]
  const usersCollectionRef = collection(db, Username);

  const createTask = async () => {
    await addDoc(usersCollectionRef, { Task: Task, Status: Status }), getUsers();
  };


  const deleteTask = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };

  const getUsers = async () => {
    const data = await getDocs(usersCollectionRef);
    console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setUserData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };


  useEffect(() => {

    getUsers();
  }, []);


  return (
    <div>
      <UserProfile data={location.state.detail} />
      <input
        placeholder="Task..."
        onChange={(event) => {
          setTask(event.target.value);
        }}
      />
      <input
        placeholder="Status..."
        onChange={(event) => {
          setStatus(event.target.value);
        }}
      />

      <button onClick={createTask}> Create Task</button>

      {UserData.map((user) => {
        return (
          <div>
            <div class="uk-card uk-card-default uk-card-body uk-width-1-2@m uk-align-right">
              <div class="uk-card-badge uk-label">{user.Status}</div>
              <h3 class="uk-card-title">Task</h3>
              <p>{user.Task}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Mainpage;
