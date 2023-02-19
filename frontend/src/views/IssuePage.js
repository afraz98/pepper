import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faDumpsterFire } from "@fortawesome/free-solid-svg-icons"
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";

import '../style/issuepage.css'

const IssuePage = () => {
  const { user } = useContext(AuthContext);
  const [viewCompleted, setViewCompleted]  = useState(false);
  const [issueList, setIssueList] = useState([]);
  let navigate = useNavigate();

  // Update issue list
  useEffect(
    () => {
      refreshList()
    }, []
  )

  const routeChange = () => {
    let path = '/create'
    navigate(path)
  }

  const refreshList = () => {
    axios.get("http://localhost:8000/api/issues/").then((res) => setIssueList(res.data)).catch((err) => console.log(err));
  };

  const handleDelete = (item) => {
    axios.delete(`http://localhost:8000/api/issues/${item.id}/`);
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
        <span className={viewCompleted ? "nav-link active text-black" : "nav-link text-white"} onClick={() => displayCompleted(true)}> Complete </span>
        <span className={viewCompleted ? "nav-link text-white" : "nav-link active text-black"} onClick={() => displayCompleted(false)}> Incomplete </span>
      </div>
    );
  };

  const renderItems = () => {
    const newItems = Object.values(issueList).filter((item) => item.completed === viewCompleted);

    return ( 
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th> Date </th>
            <th> Title </th>
            <th> Assignee </th>
            <th> Reporter </th>
            <th> Options </th>
          </tr>
        </thead>
        <tbody>
          {
            newItems.map (
              (item) => (
                <tr>
                  <th> {item.date} </th>
                  <th className={`issue-title mr-2 ${ viewCompleted ? "completed-issue" : ""}`} title={item.description}> {item.title} </th>
                  <th> {item.reporter} </th>
                  <th> {item.assignee} </th>
                  <th>
                    <button className="btn btn-secondary mr-2 btn-success"> <FontAwesomeIcon icon={faPencil}/> </button>
                    <button className="btn btn-danger" onClick={() => handleDelete(item)}> <FontAwesomeIcon icon={faDumpsterFire}/> </button>
                  </th>
                </tr>
              )
            )
          }
        </tbody>
      </Table>
    );
  };

  return (
    <main className="container">
      <div className="row">
        <div className="col-md-6 col-sm-10 mx-auto p-0">
        
          <div className="issue-page">
          <p> Hello, <b>{user.username}</b>!</p>
            <div className="p-3">
              <button className="btn btn-danger" onClick={routeChange}> Create Issue </button></div>
              { 
                renderTabList() 
              }
              
              <ul className="list-group list-group-flush border-top-0">
              { 
                renderItems() 
              }
              </ul>
          </div>
        </div>
      </div>
    </main>
  );
  
};

export default IssuePage;