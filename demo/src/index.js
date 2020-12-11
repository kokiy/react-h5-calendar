import React, { Component } from 'react'
import { render } from 'react-dom'

import { MonthView } from '../../src/index'

export default class Demo extends Component {
  render() {
    return <MonthView currentDate={'2020-11-23'} />
  }
}

render(<Demo />, document.querySelector('#demo'))
