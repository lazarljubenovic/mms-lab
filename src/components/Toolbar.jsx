import React from 'react'
import {connect} from 'react-redux'
import * as action from '../store/actions'
import './Toolbar.css'

const Toolbar = props =>
  <header>
    <button onClick={props.load}>
      <i className="fa fa-folder-o"></i>
      <span>Load</span>
    </button>
    <a href={props.url} download>
      <i className="fa fa-floppy-o"></i>
      <span>Save</span>
    </a>
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
  url: state.image.url.present,
})

const mapDispatchToProps = dispatch => ({
  undo: () => dispatch(action.undo()),
  redo: () => dispatch(action.redo()),
  load: () => dispatch(action.receive(window.prompt())),
})

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar)
