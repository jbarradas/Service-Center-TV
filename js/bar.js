
function move() {
  var elem = document.getElementById("spanMeter");   
  var maxWidth = document.getElementById("bar-percentage").getAttribute('data-percentage');
  console.log(maxWidth);
  var id = setInterval(frame, 30);
  var initialWidth = 0;
  
  function frame() {
    if (initialWidth >= maxWidth) {
      clearInterval(id);
    } else {
      initialWidth++; 
      elem.style.width = initialWidth + '%'; 
      document.getElementById("bar-percentage").innerHTML = initialWidth + '%';
    }
  }
}

move();