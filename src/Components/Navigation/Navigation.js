import React from 'react';
import { Link } from "react-router-dom";
import { history } from '../../helpers';
import { connect } from 'react-redux';
import { Menu, Icon } from 'antd';
import './Navigation.css';

/* eslint eqeqeq: 0 */
export class Navigation extends React.Component {
  
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      pathname: '/dashboard',
      current: 'dashboard',
    };
  }

  componentDidMount() {
    this._isMounted = true;

    history.listen((location, action) => {
      if (this._isMounted) {
        this.setState({ pathname: location.pathname })
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleMenuClick = (e) => {
    this.setState({
      current: e.key,
    });
  }

  render() {
    //const { pathname } = this.state;
    return (
      <div className="main-menu">
        <nav className="navbar navbar-expand-lg navbar-light ">
          <div className="navbar-toggler" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span> 
          </div>
          <a className="navbar-brand" href="/">
            Logo
          </a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <Menu
              onClick={this.handleMenuClick}
              selectedKeys={[this.state.current]}
              mode="horizontal"
            >
              <Menu.Item key="dashboard">
                <Link href="#" className="dropdown-item" to="/dashboard">
                  <Icon type="dashboard" /><span>Dashboard</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="menu1">
                <Link href="#" className="dropdown-item" to="/dashboard">
                  <Icon type="dashboard" /><span>Menu 1</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="menu2">
                <Link href="#" className="dropdown-item" to="/dashboard">
                  <Icon type="dashboard" /><span>Menu 2</span>
                </Link>
              </Menu.Item>
            </Menu>
          </div>
        </nav>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    
  }
}

export default connect(mapStateToProps)(Navigation);
