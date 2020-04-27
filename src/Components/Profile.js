import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { InputGroup, Button, Form } from "react-bootstrap";
import Cookies from "js-cookie";

const getSessionCookie = () => {
  const sessionCookie = Cookies.get("session");

  if (sessionCookie === undefined) {
    return {};
  } else {
    return JSON.parse(sessionCookie);
  }
};

export class Profile extends React.Component {
  state = {
    classes: [],
    votes: [],
    computingID: "",
    permission: "",
    query: ""
  };

  componentWillMount() {
    let cookie = getSessionCookie();
    this.getData({ computingID: cookie.computingID });

    this.setState({
      computingID: cookie.computingID,
      permission: cookie.permission,
    });
  }

  getData = async (string) => {
    let urls = [
      "https://us-central1-databases-project-274715.cloudfunctions.net/getHasTaken",
      "https://us-central1-databases-project-274715.cloudfunctions.net/getVotesOn",
    ];
    try {
      Promise.all(
        urls.map((url) =>
          fetch(url, {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(string),
          })
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              return data;
            })
            .catch((error) => {
              return error;
            })
        )
      ).then((data) => {
        this.setState({
          classes: data[0],
          votes: data[1],
          retrieved: true,
        });
      });
    } catch (error) {
      return error;
    }
  };

  deleteData = async (query) => {
    let urls = [
      "https://us-central1-databases-project-274715.cloudfunctions.net/deleteVotesOn",
    ];
    try {
      Promise.all(
        urls.map((url) =>
          fetch(url, {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(query),
          })
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              return data;
            })
            .catch((error) => {
              console.log(error);
              return error;
            })
        )
      ).then((data) => {
        console.log(data);
        window.location.reload();
      });
    } catch (error) {
      return error;
    }
  };

  updateData = async (query) => {
    let urls = [
      "https://us-central1-databases-project-274715.cloudfunctions.net/updateVotesOn",
    ];
    try {
      Promise.all(
        urls.map((url) =>
          fetch(url, {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(query),
          })
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              return data;
            })
            .catch((error) => {
              console.log(error);
              return error;
            })
        )
      ).then((data) => {
        window.location.reload();
      });
    } catch (error) {
      return error;
    }
  };

  handleDelete = async (event) => {
    event.preventDefault();
    const target = event.target;
    // const value = target.value;
    const name = target.name;
    await this.deleteData({
      professorComputingID: name,
      studentComputingID: this.state.computingID,
    });
    // window.location.reload();
  };

  handleUpdate = async (event) => {
    event.preventDefault();
    const target = event.target;
    const value = target.value;
    const name = target.name;
    await this.updateData({
      professorComputingID: name,
      studentComputingID: this.state.computingID,
      voteValue: this.state[name],
    });
  };

  handleChange = async (event) => {
    event.preventDefault();
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
    // await this.deleteData({
    //   professorComputingID: name,
    //   studentComputingID: this.state.computingID,
    // });
    // window.location.reload();
  };

  handleFilter = async (event) => {
    event.preventDefault();
    this.setState({ query: event.target.value });
  };


  render() {
    let class_taken = [];
    let votes = [];
    if (this.state.classes && this.state.classes.length > 0) {
      this.state.classes.forEach((element) => {
        class_taken.push(element);
      });
    }

    if (this.state.votes && this.state.votes.length > 0) {
      this.state.votes.forEach((element) => {
        votes.push(element);
      });
    }

    votes = votes.filter(d=>{return d.professorComputingID.includes(this.state.query)})
    let display_class = [];
    let display_vote = [];

    class_taken.forEach((d) => {
      display_class.push(<div>{d.cid}</div>);
    });

    votes.forEach((d) => {
      display_vote.push(
        <div class="row">
          <div class="col" style={{ textAlign: "right" }}>
            {" "}
            {d.professorComputingID}: {d.voteValue}{" "}
          </div>
          <div class="col">
            <button
              onClick={this.handleDelete}
              name={d.professorComputingID}
              class="btn"
              style={{
                backgroundColor: "blue",
                width: "80px",
                color: "white",
                borderColor: "black",
              }}
            >
              Delete
            </button>
          </div>
          <div class="col">
            {" "}
            <form class="form-inline">
              <div class="d-flex justify-content-start">
                {" "}
                <input
                  name={d.professorComputingID}
                  onChange={this.handleChange}
                  type="text"
                  value={this.state[d.professorComputingID]}
                  style={{ width: "50px" }}
                />
              </div>
              <button
                onClick={this.handleUpdate}
                name={d.professorComputingID}
                class="btn"
                // type="submit"
                style={{
                  backgroundColor: "grey",
                  width: "80px",
                  color: "black",
                  borderColor: "black",
                }}
              >
                Update
              </button>
            </form>
          </div>
        </div>
      );
    });

    return (
      <div
        class="container justify-content-center"
        style={{ width: "100%", paddingTop: "60px" }}
      >
        {getSessionCookie().computingID ? (
          <div>
            <div
              class="card shadow"
              style={{ width: "100%", "margin-top": "10px" }}
            >
              {" "}
              <b>Computing ID:</b> {this.state.computingID}
              <br />
              <b>Role:</b>
              {this.state.permission}
              <br />
              <b>Classes Taken:</b>
              {display_class}
              <b>Votes Given:</b>
              <input
                  name="filter"
                  onChange={this.handleFilter}
                  type="text"
                  placeholder="Filter CID"
                  value={this.state.query}
                  style={{ width: "200px" }}
                />
              {display_vote}
            </div>
          </div>
        ) : (
          <div>Please Login</div>
        )}
      </div>
    );
  }
}

export default Profile;
