let tracker = () => {

  let {user,practiceSessions} = {};

  const getUser = () => {
    $.ajax({
      method: "GET",
      url: "http://localhost:3000/user",
      dataType: "json"
    }).then((response)=>{
      console.log('User', response);
      user = response;
    });
  }

  const getPracticeSessions = () => {
    $.ajax({
      method: "GET",
      url: "http://localhost:3000/practiceSessions",
      dataType: "json"
    }).then((response)=>{
      console.log('practiceSessions', response);
      practiceSessions = response;
    });
  }
  getPracticeSessions();
  getUser();

  // https://stackoverflow.com/a/15764763/5885911
  const getFormattedDate = (date) => {
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return month + '/' + day + '/' + year;
  }

  // {
  //  "date": "mm/dd/yyyy",
  //  "timePracticed": 90,
  //  "goalMet": true
  // }

  const updateTime = (currentTotalTime) => {

    let method = '';
    const url = () => {
      if(practiceSessions.length && getFormattedDate(new Date()) === practiceSessions[practiceSessions.length-1].date){
        method = "PUT";
        return "http://localhost:3000/practiceSessions/" + practiceSessions[practiceSessions.length-1].id;
      }
      method = "POST";
      return "http://localhost:3000/practiceSessions/";
    };

    let dataForPassing = {};
    dataForPassing['date'] = getFormattedDate(new Date());
    dataForPassing['timePracticed'] = currentTotalTime;
    dataForPassing['goalMet'] = currentTotalTime >= user.goal;
    $.ajax({
      method: method,
      url: url(),
      dataType: "json",
      data: JSON.stringify(dataForPassing),
      contentType: 'application/json',
      success: function(data){
        console.log('data', data);
        getPracticeSessions();
      },
      error: function(error){
        console.log('dataForPassing error', dataForPassing);
        console.log('error', error);
      }
    });

  }














  let counter = document.getElementById('counter');
  let totalTime = 0;
  const timeInADay = 1440;
  const plusMinusEventCreator = (id, plus, increment) => {
    let el = document.getElementById(id);
    el.addEventListener('click', () => {
      if (plus === true) {
        if(totalTime < timeInADay){
          totalTime += increment;
        }else{
          totalTime = timeInADay;
        }
      } else if (plus === false) {
        if(totalTime >= increment){
          totalTime -= increment;
        }else{
          totalTime = 0;
        }
      }
      counter.innerHTML = totalTime;
      updateTime(totalTime);
    });
  };
  // plus 5
  plusMinusEventCreator('plus-5', true, 5);
  // minus 5
  plusMinusEventCreator('minus-5', false, 5);
  // plus 15
  plusMinusEventCreator('plus-15', true, 15);
  // minus 15
  plusMinusEventCreator('minus-15', false, 15);
};

document.addEventListener('DOMContentLoaded', tracker, false);
