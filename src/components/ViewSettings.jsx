import React from 'react'
import {connect} from 'react-redux'
import * as action from '../store/actions'
import './ViewSettings.css'

const ViewSettings = props => {
  const toggleChannels = !props.visibleChannels ? props.displayChannels : props.hideChannels
  const toggleHistograms = !props.visibleHistograms ? props.displayHistograms : props.hideHistograms
  console.log(props, toggleChannels, toggleHistograms)
  return (
    <aside className="ViewSettings">
      <button onClick={toggleChannels}>
        <i className="fa fa-th-large"></i>
      </button>
      <button onClick={toggleHistograms} disabled={!props.visibleChannels}>
        <i className="fa fa-bar-chart"></i>
      </button>
    </aside>
  )
}

const mapStateToProps = state => ({
  visibleChannels: state.image.showChannels,
  visibleHistograms: state.image.showHistograms,
})

const mapDispatchToProps = dispatch => ({
  displayChannels: () => dispatch(action.showChannels()),
  hideChannels: () => dispatch(action.hideChannels()),
  displayHistograms: () => dispatch(action.showHistograms()),
  hideHistograms: () => dispatch(action.hideHistograms()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewSettings)
