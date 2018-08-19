let fn = ()=>{
  let minus = document.getElementsByClassName('minus');

  for (let i = 0; i < minus.length; i++) {
    let e = document.createElement('p');
    e.innerHTML = '-';
    minus[i].appendChild(e);
  }

};

document.addEventListener('DOMContentLoaded', fn, false);
