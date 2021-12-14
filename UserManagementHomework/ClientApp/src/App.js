import React, { Component } from 'react';
import { Route, Switch} from 'react-router-dom'
import { Layout } from './components/Layout';
import Home from './components/Home';
import UserList from './components/UserList';
import UserCard from './components/UserCard';
import EditUser from './components/EditUser';
import CreateUser from './components/CreateUser'


import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/List' component={UserList} />
            <Route exact path='/User/Details/:id' component={UserCard} />
            <Route exact path='/User/Edit/:id' component={EditUser} />
            <Route exact path='/User/Create' component={CreateUser} />
          </Switch>
      </Layout>
    );
  }
}
