import React, { Component } from 'react';

import { connect } from 'react-redux';

import EditComponent from './EditComponent';

import firebase from './firebase';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class AllPosts extends Component {
    handleDelete = (post) => {
        this.props.dispatch({ type: 'DELETE', id: post.id })
        // eslint-disable-next-line
        const ref = firebase.database().ref('users/' + post.key).
            ref.remove();
    }

    render() {
        console.log(this.props.posts)
        return (
            <div class="container-fluid">
                
                {this.props.loading ? <div className="spinner">
                    <div className="rect1"></div>
                    <div className="rect2"></div>
                    <div className="rect3"></div>
                    <div className="rect4"></div>
                    <div className="rect5"></div>
                </div> : null}
                <ReactCSSTransitionGroup
                    transitionName="example"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                >

                    {this.props.posts.map((post) => (
                        

                        <div key={post.id} class="card text-white bg-success">
                            {post.editing ? <EditComponent key={post.id} post={post} /> :
                                (<div>
                                   
                                    <div class="card-header">{post.title}</div>
                                    <div class="card-body">
                                     <h5 class="card-title">{post.hashsay}</h5>
                                     <p class="card-text">{post.message}</p>
                                     </div>
                                    

                                    <div class="card-footer">
                                        {firebase.auth().currentUser.uid === post.uid ? <button class="btn btn-height btn-danger btn-md" onClick={() => this.handleDelete(post)}><i class="fas fa-trash-alt"></i> delete</button> : null}
                                        {firebase.auth().currentUser.uid === post.uid ? <button class="btn btn-height btn-primary btn-md" onClick={() => this.props.dispatch({ type: 'EDIT', id: post.id })}><i class="fas fa-edit"></i> update </button> : null}
                                    </div>
                                </div>
                                )
                            }

                        </div>
                    ))}
                </ReactCSSTransitionGroup>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    loading: state.loading
})
export default connect(mapStateToProps)(AllPosts);