import React, { Component } from 'react';
import './style.css';

class MessageHolder extends Component{
    render() {
        return(
            <div className={"message-holder"}>
                <div
                    style={{
                        background: ((this.props.color !== "") ? this.props.color : "initial"),
                        transform: 'translateX(0px)',
                        opacity: 1,
                        boxShadow: '2px 1px 9px 0 rgb(159, 15, 44)'}}
                    className={this.props.class}
                ><p>{this.props.message}</p>
                </div>
            </div>
        );
    }
}

export default MessageHolder;
