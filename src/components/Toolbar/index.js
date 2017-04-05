import React from 'react'
import {connect} from 'react-redux'
import * as action from '../../store/actions'
import ColorFilter from './ColorFilter'
import MeanRemoval from './MeanRemoval'
import TimeWrap from './TimeWrap'

const Toolbar = props =>
  <div>
    <button onClick={props.undo} disabled={!props.canUndo}>Undo</button>
    <button onClick={props.redo} disabled={!props.canRedo}>Redo</button>

    <button onClick={props.invert}>Invert</button>
    <ColorFilter initialValues={{r: 127, g: -127, b: 0}} onSubmit={props.color}/>
    <MeanRemoval initialValues={{size: "3"}} onSubmit={props.meanRemoval}/>
    <button onClick={props.edgeDetectHomogenity}>Edge Detect</button>
    <TimeWrap initialValues={{factor: 15}} onSubmit={props.timeWrap}/>

    <button onClick={props.showChannels}>Show Channels</button>
    <button onClick={props.showHistograms}>Show Histograms</button>
  </div>

const mapStateToProps = state => ({
  canUndo: state.image.url.past.length > 0,
  canRedo: state.image.url.future.length > 0,
})

const mapDispatchToProps = dispatch => ({
  undo: () => dispatch(action.undo()),
  redo: () => dispatch(action.redo()),
  invert: () => dispatch(action.invert()),
  color: options => dispatch(action.color(options)),
  meanRemoval: options => dispatch(action.meanRemoval(options)),
  edgeDetectHomogenity: () => dispatch(action.edgeDetectHomogenity()),
  timeWrap: options => dispatch(action.timeWrap(options)),
  showChannels: () => dispatch(action.showChannels()),
  showHistograms: () => dispatch(action.showHistograms()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar)
