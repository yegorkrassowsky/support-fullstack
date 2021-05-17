import React from 'react'
import {IResponse} from '../interfaces'
import Loader from '../components/Loader'

const Response: React.FC<IResponse> = ({
  id,
  content,
  author,
  author_pos,
  created_at,
  showDate,
  loading,
}) => {
  const date = showDate ? new Date(created_at).toLocaleDateString() : null
  const time = new Date(created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  return (
    <div className="response-container">
      {date && <span className="response-date">{date}</span>}
      <div className="response">
        {loading && <Loader />}
        {author_pos === 'Client' && <span className="response-icon bg-warning"><i className="fas fa-question"></i></span>}
        {author_pos === 'Agent' && <span className="response-icon bg-success"><i className="fas fa-reply fa-flip-horizontal"></i></span>}
        <div className="response-content">
          <div className="response-header">
            <div className="response-author">
              <span className="response-author-name">{author}</span>
              <span className="response-author-pos badge bg-success">{author_pos}</span>
            </div>
            <div className="response-time">{time}</div>
          </div>
          <div className="response-body" dangerouslySetInnerHTML={{__html:content}}></div>
        </div>
      </div>
    </div>
  )
}

export default Response