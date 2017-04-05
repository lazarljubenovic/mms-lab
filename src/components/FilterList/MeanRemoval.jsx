import React from 'react'
import {reduxForm, Field} from 'redux-form'

export default reduxForm({form: 'mean-removal'})(({handleSubmit}) =>
  <form onSubmit={handleSubmit}>
    <h1>Mean Removal</h1>
    <summary>Apply convolution matrix of given size.</summary>
    <div>
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
    </div>
    <button type="submit">Apply</button>
  </form>
)
