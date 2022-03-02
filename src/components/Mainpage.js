import React from 'react';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useState } from 'react';
import regeneratorRuntime from "regenerator-runtime";
import UserProfile from './UserProfile';
import { db } from "../Util/Firebase";
import '../assets/css/uikit.css'
import Select from 'react-select';
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
  const [Info, setInfo] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [UserData, setUserData] = useState([]);
  const Username = Object.entries(location.state.detail)[3][1]
  const usersCollectionRef = collection(db, Username);

  const options = [
    { value: 'Done', label: 'Done' },
    { value: 'Stuck', label: 'Stuck' },
    { value: 'Working On It', label: 'Working On It' },
  ];



  const createTask = async () => {
    await addDoc(usersCollectionRef, { Task: Task, Info: Info,Status: selectedOption.value }), getUsers();
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

      <div className="Taskinputs uk-position-medium uk-position-center-left uk-overlay uk-overlay-default">
        <div className="uk-card uk-card-default">
          <div className="uk-card uk-card-default uk-card-body">
            <h3 className="uk-card-title">Create Task</h3>
              <div className="uk-margin">
                <input
                  className='uk-input uk-form-width-medium'
                  placeholder="Task..."
                  onChange={(event) => {
                    setTask(event.target.value);
                  }}
                />
              </div>


              <div className="uk-margin">
                <input
                  className='uk-input uk-form-width-medium'
                  placeholder="More Info..."
                  onChange={(event) => {
                    setInfo(event.target.value);
                  }}
                />
              </div>
              <div className="uk-margin">
                <Select
                  defaultValue={selectedOption}
                  onChange={setSelectedOption}
                  options={options}
                />
              </div>
              <button className="uk-button uk-button-default" onClick={createTask}> Create Task</button>
            </div>
          </div>



        </div>

        <div className="TaskList">
          {UserData.map((user) => {
            return (
              <div>
                <div className="uk-card uk-card-default uk-card-body uk-width-1-2@m uk-align-center">
                  <div className="uk-card-badge uk-label">
                    </div>
                  <h3 className="uk-card-title">{user.Task}</h3>
                  <p>{user.Info}</p>
                  <Select
                  defaultValue={user.Status}
                  onChange={setSelectedOption}
                  options={options}
                />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      );
}

      export default Mainpage;
