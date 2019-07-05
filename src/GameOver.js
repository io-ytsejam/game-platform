import React, { Component } from "react";
import { hot } from 'react-hot-loader';
import './style.css';
import {rotateIn, rotateOut} from "./rotateIcons";
import IconButton from '@material/react-icon-button';
import MaterialIcon from '@material/react-material-icon';

class LeaderBoardPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };

        this.iconsStyle = {
            cursor: "pointer",
            color: "black"
        }

        this.initialOrPic = this.initialOrPic.bind(this);
    }

    initialOrPic(pic) {
        if (pic === "")
            return (
                <p style={{margin: "8px"}}>
                    {(this.props.name.indexOf(" ") !== -1) ?
                        this.props.name.charAt(0) + this.props.name.charAt(this.props.name.indexOf(" ")+1) :
                        this.props.name.slice(0, 2)}
                </p>);
        else return <img style={{width: "44px"}} src={pic} alt={"pp"}/>;
    }

    render() {
        return(
            <div
                style={{
                    width: "370px",
                    clear: "left",
                    color: "white",
                    padding: "0",
                    marginLeft: "15px",
                    borderBottom: "1px solid crimson"
                }}
            >
                <div
                    id={"profile-pic"}
                    style={{
                        float: "left",
                        background: "wheat",
                        width: "44px",
                        height: "44px",
                        marginTop: "2px",
                        marginLeft: "10px",
                        borderRadius: "44px",
                        boxShadow: "-2px 1px 3px crimson",
                        overflow: "hidden"
                    }}
                >
                    {/*<img style={{width: "44px"}} src={this.props.pic} alt={"pp"}/>*/}
                    { this.initialOrPic(this.props.pic) }
                </div>
                <div
                    style={{
                        float: "left",
                        width: "218px",
                        height: "44px"
                    }}
                >
                    <p
                        style={{
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            cursor: "pointer",
                            fontSize: "20px",
                            fontWeight: "100",
                            margin: "11px",
                            marginTop: "13px"
                        }}
                        title={this.props.name}
                    ><span style={{color: "crimson"}}>{ this.props.score }</span> { this.props.name }</p>
                </div>
                <div
                    id={"action-icons"}
                    style={{
                        paddingTop: "12px",
                        boxSizing: "border-box",
                        float: "left",
                        height: "44px",
                        width: "96px"
                    }}
                >
                    <MaterialIcon
                        onClick={() => { alert("This feature is not implemented yet") }}
                        title={"Send a message"}
                        style={{ color: "#947d52", cursor: "pointer" }} icon='message'/>
                    <MaterialIcon
                        onClick={() => { alert("This feature is not implemented yet") }}
                        title={"Send game invitation"}
                        style={{margin: "0 8px 0 8px", color: "#184818", cursor: "pointer"}} icon='videogame_asset'/>
                    <MaterialIcon
                        onClick={() => { alert("This feature is not implemented yet") }}
                        title={"Report player"}
                        style={{ color: "#8e0f27", cursor: "pointer" }} icon='error'/>
                </div>
            </div>
        );
    }
}

class GameOver extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allPlayers: [],
            player: {},
            pics: []
        };

        fetch("http://localhost:3005/profiles")
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < data.length; i++) {
                    for (let j = i + 1; j < data.length; j++) {
                        if (data[i].score < data[j].score) {
                            let temp = data[i];
                            data[i] = data[j];
                            data[j] = temp;
                        }
                    }
                }
                this.setState({ allPlayers: data})
            })
            .catch(e => { console.log(`Error while fetching players: ${e}`) });
    }

    render () {
        return (
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
                    <h2>Leader board</h2>
                    <hr style={{borderColor: 'wheat'}}/>
                </div>
                <div id="players" style={{display: 'block'}}>
                    {this.state.allPlayers.map(val => {
                        return <LeaderBoardPlayer name={val.name} score={val.score} pic={val.file}/>;
                    })}
                </div>
            </div>
        );
    }
}

export default hot(module)(GameOver);