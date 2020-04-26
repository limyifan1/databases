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
    data: [],
    computingID: "",
    permission: "",
  };

  componentWillMount() {
    this.getData();
    let cookie = getSessionCookie();
    this.setState({
      computingID: cookie.computingID,
      permission: cookie.permission,
    });
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

  render() {
    let data = [];
    if (this.state.all && this.state.all.length > 0) {
      this.state.all.forEach((element) => {
        data.push(element);
      });
    }
    let display = [];

    data.forEach((d) => {
      display.push(<div></div>);
    });

    return (
      <div
        class="container justify-content-center"
        style={{ width: "100%", paddingTop: "60px" }}
      >
        {getSessionCookie().computingID ? (
          <div>
            {" "}
            Computing ID: {this.state.computingID}
            <br />
            Role: {this.state.permission}
          </div>
        ) : (
          <div>Please Login</div>
        )}
      </div>
    );
  }
}

export default Profile;
