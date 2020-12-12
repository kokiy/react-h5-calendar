import dayjs from 'dayjs'
import React, { Component } from 'react'
import { render } from 'react-dom'
import { MobileCalendar } from '../../src/index'

export default class Demo extends Component {
  state = {
    currentDate: dayjs().format('YYYY-MM-DD'),
  }
  render() {
    return (
      <MobileCalendar
        onDateClick={date => this.setState({ currentDate: date.format('YYYY-MM-DD') })}
        showType={'month'}
        markDates={[
          { color: '#459', date: '2020-12-12', markType: 'circle' },
          { color: '#a8f', markType: 'dot', date: '2020-12-23' },
          { color: '#a5f', markType: 'circle', date: '2020-12-22' },
          { date: '2021-1-22' },
        ]}
        markType="dot"
        currentDate={this.state.currentDate}
      />
    )
  }
}
render(<Demo />, document.querySelector('#demo'))
