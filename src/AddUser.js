import React, { Component } from 'react';
import './style.css';
import sendData from './SendData.js';
import TextField, {HelperText, Input} from '@material/react-text-field';
import MaterialIcon from '@material/react-material-icon';
import Button from '@material/react-button';
import { hexToRgb } from './hexToRgb.js';
import { loginToGame } from "./loginToGame.js";
import hash from 'object-hash';


// sendData(testData);

class AddUser extends Component{
  constructor(props){
    super(props);
    this.state = {
      active: false,
      name: '',
      color: '',
      password: '',
      pic: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleAddUser = this.handleAddUser.bind(this);
  }
  handleChange(event) {
    const inputType = event.target.getAttribute('name');
    switch (inputType) {
      case 'name':
        this.setState({name: event.target.value});
        break;
      case 'color':
          this.setState({color: event.target.value});
          console.log(`Color: ${event.target.value}`);
          break;
      case 'new-password':
          this.setState({password: event.target.value});
          break;
    }
  }

  handleClick(event) {
    document.querySelector(`#${event.target.getAttribute('id').replace('-label', '')}`).focus();
  }

  handleSubmit(event) {
    // alert('A name was submitted: ' + this.state.value);

    fetch("http://localhost:3005/new-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        basic: {
          name: this.state.name,
          score: 0,
          color: hexToRgb(this.state.color),
          password: sha256(this.state.password)
        },
        pic: this.state.pic
      })
    })
        .then(() => {
          this.props.userAdded()
        })
        .catch(e => {console.log(`Error while saving user: ${e}`)});

    // console.log(this.state.value);
    event.preventDefault();
  }

  handleAddUser() {
    console.log(this.state.name);
    console.log(this.state.color);
  }

  handleFocus(event) {
    let h3;
    /*Jeżeli kliknęliśmy na h3, to zapisujemy target do zmiennej h3
    * W przeciwnym wypadku, wybraliśmy input z id password, name lub colorUsers
    * do których dopisujemy -label
    */
    if (event.target.getAttribute('id').indexOf('-')+1) h3 = event.target;
    else h3 = document.querySelector(`#${event.target.getAttribute('id')}-label`);
    h3.style.transform = 'translate3d(0, -14px, 0)';
    h3.style.color = 'red';
    h3.style.fontSize = '0.8em';
  }

  handleBlur(event) {
    if(event.target.getAttribute('id') == 'color'){
      console.log(event.target.value);
      this.state.color = event.target.value;
    }
    if (!event.target.value) {
      let h3;
      if (event.target.getAttribute('id').indexOf('-')+1) h3 = event.target;
      else h3 = document.querySelector(`#${event.target.getAttribute('id')}-label`);
      if(h3.getAttribute('id').includes('color'))
      h3.style.color = 'white';
      h3.style.transform = 'translate3d(10px, 27px, 0)';
      h3.style.fontSize = '0.6em';
    }
  }

  render() {
    return(
      <div id="add-user" style={{ padding: '20px' }}>
        <form
            onSubmit={this.handleSubmit}
            encType= "multipart/form-data"
            action={"/new-user"}
            method={"POST"}
        >


        {/*<input id="name" type="text" required name="name" value={this.state.value} onChange={this.handleChange}></input>*/}

          <div>
            <input
                type={"file"}
                name={"avatar"}
                style={{
                  marginBottom: "5px",
                  color: "wheat"
                }}
            />
            <TextField
                label='Nickname'
                helperText={<HelperText>Wpisz nazwę gracza</HelperText>}
                onTrailingIconSelect={() => this.setState({value: ''})}
                trailingIcon={<MaterialIcon role="button" icon="delete"/>}
            ><Input
                required={true}
                style={{ width: "255px" }}
                id={'name'}
                name={'name'}
                value={this.state.name}
                onChange={this.handleChange} />
            </TextField>
          </div>
          <div>
            <TextField
                required
                label='Kolor'
                type={"color"}
                helperText={<HelperText>Wprowadź kolor</HelperText>}
                onTrailingIconSelect={() => this.setState({value: ''})}
                trailingIcon={<MaterialIcon role="button" icon="delete"/>}
            ><Input
                style={{
                  color: 'rgb(255, 244, 233)',
                  caretColor: 'rgba(0, 0, 0, 0)',
                  width: "255px",
                  padding: 0
                }}
                spellCheck={'false'}
                autocomplete={'off'}
                required
                id={'color'}
                name={'color'}
                type={"color"}
                value={this.state.color}
                onChange={this.handleChange} />
            </TextField>
          </div>
          <div>
            <TextField
                label='Hasło'
                helperText={<HelperText>Wybierz silne hasło, to naprawdę ważne!</HelperText>}
                onTrailingIconSelect={() => this.setState({value: ''})}
                trailingIcon={<MaterialIcon role="button" icon="delete"/>}
            ><Input
                required
                style={{ width: "255px" }}
                type={'password'}
                name={'new-password'}
                value={this.state.password}
                onChange={this.handleChange} />
            </TextField>
          </div>
          <Button
              onClick={() => { this.handleAddUser() }}
              raised
              id={"submit-name"}
              type={"submit"}
              name={"button"}
          >
            Dodaj gracza
          </Button>
      </form>
      </div>
    );
  }
}

export default AddUser;
