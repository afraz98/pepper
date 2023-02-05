import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faDumpsterFire } from "@fortawesome/free-solid-svg-icons"

import Modal from "./Modal";
import axios from "axios";

class IssuePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      issueList: [],
      modal: false,
      activeItem: {
        title: "",
        description: "",
        completed: false,
        assignee: "",
        priority: "",
        reporter: "",
        date: "",
      }
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios.get("http://localhost:8000/api/issues/").then((res) => this.setState({ issueList: res.data })).catch((err) => console.log(err));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = (item) => {
    this.toggle();
    console.log(item)

    if (item.id) {
      axios.put(`http://localhost:8000/api/issues/${item.id}/`, item).then((res) => this.refreshList());
      return;
    }
    axios.post("http://localhost:8000/api/issues/", item).then((res) => this.refreshList());
  };

  handleDelete = (item) => {
    axios.delete(`http://localhost:8000/api/issues/${item.id}/`).then((res) => this.refreshList());
  };

  createItem = () => {
    const item = { title: "", description: "", completed: false, assignee: "Unassigned", priority: "Low", reporter: "No Reporter", date: "2023-01-01" };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  displayCompleted = (status) => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }

    return this.setState({ viewCompleted: false });
  };

  renderTabList = () => {
    return (
      <div className="nav nav-tabs">
        <span className={this.state.viewCompleted ? "nav-link active" : "nav-link"} onClick={() => this.displayCompleted(true)}> Complete </span>
        <span className={this.state.viewCompleted ? "nav-link" : "nav-link active"} onClick={() => this.displayCompleted(false)}> Incomplete </span>
      </div>
    );
  };

  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.issueList.filter((item) => item.completed === viewCompleted);

    return newItems.map((item) => (
      <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
        <span className="">{item.date}</span>
        <span className={`issue-title mr-2 ${this.state.viewCompleted ? "completed-issue" : ""}`} title={item.description}> {item.title} </span>
        <span>
          <button className="btn btn-secondary mr-2 btn-danger" onClick={() => this.editItem(item)}> <FontAwesomeIcon icon={faPencil}/> </button>
          <button className="btn btn-danger" onClick={() => this.handleDelete(item)}> <FontAwesomeIcon icon={faDumpsterFire}/> </button>
        </span>
      </li>
    ));
  };

  render() {
    return (
      <main className="container">
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="mb-4"><button className="btn btn-primary" onClick={this.createItem}> Create Issue </button></div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush border-top-0">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        { this.state.modal ? ( <Modal activeItem={this.state.activeItem} toggle={this.toggle} onSave={this.handleSubmit}/> ) : null}
      </main>
    );
  }
}

export default IssuePage;