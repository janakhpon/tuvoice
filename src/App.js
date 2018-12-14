import React, { Component } from 'react';
// eslint-disable-next-line
import firebase from './firebase';
import './App.css';
import Post from './Post';
// eslint-disable-next-line
import LogIn from './LogIn';
// eslint-disable-next-line
import SignUp from './SignUp';
import { connect } from 'react-redux';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
// eslint-disable-next-line
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

// function PrivateRoute({ component: Component, authed, ...rest }) {
//   return (

//     <Route
//       {...rest}
//       render={(props) => authed === true
//         ? <Component {...props} />
//         : <Redirect to="/" />
//       }
//     />
//   )
// }




class App extends Component {


  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  handleLogout = () => {
    firebase.auth().signOut().then(() => {
        // eslint-disable-next-line
        <Redirect to="/" />
    }).catch(() => {
        console.log('Error happened')
    })
    localStorage.removeItem('uid');
}

  render() {
    return (
      <div className="App">

       <div class="container-fluid bg-transparent">
       <Navbar class="navbar navbar-expand-lg navbar-light bg-light rounded" expand="md">
            <NavbarBrand href="/">
            <i class="fas fa-home"></i>
            HOME </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="#">TU VOICE</NavLink>
                </NavItem>
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    Options
                </DropdownToggle>
                  <DropdownMenu right>

                  <DropdownItem class="text-center">
                      <span> active </span>
                      <span class="dot dot-success"></span>
                  </DropdownItem>

                  <DropdownItem divider />
                    <DropdownItem onClick={this.handleLogout}>
                     logout
                  </DropdownItem>

                   

                  </DropdownMenu>
                </UncontrolledDropdown>
              </Nav>
            </Collapse>
          </Navbar>
       </div>
          
       

        <Router>
          <div class="container-fluid">
            <Route exact path="/" component={LogIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/home" component={Post} />
          </div>
        </Router>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  authed: state.authed
})

export default connect(mapStateToProps)(App);
