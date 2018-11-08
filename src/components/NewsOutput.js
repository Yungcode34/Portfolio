import React from 'react'

const NewsOutput = (props) => {
    return (
        <div className="about-news">
          <p >News:</p>
          <a className="anchor-news" target="_blank" href={props.newsUrl}>
            {props.newsTitle}   
          </a>
          <p>{props.newsDesc}</p>
        </div>
      )
}

export default NewsOutput
