let dashboard = () => {
  const calendar = document.getElementById('calendar');
  const dashBody = document.getElementById('body');

  const monthChange = (direction) => {
    return new CustomEvent('monthChange', {
      bubbles: false,
      detail: { 'direction': direction }
    });
  }


  dashBody.addEventListener('arrowClick', function(){
    calendar.dispatchEvent(monthChange('left'));
  }, true);
};

document.addEventListener('DOMContentLoaded', dashboard, false);
