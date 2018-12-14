import React, { Component } from 'react';

import { Link, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import firebase from './firebase';
class LogIn extends Component {

    componentWillMount() {
        this.props.dispatch({ type: 'NO_ERROR_RECEIVED' });
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.props.history.push('/home');
            }
        })
    }

    handleSubmit = (e) => {
        this.props.dispatch({ type: 'NO_ERROR_RECEIVED' });
        e.preventDefault();
        const email = this.getEmail.value;
        const password = this.getPassword.value;

        firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
            this.props.dispatch({ type: 'NO_ERROR_RECEIVED' });
            this.props.history.push('/home');
        }).catch((error) => {
            console.log(error.message);
            this.props.dispatch({ type: 'ERROR_RECEIVED', message: error.message })
        })
    }
    render() {
        return (
            <div class="container">






                 <div class="card-header">
                    
                    </div>
   
                    <div class="card-body bg-primary">
                       <h5 class="card-title text-center"> GENUINE PASS </h5>
                       
                   <form onSubmit={this.handleSubmit}>

                   <div class="form-group">
                   <label >Email address</label>
                   <input class="form-control"  ref={(input) => this.getEmail = input} type="text" placeholder="Enter email" />
                   
                   </div>

                    <div class="form-group">
                    <label >Correct password</label>
                    <input class="form-control"  ref={(input) => this.getPassword = input} type="password" placeholder="Enter Password" />
                   
                   </div>


                    <div class="form-group">
                   
                    <button type="submit" class="btn btn-md btn-success btn-block">login</button>
                   
                   </div>


                      
                       
                      
                   </form>
                   </div>
                   <div class="card-footer text-muted">
                   <p className="sub-text center">Don't have an account, <Link to="/signup">Sign Up</Link></p>
                {this.props.errors ? <p style={{ color: '#ff7777' }}>{this.props.errors.message}</p> : null} 
                </div>
   

               
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    errors: state.errors
})

export default withRouter(connect(mapStateToProps)(LogIn));