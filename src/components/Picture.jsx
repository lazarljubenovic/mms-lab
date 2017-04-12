import React from 'react'
import {connect} from 'react-redux'
import Histogram from './Histogram'
import './Picture.css'

const Picture = props =>
  <div className="Picture">
    <div className="main-picture-container">
      <img src={props.url} alt="current"/>
    </div>
    <div className="channels">
    {
      props.c && props.channels && props.channels.map((channel, i) =>
        <div key={i} className="channel">
          <img src={channel} alt="channel"/>
          {props.h && props.histograms && <Histogram {...props.histograms[i]}/>}
        </div>
      )
    }
    </div>
    <div className="downsamples">
    {
      props.d && props.downsamples && props.downsamples.urls && props.downsamples.urls.map((downsample, i) =>
        <div key={i} className="downsample">
          <img src={downsample} alt={`downsample, version ${i + 1}`}/>
          <a href={'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(props.downsamples.data[i]))} download>Download compressed</a>
        </div>
      )
    }
    </div>
  </div>

const mapStateToProps = state => ({
  url: state.image.url.present,
  c: state.image.showChannels,
  channels: state.image.channels,
  h: state.image.showHistograms,
  histograms: state.image.histograms,
  d: state.image.showDownsamples,
  downsamples: state.image.downsamples,
})

export default connect(mapStateToProps)(Picture)
