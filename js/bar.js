
function move() {
  var bar = document.getElementById("spanMeter");
  var value = document.getElementById("bar-percentage"); 
  var maxWidth = value.getAttribute('data-percentage');
  var id = setInterval(frame, 50);
  var initialWidth = 0;
  
  switch(maxWidth){
    case '10':
      bar.className += " percent10";
      break;
    case '20':
    bar.className += " percent20";
      break;
    case '30':
    bar.className += " percent30";
      break;
    case '40':
    bar.className += " percent40";
      break;
    case '50':
    bar.className += " percent50";
      break;
    case '60':
    bar.className += " percent60";
      break;
    case '70':
    bar.className += " percent70";
      break;
    case '80':
    bar.className += " percent80";
      break;
    case '90':
    bar.className += " percent90";
      break;
    case '100':
    bar.className += " percent100";
      break;
      default:break;
  }


  function frame() {
    if (initialWidth >= maxWidth) {
      clearInterval(id);
    } else {
      initialWidth++; 
      bar.style.width = initialWidth + '%'; 
      value.innerHTML = initialWidth + '%';
    }
  }
}

move();