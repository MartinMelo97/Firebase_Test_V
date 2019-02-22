import React, { Component } from 'react';
import './App.scss';
import { Switch, Route, NavLink } from 'react-router-dom'
import Home from './components/home/Home'
import 'antd/dist/antd.css'
import { Layout, Menu } from 'antd'
import firebase from 'firebase'
import Login from './components/accounts/Login'
import Profile from './components/accounts/Profile'
class App extends Component {

  constructor(props){
    super(props)
    this.db = firebase.firestore()
    this.state = {
      user: null
    }
  }

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged((user)=>{
      if(user)
      {
        this.setState({user})
      }
    })
  }

  loginGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then((user)=>
      {
        console.log("Estoy logeado soy paquito")
        window.location.assign("/profile")
      })
      .catch((err)=>console.log("Hay un error " + err))
  }

  logOut = () => {
    firebase.auth().signOut()
      .then(()=>alert("Tu sesión ha sido cerrada"))
      .catch((err)=>console.log(err))
    this.setState({user: null})
  }

  registerUser = (email, password) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(()=>
        {
          alert("Usuario creado con éxito")
          window.location.assign("/profile")
        })
      .catch(err=>
        {
          console.log(err)
          alert("No se puedo crear usuario")
        })
  }

  loginWithEmail = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(()=>{
      alert("Usuario loggeado con éxito")
      window.location.assign("/profile")
    })
    .catch(err=>
      {
        console.log(err)
        alert("No se puedo loggear usuario")
      })
  }


  render() {
    const { Header, Content, Footer } = Layout;
    const { Item } = Menu;
    return (
      <Layout className="layout">
        <Header className="header">
          <Menu
          className="menu"
          theme="dark"
          mode="horizontal"
          style={{ lineHeight: "64px" }}
          defaultSelectedKeys={['home']}
          >
            <Item key="home">
            <NavLink to="/">
            Home
            </NavLink></Item>

            {this.state.user ?
              <Item
              onClick={this.logOut}
              >Cerrar sesión</Item>
              : 
              <Item key="login">
              <NavLink to="/login">
                Login
              </NavLink></Item>
            }
            
            
          </Menu>
        </Header>
        <Content className="content">
          <Switch>
            <Route 
            exact path="/" 
            render={()=> 
              <Home 
                user={this.state.user} 
              />}
            /> 

            <Route 
            exact path="/login"
            render={()=> 
            <Login
              loginGoogle={this.loginGoogle} 
              user={this.state.user} 
              register={this.registerUser}
              loginEmail={this.loginWithEmail}
              />}
            />

            <Route 
            exact path="/profile"
            render={()=>
            <Profile
              user={this.state.user}
              db={this.db}
            />}
            />

          </Switch>
        </Content>
        <Footer>
          <p>Actosoft FirebaseMX 2019</p>
        </Footer>
      </Layout>
    );
  }
}

export default App;
