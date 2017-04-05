import React from 'react'
import {Field, reduxForm} from 'redux-form'

export default reduxForm({form: 'time-wrap'})(({handleSubmit}) =>
  <form onSubmit={handleSubmit}>
    <Field name="factor" component="input" type="number"/>
    <button type="submit">Time Wrap</button>
  </form>
)
