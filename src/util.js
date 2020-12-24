export const throttle = (fun, delay) => {
  let last = 0
  return (...params) => {
    const now = +new Date()
    if (now - last > delay) {
      fun.apply(this, params)
      last = now
    }
  }
}

/**
 *
 * @param {*} dayjsDate dayjs对象
 */
export const formatMonthData = dayjsDate => {
  const currentMonthFirstDay = dayjsDate.startOf('month')
  // 然后当前日历的第一天就应该是月份第一天的当周周一
  const currentMonthStartDay = currentMonthFirstDay.startOf('week')
  const prevMonthFirstDay = currentMonthFirstDay.subtract(1, 'month')
  const prevMonthStartDay = prevMonthFirstDay.startOf('week')
  const nextMonthFirstDay = currentMonthFirstDay.add(1, 'month')
  const nextMonthStartDay = nextMonthFirstDay.startOf('week')
  return {
    currentMonthFirstDay,
    monthDates: [
      new Array(42).fill('').map((_, index) => prevMonthStartDay.add(index, 'day')),
      new Array(42).fill('').map((_, index) => currentMonthStartDay.add(index, 'day')),
      new Array(42).fill('').map((_, index) => nextMonthStartDay.add(index, 'day')),
    ],
  }
}

/**
 *
 * @param {*} dayjsDate dayjs对象
 */
export const formatWeekData = dayjsDate => {
  const currenWeekStartDay = dayjsDate.startOf('week')
  const prevWeekStartDay = currenWeekStartDay.subtract(1, 'week')
  const nextWeekStartDay = currenWeekStartDay.add(1, 'week')
  return {
    currenWeekFirstDay: currenWeekStartDay,
    weekDates: [
      new Array(7).fill('').map((_, index) => prevWeekStartDay.add(index, 'day')),
      new Array(7).fill('').map((_, index) => currenWeekStartDay.add(index, 'day')),
      new Array(7).fill('').map((_, index) => nextWeekStartDay.add(index, 'day')),
    ],
  }
}
