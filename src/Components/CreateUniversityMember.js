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

export class CreateUniversityMember extends React.Component {
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
      "https://us-central1-databases-project-274715.cloudfunctions.net/getUniversityMember",
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
            // body: JSON.stringify(string),
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
          all: data[0],
          retrieved: true,
        });
      });
    } catch (error) {
      return error;
    }
  };

  sendData = async (query) => {
    let urls = [
      "https://us-central1-databases-project-274715.cloudfunctions.net/createUniversityMember",
    ];
    console.log(query);
    // query = {
    //   computingID: "computingID3",
    //   firstName: "firstname",
    //   middleName: "middlename",
    //   lastName: "lastname",
    //   gender: "gender",
    //   age: 1,
    // }
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
              console.log(response);
              return response.json();
            })
            .then((data) => {
              console.log(data);
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
    await this.sendData({
      computingID: this.state.computingID,
      firstName: this.state.firstname,
      middleName: this.state.middlename,
      lastName: this.state.lastname,
      gender: this.state.gender,
      age: this.state.age,
    });
  };

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  };

  render() {
    let data = [];
    if (this.state.all && this.state.all.length > 0) {
      this.state.all.forEach((element) => {
        data.push(element);
      });
    }
    let display = [];

    data.forEach((d) => {
      display.push(
        <div>
          {d.computingID} {d.firstName} {d.middleName} {d.lastName} {d.gender}{" "}
          {d.age}{" "}
        </div>
      );
    });

    return (
      <div
        class="container justify-content-center"
        style={{ width: "100%", paddingTop: "60px" }}
      >
        {getSessionCookie().permission === "admin" ? (
          <div>
            <Form onSubmit={this.handleSubmit.bind(this)}>
              <div class="">
                {" "}
                <div
                  class="card shadow"
                  style={{ width: "100%", "margin-top": "10px" }}
                >
                  <div class="card-body">
                    <h5 class="card-title create-title"> Add New University Member</h5>
                    <p class="card-text create-title">
                      <div class="input-group">
                        <input
                          onChange={this.handleChange}
                          value={this.state.computingID}
                          type="text"
                          class="form-control"
                          name="computingID"
                          placeholder="Computing ID"
                          required
                        ></input>
                      </div>
                    </p>
                    <p class="d-flex justify-content-center"></p>
                  </div>
                  <div class="card-body">
                    <p class="card-text create-title">
                      <div class="input-group">
                        <input
                          onChange={this.handleChange}
                          value={this.state.firstname}
                          type="text"
                          class="form-control"
                          name="firstname"
                          placeholder="First Name"
                          required
                        ></input>
                      </div>
                    </p>
                    <p class="d-flex justify-content-center"></p>
                  </div>
                  <div class="card-body">
                    <p class="card-text create-title">
                      <div class="input-group">
                        <input
                          onChange={this.handleChange}
                          value={this.state.middlename}
                          type="text"
                          class="form-control"
                          name="middlename"
                          placeholder="Middle Name"
                          required
                        ></input>
                      </div>
                    </p>
                    <p class="d-flex justify-content-center"></p>
                  </div>
                  <div class="card-body">
                    <p class="card-text create-title">
                      <div class="input-group">
                        <input
                          onChange={this.handleChange}
                          value={this.state.lastname}
                          type="text"
                          class="form-control"
                          name="lastname"
                          placeholder="Last Name"
                          required
                        ></input>
                      </div>
                    </p>
                    <p class="d-flex justify-content-center"></p>
                  </div>
                  <div class="card-body">
                    <p class="card-text create-title">
                      <div class="input-group">
                        <input
                          onChange={this.handleChange}
                          value={this.state.gender}
                          type="text"
                          class="form-control"
                          name="gender"
                          placeholder="Gender"
                          required
                        ></input>
                      </div>
                    </p>
                    <p class="d-flex justify-content-center"></p>
                  </div>
                  <div class="card-body">
                    <p class="card-text create-title">
                      <div class="input-group">
                        <input
                          onChange={this.handleChange}
                          value={this.state.age}
                          type="number"
                          class="form-control"
                          name="age"
                          placeholder="Age"
                          required
                        ></input>
                      </div>
                    </p>
                    <br />
                    <b>Current University Members: </b>
                    {display}
                    <p class="d-flex justify-content-center"></p>
                  </div>
                </div>
              </div>
              <Button
                class="shadow-sm"
                style={{
                  backgroundColor: "#b48300",
                  borderColor: "#b48300",
                }}
                type="Submi"
                // onClick={this.handleSubmit}
              >
                Submit
              </Button>
            </Form>
          </div>
        ) : (
          <div>No Permission</div>
        )}
        <br />
        <br />
        {}
      </div>
    );
  }
}

export default CreateUniversityMember;
