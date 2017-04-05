import React from 'react'
import {connect} from 'react-redux'
import * as action from '../../store/actions'
import InvertFilter from './InvertFilter'
import ColorFilter from './ColorFilter'
import MeanRemoval from './MeanRemoval'
import TimeWrap from './TimeWrap'
import EdgeDetect from './EdgeDetect'
import './FilterList.css'

const FilterList = props =>
  <aside className="FilterList">
    <InvertFilter onSubmit={props.invert}/>
    <ColorFilter initialValues={{r: 127, g: -127, b: 0}} onSubmit={props.color}/>
    <MeanRemoval initialValues={{size: "3"}} onSubmit={props.meanRemoval}/>
    <EdgeDetect onSubmit={props.edgeDetectHomogenity}/>
    <TimeWrap initialValues={{factor: 15}} onSubmit={props.timeWrap}/>
  </aside>

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
  invert: () => dispatch(action.invert()),
  color: options => dispatch(action.color(options)),
  meanRemoval: options => dispatch(action.meanRemoval(options)),
  edgeDetectHomogenity: () => dispatch(action.edgeDetectHomogenity()),
  timeWrap: options => dispatch(action.timeWrap(options)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FilterList)
