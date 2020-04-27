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

export class Home extends React.Component {
  state = {
    data: [],
    computingID: "",
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    age: "",
  };

  componentWillMount() {
    // this.sendData()
    this.getData();
  }

  getData = async () => {
    let urls = [
      "https://us-central1-databases-project-274715.cloudfunctions.net/getProfessor",
    ];
    try {
      Promise.all(
        urls.map((url) =>
          fetch(url, {
            method: "GET",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
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
          professors: data[0],
          retrieved: true,
        });
        console.log(this.state.professors);
      });
    } catch (error) {
      return error;
    }
  };

  sendData = async (query) => {
    let urls = [
      "https://us-central1-databases-project-274715.cloudfunctions.net/addVotesOn",
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

  handleSubmit = async (event) => {
    event.preventDefault();
    const target = event.target;
    const value = target.value;
    const name = target.name;
    await this.sendData({
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
  };

  render() {
    let professors = [];
    if (this.state.professors && this.state.professors.length > 0) {
      this.state.professors.forEach((element) => {
        professors.push(element);
      });
    }

    let display = [];

    professors.forEach((d) => {
      display.push(
        <div class="row">
          <div class="col" style={{ textAlign: "right" }}>
            {" "}
            <b>{d.computingID} </b>Score: {d.score} No. Votes: {d.numVotes}{" "}
            Salary: {d.salary} Tenure: {d.tenure} Department:{d.dName}
          </div>
          <div class="col">
            {" "}
            <form class="form-inline">
              <div class="d-flex justify-content-start">
                {" "}
                <input
                  name={d.computingID}
                  onChange={this.handleChange}
                  type="text"
                  value={this.state[d.computingID]}
                  style={{ width: "50px" }}
                />
              </div>
              <button
                onClick={this.handleSubmit}
                name={d.computingID}
                class="btn"
                type="submit"
                style={{
                  backgroundColor: "grey",
                  width: "80px",
                  color: "black",
                  borderColor: "black",
                }}
              >
                Vote
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
              class="container justify-content-center"
              style={{ width: "100%", paddingTop: "60px" }}
            >
              {getSessionCookie().computingID ? (
                <div>
                  <div
                    class="card shadow"
                    style={{ width: "100%", "margin-top": "10px" }}
                  >
                    <b>Vote For Your Prof:</b>
                    {display}
                  </div>
                </div>
              ) : (
                <div>Please Login</div>
              )}
            </div>
          </div>
        ) : (
          <div>Please Login</div>
        )}
        <br />
        <br />
        {}
      </div>
    );
  }
}

export default Home;
