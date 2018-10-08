import React, { Fragment, Component } from 'react'
import Banner from '../Banner'
import axios from 'axios'
import loadedImg from '../../images/load2.gif'
import { Redirect } from 'react-router-dom'

import { instanceOf } from 'prop-types'
import { withCookies, Cookies } from 'react-cookie'
import config from '../../config'

import FroalaEditor from 'react-froala-wysiwyg'

class CreateArticle extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  }
  constructor(props) {
    super(props)
    this.state = {
      Categorys: [],
      title: null,
      content: null,
      image: null,
      category: null,
      load: false,
      sapo: null
    }
    this.arrImageEditor = []
    this.arrImgup = []
    this.getCategorys = this.getCategorys.bind(this)
    this.handerSubmit = this.handerSubmit.bind(this)
    this.handerChange = this.handerChange.bind(this)
    this.loadImage = this.loadImage.bind(this)
    this.handleModelChange = this.handleModelChange.bind(this)
    this.handlerNameImgRT = this.handlerNameImgRT.bind(this)
  }
  componentDidMount() {
    this.getCategorys()
    // console.log('Mount da chay roi nhe')
  }
  // Ajax List Category from server
  getCategorys() {
    let self = this
    axios.get(config.api.local + '/api/categorys')
      .then(function (response) {
        self.setState({ Categorys: response.data.listCategorys, category: response.data.listCategorys[0]._id })
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  // Event Save once Character
  handerChange(e) {
    let name = e.target.name
    this.setState({ [name]: e.target.value })
    // console.log(name + ' ' + e.target.value)
  }
  // Load Images From your Pick
  loadImage(e) {
    let file = e.target.files[0]
    this.setState({
      file: URL.createObjectURL(file),
      image: file
    })
  }
  // Event Submit on Server save Post
  handerSubmit(e) {
    e.preventDefault()
    const { cookies } = this.props
    let ck_Token = cookies.get('__Token')// get Token
    let seft = this
    this.setState({ load: true })
    const fd = new FormData()
    fd.append('title', this.state.title)
    fd.append('content', this.state.content)
    fd.append('sapo', this.state.sapo)
    fd.append('author', cookies.get('id_user'))
    fd.append('category', this.state.category)
    fd.append('image', this.state.image)
    fd.append('imageEditor', this.arrImageEditor)
    // Post Axios
    axios.defaults.headers.common['authorization'] = 'bearer ' + ck_Token
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
    axios.post(config.api.local + '/api/crArticle', fd, {
      onUploadProgress: progressEvent => {
        console.log('UploadProgress: ' + Math.round(progressEvent.loaded / progressEvent.total * 100) + '%')
      }
    })
      .then(function (response) {
        if (response.status === 200) {
          seft.setState({ load: false })
          seft.setState({ back: <Redirect to='/' /> })
          // console.log('Create Article Complete')
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  handleModelChange (ct) {
    // console.log(ct)
    let text = ct.toString()
    this.setState({content: text})
  }
  // Config images Rich Text
  handlerNameImgRT(respon){
    this.arrImageEditor.push(respon)
    let path = config.api.local + respon
    // console.log(respon)
    this.arrImgup.push(path)
  }
  render() {
    let listCategorys = this.state.Categorys
    let nodeCurrent;
    let self = this
    return (
      <Fragment>
        {this.state.back}
        <Banner backgroundImage={`url(${process.env.PUBLIC_URL}/assets/img/bg-laptop.jpg)`} title='Write an article' />
        <main className='main-content'>
          <section className='section'>
            <div className='container'>
              <div className='row'>
                <div className='col-12 col-lg-12'>
                  {this.state.load ? <img className='creArti_img' src={loadedImg} alt='loaded' /> : <form className='p-30 bg-gray rounded' onSubmit={this.handerSubmit} encType='multipart/form-data'>
                    <div className='row'>
                      <div className='form-group col-md-12 my-5'>
                        <input onChange={this.loadImage} type='file' name='image' className='form-control' />
                      </div>
                      <div className='form-group col-md-12 my-5'>
                        <img style={{ height: 300, width: 300 }} src={this.state.file}
                          alt='Please Choose'
                          accept='image/x-png,image/gif,image/jpeg' />
                      </div>
                      <div className='form-group col-12 col-md-6'>
                        <input onChange={this.handerChange} className='form-control form-control-lg' type='text' name='title' placeholder='Title' />
                      </div>
                      <div className='form-group col-12 col-md-6'>
                        <select onChange={this.handerChange} name='category' id='category' className='form-control form-control-lg'>
                          {listCategorys.map((item, index) => <option key={index} value={item._id}>{item.name}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className='form-group'>
                      <textarea onChange={this.handerChange} className='form-control form-control-lg' rows={4} placeholder='Sapo' name='sapo' defaultValue={''} />
                    </div>
                    {/* Content  */}
                    <div className='form-group'>
                      <FroalaEditor 
                        tag='textarea'
                        model = {this.state.content}
                        onModelChange={this.handleModelChange}
                        config= {{ placeholderText: 'Edit Your Content Here!',
                        // Allow method insert video not upload
                        videoInsertButtons: ['videoBack', '|', 'videoByURL', 'videoEmbed'],
                        // Set the image upload URL.
                        imageUploadURL: config.api.local + '/api/Article/uploadImg',
                 
                        // Additional upload params.
                        // imageUploadParams: {id: 'm_editor'},
                 
                        // Set request type.
                        imageUploadMethod: 'POST',
                 
                        // Set max image size to 5MB.
                        imageMaxSize: 20 * 1024 * 1024,
                 
                        // Allow to upload PNG and JPG.
                        imageAllowedTypes: ['jpeg', 'jpg', 'png'],
                        toolbarStickyOffset: '60px', // sticky scroll
                        // toolbarBottom: true,
                        events: {
                          'froalaEditor.image.beforeUpload': (e, editor, images) => {
                            console.log('Before ' + images)
                          },
                          'froalaEditor.image.uploaded': (e, editor, response) => {
                            self.handlerNameImgRT(response)
                            let pathImg = self.arrImgup.pop()
                            let stringPath =config.api.local+'/uploaded/images/'
                            let lengthPath = stringPath.length
                            let id = pathImg.slice(lengthPath, pathImg.length)
                            nodeCurrent =editor.image.get() // node image
                            // console.log('id Co noi: ' + id)
                            editor.image.align('left')
                            editor.image.insert(pathImg, true, {'id': id}, nodeCurrent, response)
                            return false // return false for end Event
                          },
                          'froalaEditor.image.removed': (e, editor, $img) => {
                            let idParam =  $img[0].dataset.id
                            let versus = '/uploaded/images/' + idParam
                            this.arrImageEditor = this.arrImageEditor.filter(item => item !== versus)
                            console.log(this.arrImageEditor)
                            axios.post(config.api.local + '/api/Article/remove/' + idParam).then(
                              response => {
                                /**
                                 * Doing COntent Report
                                 */
                                if(response.data.status ===200){
                                  console.log(response.data.message)
                                }else {
                                  console.log(response)
                                }
                              }
                            ).catch(function (error) {
                              console.log(error)
                            })
                          }
                        }
                      }}
                    />
                    </div>
                    <div className='text-center'>
                      <button className='btn btn-lg btn-primary' type='submit'>Create Article</button>
                    </div>
                  </form>}
                </div>
              </div>
            </div>
          </section>
        </main>
      </Fragment>
    )
  }
}

export default withCookies(CreateArticle)

