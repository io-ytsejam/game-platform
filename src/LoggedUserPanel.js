import React, { Component } from "react";
import { hot } from 'react-hot-loader';
import './style.css';
import './activeUsers.css';
import InvitationMessage from './InvitationMessage.js';
import Button from '@material/react-button';
import ActiveUser from './ActiveUser.js';
function czekanko(socket, hm) {
    socket.on("updateActive", () => {
        // alert("oho");
        console.log(`Fetch active`);
        fetch("http://localhost:3005/active-users")
            .then(response => response.json())
            .then((data) => {
                console.log(`Data received in czekanko: ${JSON.stringify(data)}`);
                hm.setState({activeUsers: data});
            })
            .catch((err) => {
                console.log(`Error while fetching active users: ${err}`);
            })
    });

    socket.on("invitationResponse", response => {
       alert(`Twoje zaproszenie zostało ${response}`);
       /*if (response === "accepted") {
           let opponent;
           this.state.activeUsers.forEach(val => {
              if (val.socket_id ===)
           });
       }*/

       console.log(`Twoje zaproszenie zostało ${response}`);
    });
}



class LoggedUserPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeUsers: [],
            invitation: {
                is: false,
                name: "",
                sender: ""
            }
        };

        this.setState({ invitation: { sender: this.props.socket.id } });

        this.props.socket.on("invitationToGameRoom", (data) => {
            console.log(`Name: ${data.name}`);
            this.setState({invitation: {is: true, name: data.name, sender: data.sender}});
        });

        czekanko(this.props.socket, this);
        this.renderInvitation = this.renderInvitation.bind(this);
        this.invite = this.invite.bind(this);
    }

    renderInvitation() {
        if(this.state.invitation.is)
            return (
                <InvitationMessage
                    closeInvitation={()=>{
                        this.setState({invitation: {is: false}})
                    }}
                    playerName={this.state.invitation.name}
                    senderSocketId={this.state.invitation.sender}
                    socket={this.props.socket}
                />)
    }

    invite(id, name, sender) {
        console.log(`INVITATION! ${id}`);
        this.props.socket.emit("invitationToGameRoom", {id: id, name: name, sender: sender});
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
              <div style={{width: "100%", background: "wheat"}}>
                  <p style={{fontSize: '17px'}}>Aktywni gracze</p>
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
                  <Button
                    /*style={{
                        position: "absolute",
                        right: "0"
                    }}*/
                    onClick={() => this.props.onGameBegin("playing")}
                  >Start</Button>
              </div>
          </div>
      )
    };

}

export default hot(module)(LoggedUserPanel);