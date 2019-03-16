import React from 'react'
import { Dialog, Button, DialogTitle, DialogContent, TextField, DialogActions, DialogContentText } from '@material-ui/core';
import Add from './add'

class myDialog extends React.Component {
  constructor(props) {
    super(props)
    this.handleOpenForNew = this.handleOpenForNew.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleChangeInTitle = this.handleChangeInTitle.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleChangeInDescription = this.handleChangeInDescription.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }
  state = {
    id: '',
    title: '',
    subTitle: '',
    open: false,
    noteTitle: '',
    noteDescription: '',
    maxWidth: '',
    fullWidth: '',
    showDelete: false
  }
  /*works without binding*/
  handleOpenForEditing(id, noteTitle, message) {
    this.setState({ id: id })
    this.setState({ title: 'Edit Note' })
    this.setState({ subTitle: 'change the way you like' })
    this.setState({ noteTitle: noteTitle })
    this.setState({ noteDescription: message })
    this.setState({ maxWidth: 'md' })
    this.setState({ fullWidth: 'sm' })
    this.setState({ showDelete: true })
    this.setState({ open: true })
  }
  handleOpenForNew() {
    this.setState({ title: 'New Note' })
    this.setState({ subTitle: "enter what's on your mind" })
    this.setState({ noteTitle: '' })
    this.setState({ noteDescription: '' })
    this.setState({ maxWidth: 'sm' })
    this.setState({ fullWidth: 'xs' })
    this.setState({ showDelete: false })
    this.setState({ open: true })
  }
  handleClose() {
    this.setState({ open: false })
  }
  handleSave = value => () => {
    if(this.state.noteTitle == '' || this.state.noteDescription == ''){
      alert("empty fields")
      return
    }
    if (this.state.showDelete) {
      //update
      let note = {
        id: this.state.id,
        noteTitle: this.state.noteTitle,
        noteDescription: this.state.noteDescription,
        userId: this.props.userid
      }
      this.setState({ open: false })
      this.props.updatefunc(note)
    } else {
      //creating new entry
      console.log("saving data")
      console.log(value)
      console.log(this.state.id)
      console.log(this.state.noteTitle)
      console.log(this.state.noteDescription)
      let note = {
        id: Math.floor(Math.random() * 100000 + 1).toString(),
        noteTitle: this.state.noteTitle,
        noteDescription: this.state.noteDescription,
        userId: this.props.userid
      }
      console.log(note)
      this.setState({ open: false })
      this.props.savefunc(note)
    }
  }
  handleDelete = value => () => {
    console.log("deleting data")
    console.log(value)
    console.log(this.state.id)
    this.setState({ open: false })
    this.props.deletefunc(this.state.id)
  }
  handleChangeInTitle(event) {
    this.setState({ noteTitle: event.target.value })
  }
  handleChangeInDescription(event) {
    this.setState({ noteDescription: event.target.value })
  }
  render() {
    let deleteButton;
    if (this.state.showDelete) {
      deleteButton = <Button onClick={this.handleDelete("4")} color="red">
        Delete
      </Button>
    }
    return (<div>
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth={this.state.maxWidth}
        fullWidth={this.state.fullWidth}
      >
        <DialogTitle id="form-dialog-title">{this.state.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {this.state.subTitle}
          </DialogContentText>
          <TextField label="Title" margin="dense" id="title"
            autoFocus
            defaultValue={this.state.noteTitle}
            fullWidth
            onChange={this.handleChangeInTitle}
          />
          <TextField margin="dense" id="description" label="Description"
            multiline
            defaultValue={this.state.noteDescription}
            fullWidth
            onChange={this.handleChangeInDescription}
          />
        </DialogContent>
        <DialogActions>
          {deleteButton}
          <Button onClick={this.handleSave("5")} color="primary">
            Save
            </Button>
          <Button onClick={this.handleClose} color="primary">
            Cancel
            </Button>
        </DialogActions>
      </Dialog>
      <Add handleOpenForNew={this.handleOpenForNew}></Add>
    </div>)
  }
}

export default myDialog