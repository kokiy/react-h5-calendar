## 日历组件

演示:

```jsx
import dayjs from 'dayjs'
import React, { Component } from 'react'
import { Calendar } from 'react-h5-calendar'

export default class Demo extends Component {
  state = {
    currentDate: dayjs().format('YYYY-MM-DD'),
  }
  render() {
    return (
      <Calendar
        onDateClick={date => this.setState({ currentDate: date.format('YYYY-MM-DD') })}
        showType={'month'}
        markDates={[
          { date: '2020-12-12', markType: 'circle' },
          { markType: 'dot', date: '2020-12-23' },
          { markType: 'circle', date: '2020-12-22' },
          { date: '2021-1-22' },
        ]}
        markType="dot"
        currentDate={this.state.currentDate}
        onTouchEnd={(a, b) => console.log(a, b)}
        disableWeekView={false}
      />
    )
  }
}
```
