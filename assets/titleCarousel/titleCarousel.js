let titleCarouselWrapper = () => {
  let titleCarousel = document.getElementById('title-carousel');

  const elementBuilder = (elementType, elementId, appendTo, classes) => {
    const el = document.createElement(elementType);
    if(classes){
      el.classList.add(...classes);
    }
    el.id = elementId;
    appendTo.appendChild(el);
  }

  elementBuilder('p', 'left-arrow', titleCarousel, ['arrow','fas','fa-chevron-left']);
  elementBuilder('p', 'title', titleCarousel);
  elementBuilder('p', 'right-arrow', titleCarousel, ['arrow','fas','fa-chevron-right']);

  let title = document.getElementById('title');
  let titleSetter = (newTitle) => {
    title.innerHTML = newTitle;
  };

  let titleArr = JSON.parse(titleCarousel.getAttribute('title-arr'));
  let leftArrow = document.getElementById('left-arrow');
  let rightArrow = document.getElementById('right-arrow');
  let titleIndex = Number(titleCarousel.getAttribute('title-starting-index'));

  titleSetter(titleArr[titleIndex]);

  const arrowClick = (direction) => {
    return new CustomEvent('arrowClick', {
      bubbles: true,
      detail: { arrowDirection: direction }
    });
  }

  leftArrow.addEventListener('click', ()=>{
    if(titleIndex > 0){
      titleIndex--;
      titleSetter(titleArr[titleIndex]);
    }
    leftArrow.dispatchEvent(arrowClick('left'));
  });

  rightArrow.addEventListener('click', ()=>{
    if(titleIndex < titleArr.length-1){
      titleIndex++;
      titleSetter(titleArr[titleIndex]);
    }
    rightArrow.dispatchEvent(arrowClick('right'));
  });
};

document.addEventListener('DOMContentLoaded', titleCarouselWrapper, false);
