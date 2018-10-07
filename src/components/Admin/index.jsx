import React, { Component } from 'react'
import { Container, Col, Row, ListGroup, ListGroupItem } from 'reactstrap'
import { Route, Link } from 'react-router-dom'
import TableListUser from './listuser/table'
import TableListArt from './listarticle/table'

class AdminState extends Component {
  render () {
    return (
      <Container className='mt-90 rootAdmin' fluid>
        <Row>
          <div className='mainAdmin'>
          </div>
          <Col md='3'>
            <ListGroup>
              <ListGroupItem color='primary'><Link to={this.props.match.url + '/listuser'}>List User</Link></ListGroupItem>
              <ListGroupItem color='primary'><Link to={this.props.match.url + '/listarticle'}>List Article</Link></ListGroupItem>
            </ListGroup>
          </Col>
          <Col md={9} className='adminSub'>
            <Route path={this.props.match.url + '/listuser'} component={ListUser} />
            <Route path={this.props.match.url + '/listarticle'} component={ListArticle} />
          </Col>
        </Row>
      </Container>
    )
  }
}

class ListUser extends Component {
  render () {
    return (
      <Col md={12}>
        <h3 className='TitleAdmin'>List User</h3>
        <TableListUser />
      </Col>
    )
  }
}
const ListArticle = () => {
  return (
    <Col md={12}>
      <h3 className='TitleAdmin'>List Article</h3>
      <TableListArt />
    </Col>
  )
}

export default AdminState
