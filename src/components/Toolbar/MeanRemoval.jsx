import React from 'react'
import {reduxForm, Field} from 'redux-form'

export default reduxForm({form: 'mean-removal'})(({handleSubmit}) =>
  <form onSubmit={handleSubmit}>
    <label>
      <Field name="size" component="input" type="radio" value="3"/>
      <span>3</span>
    </label>
    <label>
      <Field name="size" component="input" type="radio" value="5"/>
      <span>5</span>
    </label>
    <label>
      <Field name="size" component="input" type="radio" value="7"/>
      <span>7</span>
    </label>
    <button type="submit">Mean Removal</button>
  </form>
)
