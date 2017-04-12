import React from 'react'
import {connect} from 'react-redux'
import * as action from '../store/actions'
import './ViewSettings.css'

const ViewSettings = props => {
  const toggleChannels = !props.visibleChannels ? props.displayChannels : props.hideChannels
  const toggleHistograms = !props.visibleHistograms ? props.displayHistograms : props.hideHistograms
  const toggleDownsamples = !props.visibleDownsamples ? props.displayDownsamples : props.hideDownsamples
  return (
    <aside className="ViewSettings">
      <button onClick={toggleChannels}>
        <i className="fa fa-th-large"></i>
      </button>
      <button onClick={toggleHistograms} disabled={!props.visibleChannels}>
        <i className="fa fa-bar-chart"></i>
      </button>
      <button onClick={toggleDownsamples}>
        <i className="fa fa-arrow-down"></i>
      </button>
    </aside>
  )
}

const mapStateToProps = state => ({
  visibleChannels: state.image.showChannels,
  visibleHistograms: state.image.showHistograms,
  visibleDownsamples: state.image.showDownsamples,
})

const mapDispatchToProps = dispatch => ({
  displayChannels: () => dispatch(action.showChannels()),
  hideChannels: () => dispatch(action.hideChannels()),
  displayHistograms: () => dispatch(action.showHistograms()),
  hideHistograms: () => dispatch(action.hideHistograms()),
  displayDownsamples: () => dispatch(action.showDownsamples()),
  hideDownsamples: () => dispatch(action.hideDownsamples()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewSettings)
