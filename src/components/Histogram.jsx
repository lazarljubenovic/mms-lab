import React from 'react'
import './Histogram.css'

const ratio = (curr, total) => curr / total
const percent = val => `${val * 100}%`

export default ({from, to, data}) => {
  const max = Math.max(...data)
  return (
    <div className="Histogram">
      <div className="bars">
        {
          data.map((data, key) =>
            <div key={key} style={{height: percent(ratio(data, max))}}></div>)
        }
      </div>
      <div className="labels">
        <div>{from}</div><div>{to}</div>
      </div>
    </div>
  )
}
