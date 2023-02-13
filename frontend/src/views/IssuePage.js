import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faDumpsterFire } from "@fortawesome/free-solid-svg-icons"

import Modal from "../components/Modal";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import '../style/issuepage.css'

const IssuePage = () => {
  const { user } = useContext(AuthContext);
  const [viewCompleted, setViewCompleted]  = useState(false);
  const [userList, setUserList] = useState([]);
  const [issueList, setIssueList] = useState([]);
  const [modal, setModal] = useState(false);
  const [activeItem, setActiveItem] = useState({});

  // Update issue list
  useEffect(
    () => {
      setTimeout(refreshList, 5000)
    }
  )

  const refreshList = () => {
    axios.get("http://localhost:8000/api/issues/").then((res) => setIssueList(res.data)).catch((err) => console.log(err));
    axios.get("http://localhost:8000/api/users/").then((res) => setUserList(res.data)).catch((err) => console.log(err));
  };

  const toggle = () => {
    setModal(!modal)
  };

  const handleSubmit = (item) => {
    toggle();
    console.log(item)

    if (item.id) {
      axios.put(`http://localhost:8000/api/issues/${item.id}/`, item);
      return;
    }
    axios.post("http://localhost:8000/api/issues/", item);
  };

  const handleDelete = (item) => {
    axios.delete(`http://localhost:8000/api/issues/${item.id}/`);
  };

  const createItem = () => {
    const item = { title: "", description: "", completed: false, assignee: "Unassigned", priority: "Low", reporter: "No Reporter", date: "2023-01-01" };
    setActiveItem(item);
    setModal(!modal)
  };

  const editItem = (item) => {
    setModal(!modal)
    setActiveItem(item);
  };

  const displayCompleted = (status) => {
    if (status) {
      setViewCompleted(true);
    }

    setViewCompleted(false);
  };

  const renderTabList = () => {
    return (
      <div className="nav nav-tabs">
        <span className={viewCompleted ? "nav-link active" : "nav-link"} onClick={() => displayCompleted(true)}> Complete </span>
        <span className={viewCompleted ? "nav-link" : "nav-link active"} onClick={() => displayCompleted(false)}> Incomplete </span>
      </div>
    );
  };

  const renderItems = () => {
    const newItems = Object.values(issueList).filter((item) => item.completed === viewCompleted);

    return ( 
      newItems.map((item) => (
      <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
        <span className="">
          {item.date}
        </span>
        <span className={`issue-title mr-2 ${ viewCompleted ? "completed-issue" : ""}`} title={item.description}> 
          {item.title} 
        </span>
        <span className="">
          {item.reporter}
        </span>
        <span className="">
          {item.assignee}
        </span>
        <span>
          <button className="btn btn-secondary mr-2 btn-success" onClick={() => editItem(item)}> <FontAwesomeIcon icon={faPencil}/> </button>
          <button className="btn btn-danger" onClick={() => handleDelete(item)}> <FontAwesomeIcon icon={faDumpsterFire}/> </button>
        </span>
      </li>
    )));
  };

  return (
    <main className="container">
      <div className="row">
        <div className="col-md-6 col-sm-10 mx-auto p-0">
        
          <div className="issue-page">
          <p> Hello, <b>{user.username}</b>!</p>
            <div className="p-3">
              <button className="btn btn-primary" onClick={createItem}> Create Issue </button></div>
              { renderTabList() }
              <ul className="list-group list-group-flush border-top-0">
              { renderItems() }
              </ul>
          </div>
        </div>
      </div>
      { modal ? ( <Modal activeItem={activeItem} toggle={toggle} onSave={handleSubmit} userList={userList}/> ) : null}
    </main>
  );
  
};

export default IssuePage;