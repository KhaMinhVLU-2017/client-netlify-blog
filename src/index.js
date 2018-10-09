import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from './components/Navbar'
import Welcome from './components/Welcome'
import Footer from './components/Footer'
import CreateArticle from './components/CreateAriticle'
import Login from './components/Login'
import SingleArticle from './components/SingleArticle'
import Signup from './components/Signup'
import createHistory from 'history/createBrowserHistory'
import ErrorMeo from './components/Error'
import AdminState from './components/Admin'
import { CookiesProvider, withCookies } from 'react-cookie'
// eslint-disable-next-line
import  $ from 'jquery'

// Rich Editor wyswyg
import 'froala-editor/js/froala_editor.pkgd.min.js'
// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css'
import 'froala-editor/css/froala_editor.pkgd.min.css'
// Require Font Awesome.
import 'font-awesome/css/font-awesome.css'

// Redux
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers/index'

/**
 * Https
 */
import HttpsRedirect from 'react-https-redirect'
/**
 * Font-awesome
 */
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'
library.add(faStroopwafel)
// add jquery
window.jQuery = $
window.$ = $
global.jQuery = $

/**
 * pass Param in Home
 */

let initialState = {}
let store
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
class RouteApp extends Component {
  componentWillMount () {
    let { cookies } = this.props
    // console.log(cookies.get('__Token'))
    /**
     * SocketIO Connect ^
     */
    if (cookies) {
      let username = cookies.get('username')
      let id = cookies.get('id_user')
      let email = cookies.get('email')
      let __Token = cookies.get('__Token')
      initialState = {
        id_user: id,
        username,
        email,
        __Token
      }
      store = createStore(reducer, initialState)
    }
  }
  render () {
    return (
      <CookiesProvider >
        <BrowserRouter >
          <Provider store={store}>
            <HttpsRedirect>
              <Fragment>
                <Navbar />
                <Switch >
                  <Route path='/' exact render={() => {
                    // let history = createHistory()
                    // history.push('/')
                    let body = document.body.classList.contains('body-scrolled')
                    if (body) {
                      document.body.classList.remove('body-scrolled')
                    }
                    return <Welcome />
                  }} />
                  <Route path='/Login' render={() => {
                    // let history = createHistory()
                    // history.push('/login')
                    let body = document.body.classList.contains('body-scrolled')
                    if (!body) {
                      document.body.classList.add('body-scrolled')
                    }
                    return <Login />
                  }} />
                  <Route path='/Logout' render={() => {
                    return <Redirect to='/' />
                  }} />
                  <Route path='/Signup' render={() => {
                    // let history = createHistory()
                    // history.push('/Login')
                    let body = document.body.classList.contains('body-scrolled')
                    if (!body) {
                      document.body.classList.add('body-scrolled')
                    }
                    return <Signup />
                  }} />
                  <Route path='/article/:idPost' render={(props) => <SingleArticle {...props} />} />
                  <Route path='/articles/create' render={() => {
                    let { cookies } = this.props
                    let history = createHistory()
                    history.push('/articles/create', { initialState })
                    return cookies.get('id_user') ? <CreateArticle /> : <Login />
                  }} />
                  <Route path='/Cha/Admin' render={(props) => {
                    let { cookies } = this.props
                    const userId = cookies.get('id_user')
                    let body = document.body.classList.contains('body-scrolled')
                    if (!body) {
                      document.body.classList.add('body-scrolled')
                    }
                    return userId === '5bb8bdc9123c4f013f7c7851' ? <AdminState {...props} /> : <ErrorMeo />
                  }} />
                  <Route component={ErrorMeo} />
                </Switch>
                <Footer />
              </Fragment>
            </HttpsRedirect>
          </Provider>
        </BrowserRouter>
      </CookiesProvider>
    )
  }
}

const RouteAppCookie = withCookies(RouteApp)

ReactDOM.render(<RouteAppCookie />, document.getElementById('root'))
registerServiceWorker()
