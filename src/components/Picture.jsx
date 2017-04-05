import React from 'react'
import {connect} from 'react-redux'
import Histogram from './Histogram'
import './Picture.css'

const Picture = props =>
  <div className="Picture">
    <div>
      <img src={props.url} alt="current"/>
    </div>
    {
      props.c && props.channels && props.channels.map((channel, i) =>
        <div key={i}>
          <img src={channel} alt="channel"/>
          {props.h && props.histograms && <Histogram {...props.histograms[i]}/>}
        </div>
      )
    }
  </div>

const mapStateToProps = state => ({
  url: state.image.url.present,
  c: state.image.showChannels,
  channels: state.image.channels,
  h: state.image.showHistograms,
  histograms: state.image.histograms,
})

export default connect(mapStateToProps)(Picture)
