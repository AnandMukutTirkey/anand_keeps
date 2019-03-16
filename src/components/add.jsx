import React from 'react'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'
import MyDialog from './myDialog'
class Add extends React.Component{
    constructor(props){
        super(props)
        this.child = React.createRef()
        this.addAction = this.addAction.bind(this)
    }
    addAction = value => e => {
        console.log("add clicked")
        console.log(value)
        this.props.handleOpenForNew()
    }
    render(){
        return(<div>
            <Fab color="primary" aria-label="Add" style={
                {position: 'fixed', bottom:50, right: 50, zIndex: 1}
            } onClick = {this.addAction(4)} 
            >
            <AddIcon></AddIcon>
            </Fab>
        </div>)
    } 
}
export default Add