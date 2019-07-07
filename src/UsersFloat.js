import React, { Component } from 'react';
import logo from './logo.svg';
import './style.css';
import LoginPanel from './LoginPanel.js';
import { scrollUsers } from './scrollUsers.js';
import { handleLogin } from "./handleLogin.js";
import { getHsl } from "./getHsl.js";
import {saveCookie} from "./saveCookie";
import p5 from 'p5';
let floatingUsers;

class UsersFloat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      btnColor: null,
      currentPlayer: {
        id: null,
        name: "",
        score: null,
        color: "",
        password: ""
      },
      userAdded: 0
    };
    this.handleClick = this.handleClick.bind(this);
    this.userAdded = this.userAdded.bind(this);
    this.setCurrentPlayer = this.setCurrentPlayer.bind(this);
    this.collapseLoginPanel = this.collapseLoginPanel.bind(this);
  }

  handleClick(e) {
    if(e.target.nodeName === 'P') this.setState({btnColor: e.target.parentNode.style.backgroundColor});
    else this.setState({btnColor: e.target.style.backgroundColor});
    this.state.currentPlayer.id =
        this.state.users[(parseInt(e.target.getAttribute("id") || e.target.parentNode.getAttribute("id")))].id;

    this.state.currentPlayer.name =
        this.state.users[(parseInt(e.target.getAttribute("id") || e.target.parentNode.getAttribute("id")))].name;

    this.state.currentPlayer.color =
        this.state.users[(parseInt(e.target.getAttribute("id") || e.target.parentNode.getAttribute("id")))].color;

    this.state.currentPlayer.password =
        this.state.users[(parseInt(e.target.getAttribute("id") || e.target.parentNode.getAttribute("id")))].password;

    this.state.currentPlayer.score =
        this.state.users[(parseInt(e.target.getAttribute("id") || e.target.parentNode.getAttribute("id")))].score;

    handleLogin(e.target, this);
  }

  userAdded() {
    console.log("updating...");
    this.setState({ active: !this.state.active });
    fetch('http://192.168.1.13:3005/api')
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.setState({ users: data });
          console.log(data);
        }).catch((err) => {
      console.log(`Error occurred: ${err}`)
    });
  }



  componentDidMount() {
    fetch('http://192.168.1.13:3005/api')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ users: data });
        console.log(data);
      }).catch((err) => {
        console.log(`Error occurred: ${err}`)
      });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps !== prevState) {
      scrollUsers(document.querySelectorAll('.floating-user'), document.querySelector('#users-float'));
      const wrapper = document.querySelector("#users-float");
      const lastPlayer = wrapper.children[wrapper.children.length-2];
      if (lastPlayer.style.right === "") {
        console.log("Updated");
        scrollUsers(document.querySelectorAll('.floating-user'), document.querySelector('#users-float'));
        wrapper.childNodes.forEach(val => {val.style.right = ""})

        /*lastPlayer.style.right =
            parseInt(lastPlayer.previousSibling.style.right) -
            parseInt(window.getComputedStyle(lastPlayer).getPropertyValue("width")) +
            parseInt(window.getComputedStyle(lastPlayer).getPropertyValue("width")) - 25 + "px";*/
      }
    }
  }

  collapseLoginPanel() {
    const loginPanel = document.querySelector('#login-panel');
    if (loginPanel.style.display !== "none") {
      loginPanel.style.transition = 'height 0.4s ease, padding 0.4s ease';
      const expand_less = document.querySelector(".expand_less");
      expand_less.classList.add("collapsed");
      document.querySelector(".expand_less").setAttribute("id", "collapsed");
      /*loginPanel.style.height = "0";
      loginPanel.style.padding = "0";*/
      loginPanel.style.display = "none";
    }
  }

  setCurrentPlayer(id, name, color, password) {
    const credentials = {
      name: name,
      id: Math.floor(Math.random()*100000)
    };

    console.log(credentials);

    saveCookie(credentials, 'oby');

    // thisComponent.props.userId = credentials.id;
    this.setState({userId: credentials.id});

    this.state.currentPlayer.id = id;
    this.state.currentPlayer.name = name;
    this.state.currentPlayer.color = color;
    this.state.currentPlayer.password = password;
  }

  render() {
    const { users } = this.state;
    return (
      <div>
        <div id="users-float">
          {users.map((val, key) => {
            return (
                <div
                    id={key}
                    // onDoubleClick={e => this.props.statingFun(2)}
                    onDoubleClick={e => this.props.onGameBegin(true)}
                    onClick={e => {
                      this.setState({ active: false });
                      this.handleClick(e);
                    }}
                    style={{
                      background: val.color,
                      boxShadow: "2px 1px 9px 0 " + getHsl(val.color, 10)
                    }}
                    className="floating-user">
                  <p>{val.name}</p>
                </div>);
          })}
          <div
              id={"submit-name"}
              onClick={ () => {
                this.collapseLoginPanel();
                this.setState({ active: !this.state.active })
              } }
              className="floating-user"
              style={{
                background: "rgb(49, 131, 227)"
              }}
          ><p>+Dodaj gracza</p>
          </div>
        </div>
        <div>
          <LoginPanel
              setCurrentPlayer={this.setCurrentPlayer}
              userAdded={this.userAdded}
              players={this.state.users}
              currentPlayer={this.state.currentPlayer}
              setLoggedPlayer={this.props.setLoggedPlayer}
              socket={this.props.socket}
              btnColor={this.state.btnColor}
              switchLoginState={this.props.switchLoginState}
              loggedPlayer={this.props.loggedPlayer}
              addUserActive={this.state.active}
          />
        </div>
      </div>
    )
  }
}

export default UsersFloat;
