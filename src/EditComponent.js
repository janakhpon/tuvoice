import React, { Component } from 'react';

import { connect } from 'react-redux';

import firebase from './firebase';

class EditComponent extends Component {
    handleFinalEdit = (e) => {

        e.preventDefault()
        const title = this.getTitleInput.value
        const message = this.getMessageInput.value
        const hashsay = this.getHashsayInput.value
        this.props.dispatch({ type: 'CLEAR_ERROR', id: this.props.post.id })

        if (title.length === 0 || title.length <= 5 || title.trim() === "") {
            this.props.dispatch({
                type: 'POST_EDIT_ERROR', message: 'Title has to be more than 5 characters', id:
                    this.props.post.id
            })
            this.forceUpdate()
            return;
        }
        if (message.length === 0 || message.length <= 10 || message.trim() === "") {
            this.props.dispatch({
                type: 'POST_EDIT_ERROR', message: 'Message has to be more than 10 characters',
                id: this.props.post.id
            })
            this.forceUpdate()
            return;
        }
        if (hashsay.length === 0 || hashsay.length <= 3 ||hashsay.trim() === "") {
            this.props.dispatch({
                type: 'POST_EDIT_ERROR', message: 'Hashsay has to be more than 10 characters',
                id: this.props.post.id
            })
            this.forceUpdate()
            return;
        }

        this.props.dispatch({
            type: 'ADD_EDIT_POST',
            data: {
                id: this.props.post.id,
                title,
                message,
                hashsay,
                editing: this.props.post.editing
            }
        })
        let updates = {}
        updates['users/' + this.props.post.key] = this.props.post;
        updates['users/' + this.props.post.key].title = title;
        updates['users/' + this.props.post.key].message = message;
        updates['users/' + this.props.post.key].hashsay = hashsay;
        firebase.database().ref().update(updates)

    }
    render() {
        return (
            <form onSubmit={this.handleFinalEdit}>


                           <div class="form-group border-0">
                                    
                                    <input class="form-control text-white border-0 bg-transparent"  type="text" ref={(input) => this.getTitleInput = input} defaultValue={this.props.post.title} placeholder="Enter Title for Post"/>
                                    
                            </div>
                            <div class="form-group">
                                    
                                    <textarea class="form-control text-white border-0 bg-transparent"  ref={(input) => this.getMessageInput = input} defaultValue={this.props.post.message} placeholder="Enter the post" rows="2"></textarea>
                                    
                            </div>
                            <div class="form-group">
                                    
                                    <input class="form-control text-white border-0 bg-transparent" type="text" ref={(input) => this.getHashsayInput = input} defaultValue={this.props.post.hashsay} placeholder="#hashsay" />
                                   
                            </div>
                            <div class="form-group">
                                   
                                    <button type="submit" class="btn btn-sm btn-primary col-1" > <i class="fas fa-edit"></i> update</button>
                                    
                            </div>
                       








                {console.log(this.props.post.errorMessage)}
                {this.props.post.errorMessage ? <p style={{ color: '#ff7777' }}>{this.props.post.errorMessage}</p> : null}
            </form >
        );
    }
}




export default connect()(EditComponent);