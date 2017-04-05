import React from 'react'
import {connect} from 'react-redux'
import Toolbar from './components/Toolbar/index'
import Picture from './components/Picture'

const App = (state) =>
  <div>
    <Toolbar></Toolbar>
    <main>
      <Picture></Picture>
    </main>
    {/*<pre>Test: {String(JSON.stringify(state, null, 2))}</pre>*/}
  </div>

const mapStateToProps = x => x
export default connect(mapStateToProps)(App)
