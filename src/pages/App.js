import React, { Component } from 'react';
import { Avatar, Menu } from 'antd';

import logo from '../images/logo.png';
import { menu } from '../model/App';

import styles from './App.less';
console.log(styles);

const { SubMenu, Item } = Menu;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedKeys: [],
    }
    window.addEventListener('hashchange', this.hashchange, false);
  }
  componentDidMount() {
    this.hashchange();
  }
  componentWillUnmount() {
    window.removeEventListener('hashchange', this.hashchange, false);
  }
  hashchange = e => {
    const hash = window.location.hash || e.newURL.split('#')[1];
    if (hash) {
      const arr = hash.split('/');
      const selectedKeys = arr[1] ? [arr[1]] : [];
      this.setState({ selectedKeys });
    }
  }
  generateMenu = menu => {
    return menu.map((v, i) => {
      if (v.subMenu) {
        return <SubMenu key={v.key} title={<span>{v.title}</span>}>
          {
            v.subMenu.map((w, j) => {
              if (w.subMenu) {
                return <SubMenu key={w.key} title={<span>{w.title}</span>}>
                  {
                    w.subMenu.map(x => <Item key={x.key}><a href={x.url}>{x.title}</a></Item>)
                  }
                </SubMenu>;
              } else {
                return <Item key={w.key}><a href={w.url}>{w.title}</a></Item>;
              }
            })
          }
        </SubMenu>;
      } else {
        return <Item key={v.key}><a href={v.url}>{v.title}</a></Item>;
      }
    })
  }
  render() {
    return (
      <div className={styles.App}>
        <header className={`${styles['App-header']} blueGradient`}>
          <div className={styles['App-left']}>
            <img src={logo} className={styles['App-logo']} alt="logo" />
            <h4 className={styles['App-title']}>
              <div className={styles['App-title-main']}>户外广告</div>
              <div>Outdoor advertising</div>
            </h4>
          </div>
          <div className={styles['App-nav']}>
            <Menu
              selectedKeys={this.state.selectedKeys}
              defaultSelectedKeys={['home']}
              mode="horizontal"
            >
              {this.generateMenu(menu)}
            </Menu>
          </div>
          <div className={styles['App-right']}>
            <Avatar count={1} src={require('../images/user.png')} />
          </div>
        </header>
        <div className={styles['App-content']}>
          {
            this.props.children
          }
        </div>
      </div>
    );
  }
}

export default App;
