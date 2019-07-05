import React, { Component } from 'react';
import AddUser from './AddUser.js'
import './style.css';
import Button from '@material-ui/core/Button';
import Fab from '@material/react-fab';
import { loginToGame } from "./loginToGame";

// This is official MDC:
// import Button from '@material/react-button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';
import TextField, {HelperText, Input} from '@material/react-text-field';
import MaterialIcon from '@material/react-material-icon';
// import {MDCTextField} from '@material/textfield/index';
import {MDCTextField} from '@material/textfield';


let uniTheme = {
  palette: {
    primary: {
      main: "rgb(255, 0, 0)"
    },
    secondary: {
      light: '#ebff00',
      main: '#42ff00',
      contrastText: '#ffcc00',
    },
  },
}

class uniThemeCls{
  constructor(a) {
    let palette, typography;
    this.palette = {
      primary: {
        main: a
      },
      secondary: {
        light: '#ebff00',
        main: a,
        contrastText: '#ffcc00',
      },
    }
  }
}

const passwordTheme = new createMuiTheme( {
  palette: {
    primary: {
      main: '#ed143d',
    },
    secondary: {
      light: '#ebff00',
      main: '#42ff00',
      contrastText: '#ffcc00',
    },
  },
});

const inputStyle ={
  width: '230px',
  borderRadius: '30px'
}

let theme0 = new createMuiTheme(uniTheme);

class LoginPanel extends Component {
  handleTopChangeClick(e) {
    let moveTopStyle = {
      top: '0'
    };
    let floatingLabel = document.querySelector(".mdc-floating-label");
    floatingLabel.style.top = '19px';
    console.log('Gitarka!1!1');
  }

  handleTopChangeBlur(e) {
    let moveTopStyle = {
      top: '0'
    };
    let floatingLabel = document.querySelector(".mdc-floating-label");
    let pass = document.querySelector('.mdc-pass');
    if (pass.value == "")
    floatingLabel.style.top = '13px';
    // floatingLabel.style = moveTopStyle;
    console.log('Gitarka!1!1');
  }

  handleSubmitLogin(e) {
    if(e.which === 13 && !e.shiftKey){
     loginToGame(e.target, this.props.switchLoginState, this.props.socket, this.props.setLoggedPlayer, this.props.currentPlayer);
   }
  }

  collapseLoginPanel() {
    const loginPanel = document.querySelector('#login-panel');
    loginPanel.style.transition = 'height 0.4s ease, padding 0.4s ease';
    const expand_less = document.querySelector(".expand_less");
    expand_less.classList.add("collapsed");
    document.querySelector(".expand_less").setAttribute("id", "collapsed");
    loginPanel.style.height = "0";
    loginPanel.style.padding = "0";
    setTimeout(() =>{
      loginPanel.style.display = "none";
    }, 400);
  }

  constructor(props){
    super(props);
    this.state = {
      thm: 'theme0'
    }

    this.handleTopChangeClick = this.handleTopChangeClick.bind(this);
    this.handleTopChangeBlur = this.handleTopChangeBlur.bind(this);
    this.handleSubmitLogin = this.handleSubmitLogin.bind(this);
    this.collapseLoginPanel = this.collapseLoginPanel.bind(this);
  }



  render() {
      return(
      <div>
      <div id="login-panel">
          <p className={'pass-info'}>Podaj hasło dla <span id="login-panel-name"></span>:</p>
          <div onClick={this.handleTopChangeClick}
               onFocus={this.handleTopChangeClick}
               onBlur={this.handleTopChangeBlur}
               className={"password-text-field mdc-text-field mdc-text-field--outlined"}>
            <input
                type={'password'}
                onKeyPress={(e) => this.handleSubmitLogin(e)}
                id="tf-outlined"
                className="mdc-pass mdc-text-field__input"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0)",
                  borderRadius: "40px"
                }}
            />
            <div className="mdc-notched-outline">
              <div className="mdc-notched-outline__leading"></div>
              <div className="mdc-notched-outline__notch">
                <label htmlFor="tf-outlined" style={{top: '19px'}} className="mdc-floating-label lower">Podaj hasło</label>
              </div>
              <div className="mdc-notched-outline__trailing"></div>
            </div>
          </div>
          <MuiThemeProvider theme={this.props.btnColor !== null ? new createMuiTheme(new uniThemeCls(this.props.btnColor)) : theme0}>
            <Button
                name={'login'}
                onClick={() => {
                  loginToGame(document.querySelector('.mdc-pass'),
                      this.props.switchLoginState,
                      this.props.socket,
                      this.props.setLoggedPlayer,
                      this.props.currentPlayer)
                }}
                variant="contained" color="primary">
              Zaloguj
            </Button>
            <Fab
                id={"collapsed"}
                onClick={() => this.collapseLoginPanel()}
                icon={<span className="material-icons">expand_less</span>}
                className={"mdc-fab--mini expand_less"}
                color="primary"
                style={{
                  marginTop: "20px",
                  position: "absolute",
                  bottom: "10px",
                  right: "10px"
                }}
            />
          </MuiThemeProvider>
      </div>
        { this.props.addUserActive ? <AddUser
            userAdded={this.props.userAdded}
            addUserActive={this.props.addUserActive}
            switchLoginState={this.props.switchLoginState}
            socket={this.props.socket}
            setLoggedPlayer={this.props.setLoggedPlayer}
            currentPlayer={this.props.currentPlayer}
            setCurrentPlayer={this.props.setCurrentPlayer}
        /> : null }
      </div>
  );
  }

}

export default LoginPanel;
