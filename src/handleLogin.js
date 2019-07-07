import {saveCookie} from "./saveCookie.js";

export function handleLogin(a, thisComponent) {
    function getPropertyValue(element, property) {
        // It's our own function, return value of given property of a given element
        return parseFloat(window.getComputedStyle(element).getPropertyValue(`${property}`));
    }

    const name = document.querySelector('#login-panel-name');
    const nameP = document.querySelector('#login-panel > p');
    const loginPanel = document.querySelector('#login-panel');
    const passwordInput = document.querySelector('#login-panel input[type="password"]');
    const expand_less = document.querySelector(".expand_less");

    const credentials = {
        name: name.innerText,
        id: Math.floor(Math.random()*100000)
    };

    console.log(credentials);

    saveCookie(credentials, 'oby');

    // thisComponent.props.userId = credentials.id;
    thisComponent.setState({userId: credentials.id});

    passwordInput.style.removeProperty('transition');
    nameP.style.removeProperty('transition');
    passwordInput.style.transform = 'translateX(-50px)';
    nameP.style.transform = 'translateX(-90px)';

    loginPanel.style.transition = 'none';
    loginPanel.style.padding = "20px";
    loginPanel.style.height = 'auto';
    loginPanel.style.display = "block";
    passwordInput.focus();


    console.log(thisComponent.state.users);

    name.innerText = thisComponent.state.users[(parseInt(a.getAttribute("id") || a.parentNode.getAttribute("id")))].name;

    const fittedHeight = getPropertyValue(loginPanel, 'height');
    console.log(fittedHeight);

    passwordInput.style.transition = 'transform 0.4s ease';
    nameP.style.transition = 'transform 0.4s ease';

    setTimeout(() => {
        passwordInput.style.transform = 'translateX(0px)';
        nameP.style.transform = 'translateX(0px)';
    }, 0);

    if (true/*document.querySelector(".expand_less").id === "collapsed"*/) {
        loginPanel.classList.add('clicked');
        loginPanel.style.height = 0;
        if (document.querySelector(".expand_less").id === "collapsed") {
            loginPanel.style.transition = 'height 0.4s ease, padding 0.4s ease';
        }
        setTimeout(() => {
            loginPanel.style.height = fittedHeight + 'px';
        }, 10);
    }
    loginPanel.style.background = thisComponent.state.users[(parseInt(a.getAttribute("id") || a.parentNode.getAttribute("id")))].color;
    expand_less.setAttribute("id", "");
}