import React, {useEffect, useMemo} from 'react'
import {useParams, useLocation, useHistory} from 'react-router-dom'
import Response from './Response'
import Pagination from '../components/Pagination'
import {IState, ILoading, IResponses, ITotalPages} from '../interfaces'
import { ThunkDispatchType, SetTicketPageType } from '../types'
import {connect} from 'react-redux'
import {setTicketPage} from '../actions/ticket'

const supportedParams = ['page']

type DataQueryProps = {
  page: number
}

const DEFAULT_PAGE = 1

const getQueryParams = (urlParams: URLSearchParams): DataQueryProps => {
  const obj: any = Array.from(urlParams)
    .filter((param) => supportedParams.includes(param[0]))
    .map((param) => {
      return {
        [param[0]]: param[1]
      };
    })
    .reduce((acc, cur) => ({ ...acc, ...cur }), {});

  const keys = Object.keys(obj);

  if (!keys.includes("page")) {
    obj.page = DEFAULT_PAGE;
  }

  return obj as DataQueryProps;
}

type ResponseListProps = {
  setTicketPage: SetTicketPageType
} & IResponses & ITotalPages & ILoading

const ResponseList: React.FC<ResponseListProps> = ({responses, loading, totalPages, setTicketPage}) => {
  const {id: ticketIdParam} = useParams<{id: string}>()
  const ticketId = +ticketIdParam
  const location = useLocation()
  const urlParams = useMemo(() => {
    return new URLSearchParams(location.search);
  }, [location.search])
  const queryParams = useMemo(() => {
    return getQueryParams(urlParams);
  }, [urlParams])
  const currentPage = +queryParams.page
  useEffect(()=>{
    setTicketPage(ticketId, currentPage)
  }, [setTicketPage, ticketId, currentPage])
  const onPageChanged = (page: number) => {
    urlParams.set('page', `${page}`)
    updateURL()
  }
  const history = useHistory()
  const updateURL = () => {
    if (urlParams.get('page') === `${DEFAULT_PAGE}`) {
      urlParams.delete("page");
    }
    history.push({
      pathname: location.pathname,
      search: `?${urlParams}`
    })
  }

  if(responses.length === 0) {
    return <></>
  }

  const paginationProps = {
    currentPage,
    onPageChanged,
    totalPages,
    pageNeighbours: 1,
  }

  let containerClasses = ['responses-container']
  containerClasses.push( loading ? 'loading' : 'loaded')
  let shownDate = ''
  return (
    <div className={containerClasses.join(' ')}>
      <div className="response-list">
        {responses.map((response) => {
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

const mapDispatchToProps = (dispatch: ThunkDispatchType) => ({
  setTicketPage: (ticketId: number, page: number) => dispatch(setTicketPage(ticketId, page)),
})

export default connect((state: IState) => ({
  responses: state.ticket.responses,
  totalPages: state.ticket.totalPages,
}), mapDispatchToProps)(ResponseList)
