import React, { Component } from 'react';


import { Link, withRouter } from 'react-router-dom';

import firebase from './firebase';

import { connect } from 'react-redux';

class SignUp extends Component {
    componentWillMount() {
        this.props.dispatch({ type: 'NO_ERROR_RECEIVED' });
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.props.history.push('/home');
            }
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const email = this.getEmail.value;
        const password = this.getPassword.value;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((result) => {
                console.log('Signed In')
                this.props.dispatch({ type: 'NO_ERROR_RECEIVED' })
                this.props.history.push('/home');
            })
            .catch((error) => {
                this.props.dispatch({ type: 'ERROR_RECEIVED', message: error.message })

            })

    }
    render() {
        return (
            <div class="container">


                 <div class="card-header">
                    
                    </div>
   
                    <div class="card-body bg-primary">
                       <h5 class="card-title text-center"> FILL OUT DATA  </h5>
                       
                   <form onSubmit={this.handleSubmit}>

                   <div class="form-group">
                   <label >Email address</label>
                   <input class="form-control" type="text" ref={(input) => this.getEmail = input} placeholder="Enter email" />
                   
                   </div>

                    <div class="form-group">
                    <label >Correct password</label>
                    <input class="form-control" type="password" ref={(input) => this.getPassword = input} placeholder="Enter Password" />
                   
                   </div>


                    <div class="form-group">
                   
                    <button type="submit" class="btn btn-md btn-success btn-block">login</button>
                   
                   </div>


                      
                       
                      
                   </form>
                   </div>
                   <div class="card-footer text-muted">
                   <p className="sub-text center">Already have an account, <Link to="/">Sign In</Link></p>
                {this.props.errors ? <p style={{ color: '#ff7777' }}>{this.props.errors.message}</p> : null}
                </div>
   
 
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    errors: state.errors
})
export default withRouter(connect(mapStateToProps)(SignUp));