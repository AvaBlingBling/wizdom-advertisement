import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

import App from './pages/App';
import Home from './pages/Home/Home';
import Info from './pages/Info/Info';
import InfoDetail from './pages/Info/InfoDetail';
import NewInfo from './pages/Info/NewInfo';
import Test from './pages/Test';
import ErrorPage from './pages/error';

export default class Routers extends Component {
  render() {
    return (
      // BrowserRouter渲染出的是location.hash为'',HashRouter渲染出是location.hash为'#/home'
      <HashRouter>
        {/* 不加div或Switch会报error：A <Router> may have only one child element */}
        <Switch>
          <Route path="/404" component={ErrorPage} />
          <Redirect from="/" to="/home" exact />
          <App>
            <Switch>
              {/*exact值匹配location.pathname，否则/后面的路由都不会匹配，只渲染Home*/}
              <Route path="/home" component={Home} exact />
              <Route path="/info" component={Info} exact />
              <Route path="/info/detail/:id" component={InfoDetail} />
              <Route path="/info/new" component={NewInfo} />
              <Route path="/info/edit/:id" component={NewInfo} />
              <Route path="/plan" component={Test} />
              <Redirect to={{ pathname: "/404" }} />
            </Switch>
          </App>
        </Switch>
      </HashRouter>
    )
  }
}
