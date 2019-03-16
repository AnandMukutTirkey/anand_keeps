import React from 'react'
import { TextField, Button, Paper } from '@material-ui/core';
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.handleLogin = this.handleLogin.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
        this.temp = this.temp.bind(this)
        this.addSampleNote = this.addSampleNote.bind(this)
    }
    state = {
        username: '',
        password: ''
    }
    handleLogin = value => e => {
        if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.state.username)) {
        }else{
            alert("invalid email it should be in xx@xx.xx format")
            return
        }
        console.log(this.state.username)
        console.log(this.state.password)
        let url = "http://localhost:8989/users?id=" + this.state.username + "&password=" + this.state.password
        fetch(url, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                console.log(data.length)
                this.props.loginfunc(data)
            })
    }
    temp() {
        let url = "http://localhost:8989/users?id=" + this.state.username + "&password=" + this.state.password
        fetch(url, {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            console.log(data.length)
            this.props.loginfunc(data)
        })
    }
    addSampleNote() {
        let note = {
            id: Math.floor(Math.random() * 100000 + 1).toString(),
            noteTitle: 'sample note',
            noteDescription: 'this is a sample note',
            userId: this.state.username
        }
        let url = "http://localhost:8989/notes/"
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
        .then(response => {
            console.log(response)
            this.temp()
        })
    }
    handleRegister = value => e => {
        if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.state.username)) {
        }else{
            alert("invalid email it should be in xx@xx.xx format")
            return
        }
        let user = {
            id: this.state.username,
            password: this.state.password
        }
        let url = "http://localhost:8989/users"
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            console.log("creating user")
            console.log(response.status)
            if(response.status == 201){
                this.addSampleNote()
            }else{
                alert("User with this email already exists")
            }
        })
    }
    render() {
        return (<div style={{ 
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)'
        }}>
        <Paper style={{maxWidth: 500,
            margin: '10px auto', 
            height: 'auto',
            padding: 20}}
        >
            <TextField
                id="standard-dense"
                label="Email"
                floatingLabelText="Username"
                onChange={(event) => this.setState({ username: event.target.value })}
            />
            <br/><br/>
            <TextField
                id="standard-password-input"
                label="Password"
                type="password"
                floatingLabelText="Password"
                onChange={(event) => this.setState({ password: event.target.value })}
            />
            <br/><br/>
            <div style = {{display : 'flex', justifyContent: 'center'}}>
            <Button onClick={this.handleLogin("7")}>Login</Button>
            <Button onClick={this.handleRegister("9")}>Register</Button>
            </div>
            
        </Paper>
        </div>)
    }
}

export default Login