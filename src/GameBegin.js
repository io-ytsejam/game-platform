import React, { Component } from 'react';
import './style.css';
import UsersFloat from './UsersFloat.js';
import IconButton from '@material/react-icon-button';
import MaterialIcon from '@material/react-material-icon';
import { rotateIn } from './rotateIcons';
import { rotateOut } from './rotateIcons';
import LoggedUserPanel from "./LoggedUserPanel.js";



class GameBegin extends Component{
  constructor(props) {
    super(props);
    this.state = {
        loggedIn: false
    }

    this.onUserLogged = this.onUserLogged.bind(this);
    this.switchLogged = this.switchLogged.bind(this);
  }


  onUserLogged(loginStatus, localProps) {
      if(loginStatus)
          return (
              <LoggedUserPanel
                  opponentPlayer={this.props.opponentPlayer}
                  setOpponentPlayer={this.props.setOpponentPlayer}
                  loggedPlayer={this.props.loggedPlayer}
                  onGameBegin={this.props.onGameBegin}
                  socket={this.props.socket}
              />
          )
      else if (this.props.opponentPlayer.id !== -1)
          return <div/>;
      else return (
          <UsersFloat
              onGameBegin={this.props.onGameBegin}
              setLoggedPlayer={this.props.setLoggedPlayer}
              statingFun={localProps.statingFun}
              socket={this.props.socket}
              switchLoginState={this.switchLogged}
          />
      )
  }

  switchLogged () {
       this.setState({loggedIn: !this.state.loggedIn});
  }

  render() {
    return(
      <div id="game-begin" className="popup">
        <div id="close-highlight" className="close">
              <IconButton className={'close-sign'}
                          onMouseEnter={event => rotateIn(event, 180)}
                          onMouseLeave={event => rotateOut(event)}
                          style={{transform: 'rotate(0deg'}}
              ><MaterialIcon icon='close' />
              </IconButton>
          </div>
          <div style={{padding: '20px'}}>
            <h2>Grasz jako <span id="welcome-name">{ this.props.userId }</span></h2>
            <hr style={{borderColor: 'wheat'}}></hr>
          </div>
          <div id="select-user" style={{display: 'block'}}>
              {this.onUserLogged(this.state.loggedIn, this.props)}
            {/*<UsersFloat statingFun={this.props.statingFun} userId={this.props.userId} />*/}
            {/* <LoginPanel /> */}
          </div>
        </div>
    );
  }
}

export default GameBegin;
