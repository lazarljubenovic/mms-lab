import React from 'react'
import {connect} from 'react-redux'
import * as action from '../store/actions'
import './Toolbar.css'

const Toolbar = props =>
  <header>
    <button onClick={props.undo} disabled={!props.canUndo}>
      <i className="fa fa-undo"></i>
      <span>Undo</span>
    </button>
    <button onClick={props.redo} disabled={!props.canRedo}>
      <i className="fa fa-repeat"></i>
      <span>Redo</span>
    </button>
  </header>

const mapStateToProps = state => ({
  canUndo: state.image.url.past.length > 0,
  canRedo: state.image.url.future.length > 0,
})

const mapDispatchToProps = dispatch => ({
  undo: () => dispatch(action.undo()),
  redo: () => dispatch(action.redo()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar)
