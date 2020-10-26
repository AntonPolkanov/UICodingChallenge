import React, {Component} from 'react';
import './App.css';
import Auth from './auth/Auth';
import AuthContext from './auth/AuthContext';
import {Route, withRouter, RouteComponentProps} from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Products from './components/Products';
import Profile from './components/Profile';
import ProductDetails from './components/ProductDetails';

class App extends Component<RouteComponentProps, {auth}> {

  constructor(props) {
    super(props)
    this.state = {
      auth : new Auth(this.props.history)
    }
  }
  
  render() {
    const {auth} = this.state;
    return (
      <AuthContext.Provider value={auth}>
        <Layout>
          <Route exact path='/' render={props => <Home {...props}/>}/>
          <Route path='/products' render={props => <Products {...props}/>}/>
          <Route path='/profile' render={props => <Profile {...props}/>}/>
          <Route path='/productDetails' render={props => <ProductDetails {...props}/>}/>
        </Layout>
      </AuthContext.Provider>
    );
  }
}

export default withRouter(App);
