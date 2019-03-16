import React, {Component} from 'react'
import Header from './header'
import Add from './add'
import Sidebar from './sidebar';
import MyDialog from './myDialog';
import AutoGrid from './autoGrid';
import Login from './login'
class Keep extends Component{
    constructor(props){
        super(props)
        this.handleLogIn = this.handleLogIn.bind(this)
        this.handleLogOut = this.handleLogOut.bind(this)
    }
    state={
        isLoggedIn : false,
        id : ''
    }
    handleLogIn(data){
        if(data.length === 1){
            console.log("id is")
            console.log(data[0].id)
            this.setState({id: data[0].id})
            this.setState({isLoggedIn : true})
            console.log("id is now")
            console.log(this.state.id)
        }else{
            alert("username or password is incorrect")
        }
    }
    handleLogOut(){
        this.setState({isLoggedIn : false})
        this.setState({id : ''})
    }
    render(){
        let workplace;
        if(this.state.isLoggedIn){
            workplace = <AutoGrid id = {this.state.id}></AutoGrid>
        }else{
            workplace = <Login loginfunc = {this.handleLogIn}></Login>
        }
        return(<div>
            <Header login = {this.state.isLoggedIn} logoutfunc={this.handleLogOut}></Header>
            <Sidebar></Sidebar>
            {workplace}
        </div>)
    }
}

export default Keep