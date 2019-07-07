import React, { Component } from "react";
import { hot } from 'react-hot-loader';
import './style.css';
import './activeUsers.css';
import InvitationMessage from './InvitationMessage.js';
import Button from '@material/react-button';
import ActiveUser from './ActiveUser.js';

class LoggedUserPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeUsers: [],
            invitation: {
                is: false,
                name: "",
                sender: ""
            },
            opName: ""
        };

        this.setState({ invitation: { sender: this.props.socket.id } });

        this.props.socket.on("invitationToGameRoom", (data) => {
            this.setState({invitation: {is: true, name: data.name, sender: data.sender}});
            this.setState({ opName: data.name });
        });
        //

        this.props.socket.on("updateActive", () => {
            // alert("oho");
            console.log(`Fetch active`);
            fetch("http://localhost:3005/active-users")
                .then(response => response.json())
                .then((data) => {
                    console.log(`Data received in czekanko: ${JSON.stringify(data)}`);
                    this.setState({activeUsers: data});
                })
                .catch((err) => {
                    console.log(`Error while fetching active users: ${err}`);
                })
        });

        this.props.socket.on("invitationResponse", res => {
            alert(`Twoje ${this.state.opName} zaproszenie zostało ${res.response}`);
            this.props.setOpponentPlayer({id: this.props.senderSocketId, name: res.name, score: "", color: ""});
        });
        //

        this.confirm = this.confirm.bind(this);
        this.renderInvitation = this.renderInvitation.bind(this);
        this.invite = this.invite.bind(this);
    }

    confirm() {
        this.props.setOpponentPlayer({id: this.props.senderSocketId, name: "", score: "", color: ""});
    }

    renderInvitation() {
        if(this.state.invitation.is)
            return (
                <InvitationMessage
                    setOpponentPlayer={this.props.setOpponentPlayer}
                    closeInvitation={()=>{
                        this.setState({invitation: {is: false}})
                    }}
                    playerName={this.state.invitation.name}
                    loggedPlayer={this.props.loggedPlayer}
                    senderSocketId={this.state.invitation.sender}
                    socket={this.props.socket}
                />)
    }

    invite(id, name, sender) {
        console.log(`INVITATION! ${id}`);
        this.props.socket.emit("invitationToGameRoom", {id: id, name: name, sender: sender, socket_id: this.props.socket.id});
    }


    componentDidMount() {
        fetch("http://localhost:3005/active-users")
            .then(data => data.json())
            .then(data => {
                this.setState({activeUsers: data})
            })
            .catch((err) => {
               console.log(`Cannot fetch active users: ${err}`);
            });
    }

    render() {
        const { activeUsers } = this.state;
      return (
          <div>
              {this.renderInvitation()}
              <div style={{
                  width: "100%",
                  background: "wheat",
                  height: "fit-content"
              }}>
                  <p style={{
                      fontSize: '17px',
                      marginBottom: "3px",
                      color: "wheat",
                      boxShadow: "0px 2px 18px black",
                      background: "black",
                  }}>Aktywni gracze</p>
                  <div style={{display: 'inline-flex'}}  id={"active-users-container"}>
                      {
                          activeUsers.map((val) => {
                              if(val.name !== this.props.loggedPlayer.name) {
                                  return(
                                      <ActiveUser
                                          socket={this.props.socket}
                                          opponentPlayer={this.props.opponentPlayer}
                                          setOpponentPlayer={this.props.setOpponentPlayer}
                                          loggedPlayer={this.props.loggedPlayer}
                                          invite={this.invite}
                                          name={val.name}
                                          fullName={val.name}
                                          socket_id={val.socket_id}
                                          color={val.color}
                                          pic={val.file}
                                      />
                                  )
                              }
                          })
                      }
                  </div>
              </div>
              <div
                style={{
                    width: "100%",
                    float: "left",
                    background: "black",
                    boxShadow: "0px -2px 18px 0 black"
                }}
              >
                  <Button
                      id={"start-game"}
                      variant={"contained"}
                      title={"Rozpocznij grę"}
                      style={{
                          color: "white",
                          position: "relative",
                          /*top: "485px",
                          left: "10px"*/
                          margin: "10px"
                      }}
                      onClick={() => this.props.onGameBegin("playing")}
                  >Start</Button>
                  <p
                      style={{
                          color: "wheat",
                          width: "310px",
                          float: "right",
                          fontSize: "17px"
                      }}
                  >Kilknij miniaturkę, by wysłać zaproszenie</p>
              </div>
          </div>
      )
    };

}

export default hot(module)(LoggedUserPanel);