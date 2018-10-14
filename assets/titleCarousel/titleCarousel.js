const titleCarouselWrapper = () => {

  const titleCarousel = document.getElementById('title-carousel');

  const elementBuilder = (elementType, elementId, appendTo, classes) => {
    const el = document.createElement(elementType);
    if(classes){
      el.classList.add(...classes);
    }
    el.id = elementId;
    appendTo.appendChild(el);
  }

  const titleSetter = (el, newTitle) => {
    el.innerHTML = newTitle;
  };

  const carouselBuilder = (titleArr, titleIndex) => {
    elementBuilder('p', 'left-arrow', titleCarousel, ['arrow','fas','fa-chevron-left']);
    elementBuilder('p', 'title', titleCarousel);
    elementBuilder('p', 'right-arrow', titleCarousel, ['arrow','fas','fa-chevron-right']);
    const title = document.getElementById('title');
    titleSetter(title, titleArr[titleIndex]);
  }

  const carouselEvents = (loops, titleIndex, titleArr) => {
    const title = document.getElementById('title');
    const leftArrow = document.getElementById('left-arrow');
    const rightArrow = document.getElementById('right-arrow');

    const arrowClick = (direction) => {
      return new CustomEvent('arrowClick', {
        bubbles: true,
        detail: { arrowDirection: direction }
      });
    }

    leftArrow.addEventListener('click', ()=>{
      if(titleIndex > 0){
        titleIndex--;
        titleSetter(title, titleArr[titleIndex]);
      }else{
        titleIndex = titleArr.length-1;
        titleSetter(title, titleArr[titleIndex]);
      }
      leftArrow.dispatchEvent(arrowClick('left'));
    });

    rightArrow.addEventListener('click', ()=>{
      if(titleIndex < titleArr.length-1){
        titleIndex++;
        titleSetter(title, titleArr[titleIndex]);
      }else{
        titleIndex = 0;
        titleSetter(title, titleArr[titleIndex]);
      }
      rightArrow.dispatchEvent(arrowClick('right'));
    });
  }

  const addTitleCarouselEvents = () => {
    titleCarousel.addEventListener('carouselInitialState', (event)=>{
      const {titleArr, loops} = event.detail;
      let titleIndex = event.detail.titleIndex;
      carouselBuilder(titleArr, titleIndex);
      carouselEvents(loops, titleIndex, titleArr);
    });
  }

  if(titleCarousel){
    addTitleCarouselEvents();
  }

};

document.addEventListener('DOMContentLoaded', titleCarouselWrapper, false);
