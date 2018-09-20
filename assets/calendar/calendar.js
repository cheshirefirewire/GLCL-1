let calendar = () => {

  let firstDay = (year, month) => {
    return new Date(year, month - 1, 1).getDay();
  }

  let lastDay = (year, month) => {
    return new Date(year, month, 0).getDate();
  }

  // Return today's date and time
  const currentTime = new Date()
  // returns the month (from 0 to 11)
  const currentMonth = currentTime.getMonth() + 1;
  // returns the day of the month (from 1 to 31)
  const currentDay = currentTime.getDate();
  // returns the year (four digits)
  const currentYear = currentTime.getFullYear();

  const daysOfTheWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const calendarHead = document.getElementById('calendar-head');
  const populateCalendarHead = () => {
    for(let i = 0; i<daysOfTheWeek.length; i++){
      let day = document.createElement('p');
      day.innerHTML = daysOfTheWeek[i];
      calendarHead.appendChild(day);
    }
  }
  populateCalendarHead();

  const lastMonth = (year, month, dayOfWeek) => {
    let previousMonth = month-1;
    const daysInPreviousMonth = (y, p) => {
      let previousMonthArr = [];
      let ld = lastDay(y,p);
      console.log('ld', ld);
      let i = 0;
      while(i < dayOfWeek){
        previousMonthArr.push(ld);
        ld--;
        i++;
      }
      return previousMonthArr;
    };
    if(previousMonth<1){
      previousMonth = 12;
      // console.log('daysInPreviousMonth(previousMonth, year);', daysInPreviousMonth(previousMonth, year-1));
      return daysInPreviousMonth(year-1, previousMonth);
    }else{
      // console.log('daysInPreviousMonth(previousMonth, year);', daysInPreviousMonth(previousMonth, year));
      return daysInPreviousMonth(year, previousMonth);
    }
  }

  const calendarBody = document.getElementById('calendar-body');
  const populateCalendarBody = () => {
    const currentDaysInMonth = lastDay(currentYear, currentMonth);
    const firstDayOfMonth = firstDay(currentYear, currentMonth);
    const lastMonthArr = lastMonth(currentYear, currentMonth, firstDayOfMonth);
    const daysInRow = 7;
    const totalRows = 6;
    let currentRows = 0;
    let currentDayOfMonthIndex = 1; //current day of current month
    let currentCalendarDayIndex = 0; //current index of days on calendar
    let lmaIndex = firstDayOfMonth-1;

    while(currentRows < totalRows){
      const calendarRow = document.createElement('div');
      for(let i = 0; i<daysInRow; i++){
        const day = document.createElement('p');
        //This if condition says "add a certain number of days to the beginning of the month from the previous"
        if(currentCalendarDayIndex<firstDayOfMonth){
          day.innerHTML = lastMonthArr[lmaIndex];
          day.classList.add('grayedOut');
          lmaIndex--;
        }
        //This if condition says "start adding days to the calendar, if the first weekday of the month has been reached"
        if(currentCalendarDayIndex>=firstDayOfMonth && currentDayOfMonthIndex <= currentDaysInMonth){
          day.innerHTML = currentDayOfMonthIndex;
          currentDayOfMonthIndex++;
        }
        // //This if condition says "add a certain number to the end of the month from the next"
        // if(currentCalendarDayIndex<firstDayOfMonth){
        //   day.innerHTML = 0;
        // }
        currentCalendarDayIndex++;
        calendarRow.appendChild(day);
      }
      calendarBody
      .appendChild(calendarRow)
      .className = "calendar-row";
      currentRows++;
    }
  }
  populateCalendarBody();
};

document.addEventListener('DOMContentLoaded', calendar, false);
