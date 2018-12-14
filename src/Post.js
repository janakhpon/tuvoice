import React, { Component } from 'react';
import AllPosts from './AllPosts.js'

import { connect } from 'react-redux';

import firebase from './firebase';
// eslint-disable-next-line
import { withRouter, Redirect } from 'react-router-dom';

import withAuthorization from './withAuthorization';


import generateId from './utils';
class Post extends Component {

    componentDidMount() {
        const ref = firebase.database().ref('users/');

        this.props.dispatch({ type: 'LOADING_TRUE' });
        ref.on('value', snapshot => {
            if (snapshot.val() === null) {
                this.props.dispatch({ type: 'LOADING_FALSE' });
                return;
            }
            // eslint-disable-next-line
            [...Object.values(snapshot.val())].map((post) => {
                this.props.dispatch({ type: 'ADD_POST', data: post })
                this.props.dispatch({ type: 'LOADING_FALSE' })
            })
        })

    }




    handleSubmit = (e) => {
        e.preventDefault();
        const title = this.titleInput.value;
        this.props.dispatch({ type: 'NO_ERROR_RECEIVED' })
        //validations
        if (title.length === 0 || title.length <= 5 || title.trim() === "") {
            this.props.dispatch({ type: 'POST_ERROR', message: 'Title has to be more than 5 characters' })
            return;
        }
        const message = this.messageInput.value;
        if (message.length <= 10 || message.trim() === "") {
            this.props.dispatch({ type: 'POST_ERROR', message: 'Message has to be more than 10 characters' })
            return;
        }

        const hashsay = this.hashsayInput.value;
        if (message.length <= 3 || message.trim() === "") {
            this.props.dispatch({ type: 'POST_ERROR', message: 'Message has to be more than 10 characters' })
            return;
        }

        //generate id
        const id = generateId();
        const newPost = {
            id,
            title,
            message,
            hashsay,
            editing: false,
            errorMessage: ''
        }
        const postRef1 = firebase.database().ref('users/')
        const postKey = postRef1.push()
        const postRef = firebase.database().ref('users/' + postKey.key)
        const uid = firebase.auth().currentUser.uid
        postRef.set({
            id: id,
            title: title,
            message: message,
            hashsay: hashsay,
            editing: false,
            uid: uid,
            key: postKey.key,
            errorMessage: ''
        })

        if (this.props.posts.editing) {
            this.props.dispatch({
                type: 'ADD_EDIT_POST',
                data: newPost
            })
        }
        this.props.dispatch({
            type: 'ADDING_POST'

        })
        this.titleInput.value = '';
        this.messageInput.value = '';
        this.hashsayInput.value = '';


    }

    render() {
        return (
            <div classs="container-fluid rounded">
                

                <div class="container-fluid">
                   

                    


                    <form  onSubmit={this.handleSubmit}>

                            
                            <div class="form-group border-0">
                                    <div class="height">
                                    </div>
                                    <input class="form-control border-0 bg-transparent"  type="text" ref={(input) => this.titleInput = input} placeholder="Enter Title for Post"/>
                                    <hr/>
                            </div>
                            <div class="form-group">
                                    <div class="height">
                                            </div>
                                    <textarea class="form-control border-0 bg-transparent"  ref={(input) => this.messageInput = input} placeholder="Enter the post" rows="2"></textarea>
                                    <hr/>
                            </div>
                            <div class="form-group">
                                    <div class="height">
                                            </div>
                                    <input class="form-control border-0 bg-transparent" type="text" ref={(input) => this.hashsayInput = input} placeholder="#hashsay" />
                                    <hr/>
                            </div>
                            <div class="form-group row justify-content-end">
                                   
                                    <button type="submit" class="btn btn-sm btn-primary col-1" > <i class="fas fa-share"></i> share</button>
                                    <button type="reset" class="btn btn-sm btn-danger col-1" > <i class="fas fa-times"></i> discard</button>
                            </div>
                       


                    </form>


                    
                    {this.props.errors ? <p style={{ color: '#ff7777' }}>{this.props.errors.message}</p> : null}

                    
                </div>


                <div class="container-fluid">
               
                </div>
                <div class="container-fluid">
                <AllPosts posts={this.props.posts} />
                </div>
               

            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    posts: state.posts,
    errors: state.errors

})
const authCondition = (authUser) => !!authUser;

export default withAuthorization(authCondition)(connect(mapStateToProps)(Post));