# react-h5-calendar

[简体中文](https://github.com/kokiy/react-h5-calendar/blob/main/README.md) | English

###

Build a small wheel, the core file is less than 300 lines, a react-based mobile , h5 calendar display component

### demo

![demo](./demo.gif)

### Scan the QR code to view the demo directly

![demo](./qrcode.png)

### Open the browser directly to view https://kokiy.github.io/react-h5-calendar/

### react Mobile calendar component

1. Support week view, week calendar
2. Support month view, month calendar
3. Support sliding left and right to switch months
4. Support sliding up and down to switch calendar view
5. Support dot mark on the calendar
6. This project is based on[dumi](https://github.com/umijs/dumi) build & deploy
7. based on[dayjs](https://github.com/iamkun/dayjs)Processing calendar logic

### Install

`yarn add react-h5-calendar`

```js
import { MobileCalendar } from 'react-h5-calendar'
export default class Demo extends Component {
  render() {
    return (
      <MobileCalendar
        onDateClick={date => this.setState({ currentDate: date.format('YYYY-MM-DD') })}
        currentDate={'2020-12-12'}
      />
    )
  }
}
```

### Settings

| parameter            | description                                  | default    |
| :------------------- | :------------------------------------------- | :--------- |
| `currentDate`        | Currently selected date eg:`2020-12-12`      | 'today'    |
| `showType`           | display type`month` & `week`                 | `month`    |
| `transitionDuration` | Animation transition time for switching date | `0.3`      |
| `onDateClick`        | Date click callback                          | `() => {}` |
| `onTouchStart`       | Swipe to start callback                      | `() => {}` |
| `onTouchMove`        | Callback during sliding                      | `() => {}` |
| `onTouchEnd`         | Sliding end callback                         | `() => {}` |
| `markType`           | Mark type `dot`&`circle`                     | `dot`      |
| `markDates`          | Array of dates to be marked                  | `[]`       |

### `markDates` Parameter Description

```js
const markDates = [
  { color: '#459', date: '2020-12-12', markType: 'circle' },
  { color: '#a8f', markType: 'dot', date: '2020-12-23' },
  { color: '#a5f', markType: 'circle', date: '2020-12-22' },
  { date: '2021-1-22' },
]
```

1.  If the date is not passed `markType`, the passed `Marktype` will be taken by default
2.  Single date does not pass `color` The default is `#f00`
