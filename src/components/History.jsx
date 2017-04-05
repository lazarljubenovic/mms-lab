import React from 'react'
import {connect} from 'react-redux'
import './History.css'

const History = ({past, present, future}) =>
  <div className="History">
    <ol className="past">
      {past.map((el, i) =>
        <li key={`past-${i}-${el}`}><img alt="past" src={el}/></li>
      )}
    </ol>
    <ol className="present">
      <li key={`present-${present}`}><img alt="present" src={present}/></li>
    </ol>
    <ol className="future">
      {future.map((el, i) =>
        <li key={`future-${i}-${el}`}><img alt="future" src={el}/></li>
      )}
    </ol>
  </div>

const mapStateToProps = state => ({
  past: state.image.url.past,
  present: state.image.url.present,
  future: state.image.url.future,
})

export default connect(mapStateToProps)(History)
