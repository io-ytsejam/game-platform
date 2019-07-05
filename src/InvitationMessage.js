import React,{ Component } from "react";
import { hot } from 'react-hot-loader';
import './style.css';
import './scss/invitation_message.scss';
import {MDCRipple} from '@material/ripple';


class InvitationMessage extends Component{
    constructor(props) {
        super(props)
        this.state = {
            invitation: {
                name: "Luigi",
                id: 1
            }
        }

        // const buttonRipple = new MDCRipple(document.querySelector('.mdc-button'));
        this.handleAcceptInvitation = this.handleAcceptInvitation.bind(this);
        this.handleIgnoreInvitation = this.handleIgnoreInvitation.bind(this);
        this.handleIgnoreInvitation = this.handleIgnoreInvitation.bind(this);
    }

    componentDidMount() {
        let inv = document.querySelector(".im");
        const fittedHeight = getPropertyValue(inv, 'height');
        inv.style.boxShadow = "0 0 12px 3px crimson";
        inv.style.height = "0px";
        inv.style.transition = ".4s ease all";
        setTimeout(()=>{
            inv.style.height = fittedHeight + "px";
        })
    }

    handleRejectInvitation() {

    }

    handleIgnoreInvitation() {

    }

    handleAcceptInvitation(e) {
        this.props.socket.emit("invitationResponse", {
            senderId: this.props.senderSocketId,
            response: "accepted"

        });

        console.log(`Sender ID: ${this.props.senderSocketId}`);

        let inv = document.querySelector(".im");
        inv.style.height = "0px";
        inv.style.boxShadow = "none";
        setTimeout(()=>{
            inv.style.transition = "none";
            this.props.closeInvitation();
        }, 400);
    }

    render() {
        return(
            <div className={"im"}>
                <div>
                    <h3 className={"title"}>
                        Gracz {this.props.playerName} chce z Tobą zagrać <br></br>
                        Akceptujesz zaproszenie?
                    </h3>
                    <hr style={{borderColor: "#871311", marginBottom: "0"}}></hr>
                    <button style={{margin: "15px"}} onClick={(e)=>{this.handleAcceptInvitation(e)}} className={"mdc-button"}>
                        <span className={"mdc-button__label accept"}>Akceptuj</span>
                    </button>
                    <button style={{margin: "15px"}} onClick={(e)=>{this.handleRejectInvitation(e)}} className={"mdc-button reject"}>
                        <span className={"mdc-button__label"}>Odrzuć</span>
                    </button>
                    <button style={{margin: "15px"}} onClick={(e)=>{this.handleIgnoreInvitation(e)}} className={"mdc-button mdc-button--outlined"}>
                        <span className={"mdc-button__label"}>Zaniechaj</span>
                    </button>
                </div>
            </div>
        )
    }


}

export default hot(module)(InvitationMessage);
