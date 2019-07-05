import {Component} from "react";
import React from "react";
import { hot } from 'react-hot-loader';
import './style.css';
import './activeUsers.css';


class ActiveUser extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.initialOrPic = this.initialOrPic.bind(this);
        this.scrollUsers = this.scrollUsers.bind(this);
    }

    scrollUsers(childs, container) {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== prevState) {
            // this.scrollUsers(document.querySelectorAll("#active-users-container div.user"), document.querySelector("#active-users-container"));
        }
    }

    initialOrPic(pic) {
        if (pic === "")
            return (
                <p>
                    {(this.props.name.indexOf(" ") !== -1) ?
                        this.props.name.charAt(0) + this.props.name.charAt(this.props.name.indexOf(" ")+1) :
                        this.props.name.slice(0, 2)}
                </p>);
        else return <img src={pic} style={{ width: "65px" }} alt={pic}/>;
    }

    render() {
        return(
            <div
                onClick={() => {
                    document.cookie = `bro=${this.props.socket_id}`;
                    console.log(`ID selected: ${document.cookie}`);
                    if (this.props.opponentPlayer.id === -1) {
                        this.props.invite(this.props.socket_id, this.props.loggedPlayer.name, this.props.socket.id);
                        console.log(`AAAAAAAAAAAKILLMEEE: ${this.props.socket.id}`);
                    }
                }}
                className={"user"}
                title={this.props.name}
                style={{background: this.props.color}}>
                { this.initialOrPic(this.props.pic) }
            </div>
        )
    };


}

export default hot(module)(ActiveUser);