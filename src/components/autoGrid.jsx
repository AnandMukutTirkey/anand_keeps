import React from 'react'
import {Grid, Paper, GridList, Avatar, Typography} from '@material-ui/core/';
import MyDialog from './myDialog'
import Add from './add';

class AutoGrid extends React.Component {
    state = {
        id: '',
        notes: [],
        dataFetched : false
    }
    constructor(props) {
        super(props)
        this.child = React.createRef()
        this.fetchData = this.fetchData.bind(this)
        this.handleSave = this.handleSave.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
    }
    handleExpand = id => e => {
        console.log("expanding")
        console.log(id)
        console.log(this.state.notes)
        let localNotes = this.state.notes.filter(function(note) { return note.id == id })
        let note = localNotes[0]
        console.log(localNotes)
        console.log("localnotes ^")
        console.log(note.id)
        console.log(note.noteDescription)
        console.log(note.noteTitle)
        this.child.current.handleOpenForEditing(note.id ,note.noteTitle ,note.noteDescription)
    }
    handleDelete(id){
        console.log("deleting")
        console.log(id)
        /*this.state.notes = this.state.notes.filter(function(note){ return note.id != id})
        this.setState(this.state)
        console.log("after delete")
        console.log(this.state.notes)*/
        let url = "http://localhost:8989/notes/"+id
        fetch(url, {
            method: 'DELETE'
        })
        .then( response => {
            console.log(response)
        })
        .then( ()=> this.fetchData())    
    }
    handleSave (note){
        console.log("saving")
        console.log(note)
        let url = "http://localhost:8989/notes/"
        fetch(url,{
            method: 'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(note)
        })
        .then( response => {
            console.log(response)
        })
        .then( () => this.fetchData())
    }
    handleUpdate (note){
        console.log("updating")
        console.log(note)
        let url = "http://localhost:8989/notes/"+note.id
        fetch(url,{
            method: 'PUT',
            headers:{
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(note)
        })
        .then( response => {
            console.log(response)
        })
        .then( () => this.fetchData())
    }
    fetchData(){
        let localNotes = []
        let id = this.props.id
        //this.setState({id : 'revanth@kolluru.com'});
        //id = this.state.id
        console.log(id);
        let url = "http://localhost:8989/users/"+id+"/notes"
        console.log(url)
        fetch(url)
        .then( resp => resp.json())
        .then( data => {
            this.setState({dataFetched:true})
            let notes = data.map((note,index) => {
                console.log(note)
                localNotes.push(note)
            })
            this.setState({notes:localNotes})
        })
    }
    render() {
        if(!this.state.dataFetched){
            this.fetchData()
        }
        return (<div style={{ marginTop: 70}}>
            <div style={{ margin: 20 }}>
                <GridList spacing={10}  cols={2}>
                    {this.state.notes.reverse().map(tile => (
                        // <GridListTile onClick={this.handleExpand(tile.id)} cellHeight='auto'>
                        //     <Card>
                        //         <CardContent style= {{ backgroundColor:'#eeeeee'}}>
                        //             <Typography variant="h5" component="h2">
                        //                 some text
                        //             </Typography>
                        //             <Typography>
                        //                 well meaning and kindly. kfjhsdlfjhpsidfjsdljfhsfjnsdkfhdoijf fsdhjod  dfdhflsdjfsh dhdfdsj s djhfls   dhflsdleroehh djnnvfunofsflnskhfwehinbdjsdbuidfjdhuh well meaning and kindly. kfjhsdlfjhpsidfjsdljfhsfjnsdkfhdoijf fsdhjod dfdhflsdjfsh dhdfdsj s djhfls dhflsdleroehh djnnvfunofsflnskhfwehinbdjsdbuidfjdhuh fsdhjod  dfdhflsdjfsh dhdfdsj s djhfls   dhflsdleroehh djnnvfunofsflnskhfwehinbdjsdbuidfjdhuh well meaning and kindly. kfjhsdlfjhpsidfjsdljfhsfjnsdkfhdoijf fsdhjod dfdhflsdjfsh dhdfdsj s djhfls dhflsdleroehh djnnvfunofsflnskhfwehinbdjsdbui
                        //                     <br />
                        //                 {'"a benevolent smile"'}
                        //             </Typography>
                        //         </CardContent>
                        //     </Card>
                        // </GridListTile>
                        <Paper style={{maxWidth: 350,
                            margin: '10px auto', 
                            height: 'auto',
                            padding: 20}}
                            onClick={this.handleExpand(tile.id)}
                        >
                        <Grid container wrap="nowrap" spacing={16}>
                          <Grid item>
                            <Avatar>W</Avatar>
                          </Grid>
                          <Grid>
                            <Typography variant="h6">{tile.noteTitle}</Typography>
                            <Typography>{tile.noteDescription}</Typography>
                          </Grid>
                        </Grid>
                      </Paper>
                    ))}
                </GridList>
                <MyDialog 
                ref={this.child} 
                savefunc={this.handleSave} 
                deletefunc={this.handleDelete} 
                updatefunc={this.handleUpdate}
                userid={this.props.id}
                ></MyDialog>
            </div>
        </div>)
    }
    
}

export default AutoGrid