let dashboard = () => {
  const dashBody = document.getElementById('body');
  const calendar = document.getElementById('calendar');
  const titleCarousel = document.getElementById('title-carousel');
  const currentTime = new Date();
  const currentMonth = currentTime.getMonth();
  const monthsInYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September","October", "November", "December"];


  const monthChange = (direction) => {
    return new CustomEvent('monthChange', {
      bubbles: false,
      detail: { changeDirection: direction }
    });
  }

  const carouselInitialState = () => {
    return new CustomEvent('carouselInitialState', {
      bubbles: false,
      detail: {
        titleArr: monthsInYear,
        titleIndex: currentMonth,
        loops: true
      }
    });
  }

  titleCarousel.dispatchEvent(carouselInitialState());

  dashBody.addEventListener('arrowClick', function(event){
    calendar.dispatchEvent(monthChange(event.detail.arrowDirection));
  }, true);


  $.ajax({
    method: "GET",
    url: "http://localhost:3000/User",
    dataType: "json"
  }).then((response)=>{
    console.log('response', response);
  });


};

document.addEventListener('DOMContentLoaded', dashboard, false);
