import React, { createRef, PureComponent } from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import 'normalize.css'
import { throttle, formatMonthData, formatWeekData } from './util'
import './monthView.less'

import leftArrow from './static/left-arrow.svg'
import rightArrow from './static/right-arrow.svg'

const head = ['日', '一', '二', '三', '四', '五', '六']

class MonthView extends PureComponent {
  state = {
    currentMonthFirstDay: null,
    monthDates: [], // 月日历需要展示的日期 包括前一月 当月 下一月
    currenWeekFirstDay: null,
    weekDates: [], // 周日李需要展示的日期  包括前一周 当周 下一周
    currentDate: '',
    touch: { x: 0, y: 0 },
    translateIndex: 0,
    calendarY: 0, // 于Y轴的位置
    showType: '',
  }

  isTouching = false

  calendarRef = createRef(null)

  static getDerivedStateFromProps(nextProps, prevState) {
    const { currentDate } = nextProps
    if (currentDate !== prevState.currentDate) {
      const dayjsDate = dayjs(currentDate)
      return {
        ...formatMonthData(dayjsDate),
        ...formatWeekData(dayjsDate),
        currentDate,
        showType: prevState.showType || nextProps.showType,
      }
    }
    return null
  }

  handleTouchMove = throttle(e => {
    e.stopPropagation()
    const moveX = e.touches[0].clientX - this.touchStartPositionX
    const moveY = e.touches[0].clientY - this.touchStartPositionY
    const calendarWidth = this.calendarRef.current.offsetWidth
    const calendarHeight = this.calendarRef.current.offsetHeight
    if (Math.abs(moveX) > Math.abs(moveY)) {
      // 左右滑动
      this.setState({ touch: { x: moveX / calendarWidth, y: 0 } })
    } else {
      // 上下滑动
      this.setState({ touch: { x: 0, y: moveY / calendarHeight } })
    }
    this.props.onTouchMove(e)
  }, 25)

  handleTouchStart = e => {
    e.stopPropagation()
    this.touchStartPositionX = e.touches[0].clientX
    this.touchStartPositionY = e.touches[0].clientY
    this.isTouching = true
    this.props.onTouchStart(e)
  }

  handleTouchEnd = e => {
    e.stopPropagation()
    const { showType } = this.state
    const calendarHeight = this.calendarRef.current.offsetHeight
    const { touch, translateIndex, currentMonthFirstDay, currenWeekFirstDay } = this.state
    this.f = false
    this.isTouching = false
    const absTouchX = Math.abs(touch.x)
    const absTouchY = Math.abs(touch.y)
    if (absTouchX > absTouchY && absTouchX > 0.15) {
      const isMonthView = showType === 'month'
      const newTranslateIndex = touch.x > 0 ? translateIndex + 1 : translateIndex - 1
      if (isMonthView) {
        // 月视图
        const nextMonthFirstDay = currentMonthFirstDay[touch.x > 0 ? 'subtract' : 'add'](1, 'month')
        this.setState(
          {
            translateIndex: newTranslateIndex,
            ...formatMonthData(nextMonthFirstDay),
          },
          this.props.onTouchEnd,
        )
      } else {
        // 周视图
        const nextWeekFirstDay = currenWeekFirstDay[touch.x > 0 ? 'subtract' : 'add'](1, 'week')
        this.setState(
          {
            translateIndex: newTranslateIndex,
            ...formatWeekData(nextWeekFirstDay),
          },
          this.props.onTouchEnd,
        )
      }
    } else if (absTouchY > absTouchX && Math.abs(touch.y * calendarHeight) > 50) {
      if (touch.y > 0 && showType === 'week') {
        this.setState({ showType: 'month' })
      } else if (touch.y < 0 && showType === 'month') {
        this.setState({ showType: 'week' })
      }
    }
    this.setState({ touch: { x: 0, y: 0 } })
  }

  handleMonthToggle = type => {
    const { currentMonthFirstDay, currenWeekFirstDay, showType } = this.state
    const isMonthView = showType === 'month'
    if (type === 'prev') {
      this.setState(
        isMonthView
          ? formatMonthData(currentMonthFirstDay.subtract(1, 'month'))
          : formatWeekData(currenWeekFirstDay.subtract(1, 'week')),
      )
    } else if (type === 'next') {
      this.setState(
        isMonthView
          ? formatMonthData(currentMonthFirstDay.add(1, 'month'))
          : formatWeekData(currenWeekFirstDay.add(1, 'week')),
      )
    }
  }

  handleDayClick = date => {
    this.props.onDateClick(date)
  }

  render() {
    const {
      monthDates,
      weekDates,
      touch,
      translateIndex,
      calendarY,
      currentMonthFirstDay,
      currenWeekFirstDay,
      showType,
    } = this.state
    const { currentDate, transitionDuration, markDates, markType } = this.props
    const isMonthView = showType === 'month'
    return (
      <div className="react-mobile-picker">
        <div className="calendar-operate">
          <div className="icon" onClick={this.handleMonthToggle.bind(this, 'prev')}>
            <img src={leftArrow} />
          </div>
          <div>{(isMonthView ? currentMonthFirstDay : currenWeekFirstDay).format('YYYY-MM')}</div>
          <div className="icon" onClick={this.handleMonthToggle.bind(this, 'next')}>
            <img src={rightArrow} />
          </div>
        </div>
        <div className="calendar-head">
          {head.map(i => (
            <div className="head-cell" key={i}>
              {i}
            </div>
          ))}
        </div>

        <div
          className={`calendar-body ${isMonthView ? '' : 'week-mode'}`}
          ref={this.calendarRef}
          onTouchStart={this.handleTouchStart}
          onTouchMove={this.handleTouchMove}
          onTouchEnd={this.handleTouchEnd}
        >
          <div
            style={{
              transform: `translate3d(${-translateIndex * 100}%, 0, 0)`,
            }}
          >
            {(isMonthView ? monthDates : weekDates).map((item, index) => {
              return (
                <div
                  className="month-cell"
                  key={`month-cell-${index}`}
                  style={{
                    transform: `translate3d(${
                      (index - 1 + translateIndex + (this.isTouching ? touch.x : 0)) * 100
                    }%, ${calendarY}px, 0)`,
                    transitionDuration: `${this.isTouching ? 0 : transitionDuration}s`,
                  }}
                >
                  {item.map((date, itemIndex) => {
                    const isCurrentDay = date.isSame(currentDate, 'day')
                    const isOtherMonthDay = !date.isSame(currentMonthFirstDay, 'month')
                    const isMarkDate = markDates.find(i => date.isSame(i.date, 'day'))
                    const resetMarkType = (isMarkDate && isMarkDate.markType) || markType
                    const showDotMark = isMarkDate && resetMarkType === 'dot'
                    const showCircleMark = isMarkDate && resetMarkType === 'circle'
                    return (
                      <div
                        key={itemIndex}
                        className={`day-cell ${isOtherMonthDay ? 'is-other-month-day' : ''}`}
                        onClick={this.handleDayClick.bind(this, date)}
                      >
                        <div
                          className={`day-text ${isCurrentDay ? 'current-day' : ''} ${
                            showCircleMark ? 'circle-mark' : ''
                          }`}
                          style={
                            showCircleMark ? { borderColor: isMarkDate.color || '#f00' } : null
                          }
                        >
                          {date.format('DD')}
                        </div>
                        {showDotMark && (
                          <div
                            className={isMarkDate ? 'dot-mark' : ''}
                            style={{ background: isMarkDate.color || '#f00' }}
                          />
                        )}
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

MonthView.propTypes = {
  currentDate: PropTypes.string,
  showType: PropTypes.oneOf(['week', 'month']),
  transitionDuration: PropTypes.number,
  onDateClick: PropTypes.func,
  onTouchStart: PropTypes.func,
  onTouchMove: PropTypes.func,
  onTouchEnd: PropTypes.func,
  markType: PropTypes.oneOf(['dot', 'circle']),
  markDates: PropTypes.array,
}

MonthView.defaultProps = {
  currentDate: dayjs().format('YYYY-MM-DD'),
  showType: 'month',
  transitionDuration: 0.3,
  onDateClick: () => {},
  onTouchStart: () => {},
  onTouchMove: () => {},
  onTouchEnd: () => {},
  markType: 'dot',
  markDates: [],
}

export default MonthView
