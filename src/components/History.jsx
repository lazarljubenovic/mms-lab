import React from 'react'
import {connect} from 'react-redux'
import './History.css'

const History = ({past, present, future}) =>
  <div className="History">
    <ol className="past">
      {past.map((el, i) =>
        <li><img alt="past" src={el} key={`past-${i}-${el}`}/></li>
      )}
    </ol>
    <ol className="present">
      <li><img alt="present" src={present} key={`present-${present}`}/></li>
    </ol>
    <ol className="future">
      {future.map((el, i) =>
        <li><img alt="future" src={el} key={`future-${i}-${el}`}/></li>
      )}
    </ol>
  </div>

const mapStateToProps = state => ({
  past: state.image.url.past,
  present: state.image.url.present,
  future: state.image.url.future,
})

export default connect(mapStateToProps)(History)
