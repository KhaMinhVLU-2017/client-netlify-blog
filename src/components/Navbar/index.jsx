import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'

import { withCookies } from 'react-cookie'
/**
 * Redux
 */
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as todoAction from '../../actions/index'

class Navbar extends Component {
  reloadPage () {
    // window.location.reload()
    let body = document.body.classList.contains('topbar-reveal')
    // Check Class for remove tag is beautiful Front-end
    if (body) {
      document.body.classList.remove('topbar-reveal')
      document.querySelector('.topbar-backdrop').remove()
    }
  }
  destroyCookie (cookies) {
    cookies.remove('username')
    cookies.remove('id_user')
    cookies.remove('email')
    cookies.remove('__Token')
    cookies.remove('avatarLink')
  }
  logOutDestroyCookie () {
    this.props.actions.logoutA()
    let { cookies } = this.props
    let self = this
    // console.log(cookies)
    // store.dispatch(todoAction.logoutA())
    this.destroyCookie(cookies).then(() => self.reloadPage())
  }
  render () {
    // console.log(this.props.username)
    return (
      <nav className='topbar topbar-inverse topbar-expand-md topbar-sticky'>
        <div className='container'>
          <div className='topbar-left'>
            <button className='topbar-toggler'>☰</button>
            <Link className='topbar-brand' to='/'>
              <img className='logo-default' src={`${process.env.PUBLIC_URL}/assets/img/logo.png`} alt='logo' />
              <img className='logo-inverse' src={`${process.env.PUBLIC_URL}/assets/img/logo-light.png`} alt='logo' />
            </Link>
          </div>
          <div className='topbar-right'>
            <ul className='topbar-nav nav'>
              <li onClick={this.reloadPage.bind(this)} className='nav-item '>
                <Link className='nav-link' to='/'>Home</Link>
              </li>
              <li onClick={this.reloadPage.bind(this)} className='nav-item'>
                <Link className='nav-link' to='/articles/create'>Write new article</Link>
              </li>
              {this.props.username ?
                <li className='nav-item'>
                  <Link className='nav-link' to='/profile'>{this.props.username}
                    <i className='fa fa-caret-down' />
                  </Link>
                  <div className='nav-submenu'>
                    <Link className='nav-link' to='/'>My articles</Link>
                    <Link onClick={this.logOutDestroyCookie.bind(this)} className='nav-link' to='/Logout'>Logout</Link>
                  </div>
                </li> :
                <Fragment>
                  <li onClick={this.reloadPage.bind(this)} className='nav-item'>
                    <Link className='nav-link' to='/Login'>Login</Link>
                  </li>
                  <li onClick={this.reloadPage.bind(this)} className='nav-item'>
                    <Link className='nav-link' to='/Signup'>Signup</Link>
                  </li>
                </Fragment>
              }
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

function mapStatetoProps (state) {
  return {
    username: state.username
  }
}
function mapDispatch (dispatch) {
  return {
    actions: bindActionCreators(todoAction, dispatch)
  }
}
export default withCookies(connect(mapStatetoProps, mapDispatch)(Navbar))
