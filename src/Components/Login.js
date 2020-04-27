import React, { useState } from "react";
import { Link } from "react-router-dom";

import { InputGroup, Button, Form } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import Cookies from "js-cookie";

const setSessionCookie = (session) => {
  Cookies.remove("session");
  Cookies.set("session", session, { expires: 14 });
};

const getSessionCookie = () => {
  const sessionCookie = Cookies.get("session");

  if (sessionCookie === undefined) {
    return {};
  } else {
    return JSON.parse(sessionCookie)
  }
};

export class Login extends React.Component {
  state = {
    data: [],
    computingID: "yl3ab",
    password: "",
  };

  sendData = async (string) => {
    let urls = [
      "https://us-central1-databases-project-274715.cloudfunctions.net/getLogin",
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
          all: data[0],
          retrieved: true,
        });
        if (
          this.state.retrieved &&
          this.state.all[0].password === this.state.password
        ) {
          setSessionCookie({
            computingID: this.state.computingID,
            permission: this.state.all[0].permission,
          });
          console.log(getSessionCookie());
          this.props.history.push({
            pathname: "/profile",
          });
          alert("logged in");
        } else {
          alert("login failed");
        }
      });
    } catch (error) {
      return error;
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.sendData({
      computingID: this.state.computingID,
      password: this.state.password,
    });
  };

  handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div
        class="container justify-content-center"
        style={{ width: "100%", paddingTop: "60px" }}
      >
        {" "}
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <div class="">
            {" "}
            <div
              class="card shadow"
              style={{ width: "100%", "margin-top": "10px" }}
            >
              <div class="card-body">
                <h5 class="card-title create-title"> Login</h5>
              </div>
              <div class="card-body">
                <p class="card-text create-title">
                  <div class="input-group">
                    <input
                      onChange={this.handleChange}
                      value={this.state.computingID}
                      type="text"
                      class="form-control"
                      name="computingID"
                      placeholder="Username"
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
                      value={this.state.password}
                      type="text"
                      class="form-control"
                      name="password"
                      placeholder="Password"
                      required
                    ></input>
                  </div>
                </p>
                <Button
                  class="shadow-sm"
                  style={{
                    backgroundColor: "#b48300",
                    borderColor: "#b48300",
                  }}
                  type="Submit"
                  // onClick={this.handleSubmit}
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
        </Form>
        <br />
        <br />
        {}
      </div>
    );
  }
}

export default withRouter(Login);
