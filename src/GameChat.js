import React, { Component } from 'react';
import './style.css';
import openSocket from 'socket.io-client';
import MessageHolder from './MessageHolder.js';
import sendData from './SendData.js';
import IconButton from '@material/react-icon-button';
import MaterialIcon from '@material/react-material-icon';
import { rotateIn } from './rotateIcons.js';
import { rotateOut } from './rotateIcons.js';
import { saveCookie } from './saveCookie.js';

sendData(JSON.stringify({'what': 'ever'}), "save-session-id", 'GET');

class GameChat extends Component{
    constructor(props){
        super(props);
        this.state = {
            message: "",
            clouds: [],
            sentOrReceived: [],
            letScroll: true
        };


        this.props.socket.on("message-received", data => {
            let { clouds } = this.state;
            let messagePair = {
                ms: data,
                s: false
            }
            clouds.push(messagePair);
            this.setState({ clouds: clouds })
        });


        // czekanko(this.props.socket);
        this.handleSendMessage = this.handleSendMessage.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleHideScrollbar = this.handleHideScrollbar.bind(this);
    }




    handleHideScrollbar(e) {
        if(this.state.letScroll) {
            this.setState({letScroll: false});
            console.log("Wheel");



            setTimeout(() => {
                this.setState({letScroll: true});
            }, 3000);
        }
    }

    handleChange(event) {
        this.setState({message: event.target.value});
    }

    handleSendMessage(event){
        let send = () => {
            if (this.state.message !== "") {
                let { clouds } = this.state;
                const { message } = this.state;
                let messagePair = {
                    ms: message,
                    s: true
                };
                clouds.push(messagePair);
                this.setState({clouds: clouds});

                let fetchedID;

                fetch("http://192.168.1.13:3005/chat-bro",
                    {
                        headers: {
                            "Content-Type": "application/json"
                        },
                        credentials: "include"
                    })
                    .then(response => response.json())
                    .then((data) => {
                        console.log(`Dummy cookie: ${data.cookie}`);
                        fetchedID = data.cookie;
                        this.props.socket.emit('message', { message: message, id: data.cookie} );
                        this.sendMessage('git', 'arka');
                    });
                this.setState({message: ""});
            }
        };
            if (event.which === 13 && !event.shiftKey) {
                console.log(`Co nie? ${event.type}`);
                event.preventDefault();
                send();
                event.target.value = "";
            } else if(event.type === "click")
                send();
    }


    sendMessage(a, sr){
    }
    render() {
        const { clouds } = this.state;
        // const { sentOrReceived } = this.state;
        // {console.log(`Clouds: ${clouds}`)}
        return(
        <div id="chat" className="popup">
            <div onMouseEnter={() => {
                // document.styleSheets[3].insertRule('::-webkit-scrollbar {width: 10px}', 0)
            }
            } onMouseLeave={ () => {
                // document.styleSheets[3].removeRule(0)
            }
            } id="conversation">
                {console.log(this.state)}
                {clouds.map((val) => {
                    // console.log(sentOrReceived);
                    if (val.s)
                        return <MessageHolder message={val.ms} color={this.props.loggedPlayer.color} class={'chat-cloud-right chat-cloud'} />;
                    else
                        return <MessageHolder message={val.ms} class={'chat-cloud-left chat-cloud'} />;
                })}


            </div>
            <div id="user-typing-popup">
                <p><span id="user-typing-name"/> is typing...</p>
            </div>
            <div style={{
                background: "black",
                height: "90px",
                width: "540px",
                bottom: "0",
                position: "absolute"
            }}>
                <textarea
                    autoFocus
                    onKeyDown={(e) => this.handleSendMessage(e)}
                    type="text"
                    onChange={this.handleChange}
                    name="message-input"
                    id="message-input"
                    placeholder="Sent message to user">
            </textarea>
            </div>
            <div onClick={(e) => this.handleSendMessage(e)} id="sent-message">
                <IconButton
                    id={'sent-message-arrow'}
                    className={'send-arrow'}
                    style={{transform: 'rotate(0deg'}}
                ><MaterialIcon icon='send' />
                </IconButton>
            </div>
        </div>
        );
    }
}


export default GameChat;
