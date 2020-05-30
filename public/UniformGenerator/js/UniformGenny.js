
window.onload = function () {
  // Entry-point
  const tunicBase = loadSvgFromFile("element-tunic-base");
  const tunicBelt = loadSvgFromFile("element-tunic-belt");
  const tunicBuckle = loadSvgFromFile("element-tunic-buckle");
  const tunicJacketButtons = loadSvgFromFile("element-tunic-jacketbuttons");
  const tunicPocketButtons = loadSvgFromFile("element-tunic-pocketbuttons");
  const tunicEpauletteButtons = loadSvgFromFile("element-tunic-epaulettebuttons");
  const tunicTie = loadSvgFromFile("element-tunic-tie");
  const tunicUndershirt = loadSvgFromFile("element-tunic-undershirt");

  const trouserBase = loadSvgFromFile("element-trousers-base");
  const trouserStripe = loadSvgFromFile("element-trousers-stripes");

  registerElements();
  setDefaultValues();

  function registerElements() {
    console.log("Registering elements");

    var colourTunicBase = document.querySelector('#colour-tunic-base');
    colourTunicBase.addEventListener('change', onColourPickerChange);

    var colourTunicBelt = document.querySelector('#colour-tunic-belt');
    colourTunicBelt.addEventListener('change', onColourPickerChange);

    var colourTunicBuckle = document.querySelector('#colour-tunic-buckle');
    colourTunicBuckle.addEventListener('change', onColourPickerChange);

    var colourTunicJacketButtons = document.querySelector('#colour-tunic-jacketbuttons');
    colourTunicJacketButtons.addEventListener('change', onColourPickerChange);

    var colourTunicPocketButtons = document.querySelector('#colour-tunic-pocketbuttons');
    colourTunicPocketButtons.addEventListener('change', onColourPickerChange);

    var colourTunicEpauletteButtons = document.querySelector('#colour-tunic-epaulettebuttons');
    colourTunicEpauletteButtons.addEventListener('change', onColourPickerChange);

    var colourTunicTie = document.querySelector('#colour-tunic-tie');
    colourTunicTie.addEventListener('change', onColourPickerChange);

    var colourTunicUndershirt = document.querySelector('#colour-tunic-undershirt');
    colourTunicUndershirt.addEventListener('change', onColourPickerChange);

    var colourTrouserBase = document.querySelector('#colour-trousers-base');
    colourTrouserBase.addEventListener('change', onColourPickerChange);

    var colourTrouserStripe = document.querySelector('#colour-trousers-stripes');
    colourTrouserStripe.addEventListener('change', onColourPickerChange);
  }

  function setDefaultValues() {
    console.log("Setting default values")

    // Set query selectors
    document.querySelector('#colour-tunic-base').value = "#696969";
    document.querySelector('#colour-tunic-belt').value = "#E3E3E3";
    document.querySelector('#colour-tunic-buckle').value = "#B88E19";
    document.querySelector('#colour-tunic-jacketbuttons').value = "#B88E19";
    document.querySelector('#colour-tunic-pocketbuttons').value = "#B88E19";
    document.querySelector('#colour-tunic-epaulettebuttons').value = "#B88E19";
    document.querySelector('#colour-tunic-tie').value = "#6B6B6B";
    document.querySelector('#colour-tunic-undershirt').value = "#F0F0F0";

    document.querySelector('#colour-trousers-base').value = "#696969";
    document.querySelector('#colour-trousers-stripes').value = "#F0F0F0";

    // Set actual values
    for (var i = 0; i < tunicBase.length; i++) {
      tunicBase[i].setAttribute("fill", "#696969")
    }

    for (var i = 0; i < tunicBelt.length; i++) {
      tunicBelt[i].setAttribute("fill", "#E3E3E3")
    }

    for (var i = 0; i < tunicBuckle.length; i++) {
      tunicBuckle[i].setAttribute("fill", "#B88E19")
    }

    for (var i = 0; i < tunicJacketButtons.length; i++) {
      tunicJacketButtons[i].setAttribute("fill", "#B88E19")
    }

    for (var i = 0; i < tunicPocketButtons.length; i++) {
      tunicPocketButtons[i].setAttribute("fill", "#B88E19")
    }

    for (var i = 0; i < tunicEpauletteButtons.length; i++) {
      tunicEpauletteButtons[i].setAttribute("fill", "#B88E19")
    }

    for (var i = 0; i < tunicTie.length; i++) {
      tunicTie[i].setAttribute("fill", "#6B6B6B")
    }

    for (var i = 0; i < tunicUndershirt.length; i++) {
      tunicUndershirt[i].setAttribute("fill", "#F0F0F0")
    }

    for (var i = 0; i < trouserBase.length; i++) {
      trouserBase[i].setAttribute("fill", "#696969")
    }

    for (var i = 0; i < trouserStripe.length; i++) {
      trouserStripe[i].setAttribute("fill", "#F0F0F0")
    }
  }

  function loadSvgFromFile(elementName) {
    var svgElement = document.getElementById(elementName);
    var svgDocument = svgElement.contentDocument;
    //return svgDocument.getElementById(elementName + "-path");
    return svgDocument.querySelectorAll('[id=' + elementName + '-path]');
  }

  function onColourPickerChange(event) {
    console.log("Colour picker has changed: " + event.target.id);

    var matchingElements = null;

    switch (event.target.id) {
      // Tunic
      case "colour-tunic-base":
        matchingElements = tunicBase;
        break;
      case "colour-tunic-belt":
        matchingElements = tunicBelt;
        break;
      case "colour-tunic-buckle":
        matchingElements = tunicBuckle;
        break;
      case "colour-tunic-jacketbuttons":
        matchingElements = tunicJacketButtons;
        break;
      case "colour-tunic-pocketbuttons":
        matchingElements = tunicPocketButtons;
        break;
      case "colour-tunic-epaulettebuttons":
        matchingElements = tunicEpauletteButtons;
        break;
      case "colour-tunic-tie":
        matchingElements = tunicTie;
        break;
      case "colour-tunic-undershirt":
        matchingElements = tunicUndershirt;
        break;

      // Trousers
      case "colour-trousers-base":
        matchingElements = trouserBase;
        break;
      case "colour-trousers-stripes":
        matchingElements = trouserStripe;
        break;

      // Default catch
      default:
        console.log("Tried to set an unknown colour picker");
        break;
    }

    // Set
    if (matchingElements != null) {
      for (var i = 0; i < matchingElements.length; i++) {
        matchingElements[i].setAttribute("fill", `${event.target.value}`)
      }
    }
  }
}