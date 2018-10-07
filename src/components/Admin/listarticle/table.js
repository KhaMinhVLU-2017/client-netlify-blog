import React from 'react'
import { Table, Button } from 'reactstrap'
import axios from 'axios'
import config from '../../../config'
import { withCookies } from 'react-cookie'
import loading from '../../../images/load2.gif'

class TableListArt extends React.Component {
  constructor (props) {
    super(props)
    this.state = { list: [], loading: false, mainHander: true }
    this.handerRmAri = this.handerRmAri.bind(this)
    this.crawApi = this.crawApi.bind(this)
  }
  componentDidMount () {
    this.crawApi()
  }
  crawApi () {
    let self = this
    axios.get(config.api.local + '/api/Articles')
      .then(response => {
        if (response.status === 200) {
          // console.log(response)
          self.setState({ list: response.data.listArti, loading: false, mainHander: true })
        }
      })
      .catch(err => err)
  }
  handerRmAri (e) {
    let id = e.target.id
    let self = this
    this.setState({ loading: true, idLoad: id, mainHander: false })
    const { cookies } = this.props
    const __Token = cookies.get('__Token')// get Token
    // Post Axios
    axios.defaults.headers.common['authorization'] = 'bearer ' + __Token
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
    axios.post(config.api.local + '/api/rmArticle', { id })
      .then(response => {
        if (response.data.status === 200) {
          self.crawApi()
        } else {

        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  render () {
    let listMeo = this.state.list
    let self = this
    config.socket.on('refesh', (response) => {
      if (response.data && this.state.mainHander) {
        self.crawApi()
      }
    })
    return (

      <Table dark>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Date</th>
            <th>Author</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody id='cttable'>
          {listMeo.map((item, index) =>
            <tr id={'tr' + item._id} key={index}>
              <th scope='row'>{index + 1}</th>
              <td>{item.title}</td>
              <td>{item.date}</td>
              <td>{item.author}</td>
              <td>{this.state.loading && item._id === this.state.idLoad ? <img style={{width: 50}} className='img-responsive' src={loading} alt='loaded' /> : <Button color='danger' onClick={this.handerRmAri} id={item._id}>X</Button>}</td>
            </tr>
          )}
        </tbody>
      </Table>
    )
  }
}

export default withCookies(TableListArt)
