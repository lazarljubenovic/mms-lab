import React from 'react'
import {Field, reduxForm} from 'redux-form'

export default reduxForm({form: 'color-filter'})(({handleSubmit}) =>
  <form onSubmit={handleSubmit}>
    <h1>Color</h1>
    <summary>Adjusts each RGB component separately.</summary>
    <div>
      <Field name="r" component="input" type="number" min="-255" max="255"/>
      <Field name="g" component="input" type="number" min="-255" max="255"/>
      <Field name="b" component="input" type="number" min="-255" max="255"/>
    </div>
    <button type="submit">Apply</button>
  </form>
)
