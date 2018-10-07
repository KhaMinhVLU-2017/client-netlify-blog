import React, {Fragment} from 'react'
import Article from '../Article'
import Banner from '../Banner'

const Welcome = () => {
  return (
    <Fragment >
      <Banner backgroundImage='url(assets/img/bg-gift.jpg)' title='Latest Blog Posts' subtitle='Read and get updated on how we progress.' />
      <Article />
    </Fragment>
  )
}

export default Welcome
