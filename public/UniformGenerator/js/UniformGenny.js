window.onload = function () {
  console.log("SAUSAGE")
  // Get the Object by ID
  var a = document.getElementById("product-svg");

  // Get the SVG document inside the Object tag
  var svgDoc = a.contentDocument;

  // Get one of the SVG items by ID;
  const svgItem = svgDoc.getElementById("product-shape");

  // Set the colour to something else
  /*svgItem.setAttribute("fill", "#00FF00");
  console.log("ROLLS")*/

  // Event listeners
  var el = document.getElementsByClassName("color");
  for (var i = 0; i < el.length; i++) {
    el[i].onclick = changeColor;
  }

  // Colour picker
  const selectElement = document.querySelector('#color-tunic');

  selectElement.addEventListener('change', (event) => {
    svgItem.setAttribute("fill", `${event.target.value}`);
  });

  // Colour changer
  function changeColor(e) {
    // get the hex color
    let hex = e.target.getAttribute("data-hex");
    // set the hex color
    svgItem.setAttribute("fill", hex);
  }

};