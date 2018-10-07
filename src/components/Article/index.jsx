import React, { Component } from 'react'
import axios from 'axios'
import SubArticle from './subArticle'
import loadedImg from '../../images/load.gif'
import config from '../../config'
import LazyLoad from 'react-lazyload'// Loaded Append Article

class Article extends Component {
  constructor (props) {
    super(props)
    this.state = { listArt: [], load: false }
    this.errorMeo = null
    this.getListArt = this.getListArt.bind(this)
  }
  componentDidMount () {
    this.getListArt(true)
  }
  getListArt (check) {
    let self = this
    if (check) {
      this.setState({ load: true })
    }
    axios.get(config.api.local + '/api/Articles')
      .then(function (response) {
        clearTimeout(self.errorMeo)
        if (check) {
          self.setState({ listArt: response.data.listArti, load: false })
        } else {
          self.setState({listArt: response.data.listArti})
        }
      })
      .catch(function (error) {
        console.log(error)
        self.errorMeo = setTimeout(() => self.getListArt(), 1500)
      })
  }
  render () {
    let listArt = this.state.listArt
    let self = this
    config.socket.on('refesh', (response) => {
      if (response.data) {
        self.getListArt(false)
      }
    })
    return (
      <main className='main-content bg-gray' style={{marginBottom: 150}}>
        <div className='row'>
          <div className='col-12 col-lg-6 offset-lg-3'>
            {this.state.load ? <img className='creArti_img' src={loadedImg} alt='loaded' /> : listArt.map((item, index) => 
              <LazyLoad key={index} height={200} once>
                <SubArticle
                  key={index}
                  title={item.title}
                  date={item.date}
                  image={item.image}
                  author={item.author}
                  sapo={item.sapo}
                  idPost={item._id}
                />
              </LazyLoad>)}
          </div>
        </div>
      </main>
    )
  }
}

export default Article
