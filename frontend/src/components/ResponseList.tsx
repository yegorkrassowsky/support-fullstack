import React from 'react'
import {IResponse} from '../interfaces'
import Response from './Response'
import Pagination from '../components/Pagination'
import {IPagination} from '../interfaces'

type ResponseListProps = {
  data: IResponse[]
  paginationProps: IPagination
  loading: boolean
}
const ResponseList: React.FC<ResponseListProps> = ({data, paginationProps, loading}) => {
  let containerClasses = ['responses-container']
  containerClasses.push( loading ? 'loading' : 'loaded')
  let shownDate = ''
  return (
    <div className={containerClasses.join(' ')}>
      <div className="response-list">
        {data.map((response) => {
          let showDate = false
          const responseDate = new Date(response.created_at).toLocaleDateString()          
          if( responseDate !== shownDate) {
            showDate = true
            shownDate = responseDate
          }
          return (
            <Response
              key={response.id}
              {...response}
              showDate={showDate}
              loading={loading}
            />
          )
        })}
      </div>
      <Pagination {...paginationProps} />
    </div>
  )
}

export default ResponseList