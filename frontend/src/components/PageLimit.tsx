import React from 'react'

type PageLimitProps = {
  currentLimit: number
  onChange: (limit: number) => void
  limits?: number[]
}

const PageLimit: React.FC<PageLimitProps> = ({currentLimit, onChange, limits = [10, 25, 50]}) => {
  const changeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(+e.target.value)
  }
  const labelText = "Items per page"
  return (
    <div className="page-limit d-flex">
      <label htmlFor="pageLimitSelect" className="col-form-label me-2">{labelText}</label>
      <select id="pageLimitSelect" className="form-select w-auto" aria-label={labelText} onChange={changeHandler} value={currentLimit}>
        {limits.map((limit, index) => <option key={index} value={limit}>{limit}</option>)}
      </select>
    </div>
  )
}

export default PageLimit