import React from 'react'
import {connect} from 'react-redux'
import Toolbar from './components/Toolbar'
import Picture from './components/Picture'
import ViewSettings from './components/ViewSettings'
import FilterList from './components/FilterList'
import History from './components/History'
import './App.css'

const App = (state) =>
  <div className="App">
    <Toolbar></Toolbar>
    <div className="wrapper">
      <ViewSettings/>
      <main>
        <Picture/>
        <History/>
      </main>
      <FilterList/>
    </div>
  </div>

const mapStateToProps = x => x
export default connect(mapStateToProps)(App)
