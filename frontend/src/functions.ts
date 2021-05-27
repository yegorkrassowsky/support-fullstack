import { useHistory } from "react-router-dom"

const useFunctions = () => {
  const history = useHistory()
  const gotoTicket = (id: number) => history.push(`/ticket/${id}`)
  return {gotoTicket}
}

export default useFunctions
