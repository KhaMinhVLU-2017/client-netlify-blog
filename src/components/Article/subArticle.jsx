import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import config from '../../config'
import FadeIn from 'react-lazyload-fadein'

const SubArticle = (props) => {
  return (
    <Fragment>
      <article className='mt-90 SubArti' >
        <header className='text-center mb-40'>
          <h3>
            <a href={'/article/' + props.idPost}>{props.title}</a>
          </h3>
          <div className='link-color-default fs-12'>
            <a href='note'>{props.author} </a>,&ensp; <time>{props.date}</time>
          </div>
        </header>
        <Link to={'/article/' + props.idPost}>
          <FadeIn height={600} duration={250} easing={'ease-out'}>
            {onload => (
              <img className='rounded' src={config.api.local + props.image} alt={props.title}
                onLoad={onload}
                style={{ height: 500 }}
              />
            )}
          </FadeIn>
        </Link>
        <div className='card-block'>
          <p className='text-justify'>{props.sapo}</p>
          <p className='text-center mt-40'>
            <Link className='btn btn-primary btn-round' to={'/article/' + props.idPost}>Read more</Link>
          </p>
        </div>
      </article>
      <hr />
    </Fragment>
  )
}
export default SubArticle
