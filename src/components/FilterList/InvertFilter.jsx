import React from 'react'
import {reduxForm} from 'redux-form'

export default reduxForm({form: 'invert-filter'})(({handleSubmit}) =>
  <form onSubmit={handleSubmit}>
    <h1>Invert</h1>
    <summary>Invert each pixel of the image.</summary>
    <button type="submit">Apply</button>
  </form>
)
