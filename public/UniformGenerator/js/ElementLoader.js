const elementList = [
    "img/Headgear/visor/saddle/",
    "img/Headgear/pith/pickelhaube/",

    "img/Tops/tunic/Type1/"
]

const rootUrl = "http://localhost:8000/UniformGenerator/"
const HeadgearTabPane = "#nav-element-Headgear";

function loadElements() {
    console.log("Starting to load elements");
    elementList.forEach(loadElement);

    registerEventHandlers();
}

function registerEventHandlers() {
    var tunicSelect = document.querySelector('#Tops-select');
    tunicSelect.addEventListener('change', onSelectValueChanged);

    var headgearSelect = document.querySelector('#Headgear-select');
    headgearSelect.addEventListener('change', onSelectValueChanged);
}

function loadElement(item, index) {
    var elementUrl = rootUrl + item;

    $.getJSON(elementUrl + "config.json")
        .done(function (data) {
            /*switch (data.category) {
                case "Headgear":
                    loadHeadgear(data, index, elementUrl);
                    break;
                default:
                    console.log("Ooopsie doodle! Category config for " + item + " is invalid.");
                    break;
            }*/
            loadElementFromData(data, index, elementUrl);
        })
        .fail(function (jqhxr, textStatus, error) {
            console.log("Ooopsie doodle! An element has bad/missing config file! -> " + textStatus + ": " + error + " (" + elementUrl + ")");
        });
}

function loadElementFromData(jsonConfig, index, elementUrl) {
    var zindex = 9000 + index; // '9001', etc
    var elementDivId = 'element-' + jsonConfig.category + '-' + jsonConfig.type + '-' + jsonConfig.subtype;
    var elementOptionsDivId = elementDivId + '-options';
    var elementVariationPath = elementUrl + jsonConfig.basevariations["default"];
    var elementReadableName = jsonConfig.subtype + " " + jsonConfig.type;

    // Create the base for the element.
    $('#elements-container').prepend(
        '<div id="' + elementDivId + '">' +
        '   <img class="element-base-image" src="' + elementVariationPath + '" alt="' + elementReadableName + '" style="z-index:' + zindex + ';">' +
        '</div>'
    );

    // Next create the interface
    $('#' + jsonConfig.category + '-select').append(
        '<option value="' + elementDivId + '">' + elementReadableName + '</option>'
    );

    // Create the options ui
    $('#' + jsonConfig.category + '-options').append(
        '<div id="' + elementOptionsDivId + '"></div>'
    );

    // Next, load in the components and populate options ui
    for (i = 0; i < jsonConfig.components.length; i++) {
        var componentOptionsDivId = elementOptionsDivId + '-' + jsonConfig.components[i].name;
        var componentUrl = elementUrl + jsonConfig.components[i].path;
        var componentId = elementDivId + '-' + jsonConfig.components[i].name;
        var componentZ = zindex + i + 1; // +1 means it will never be same level as parent

        // Create the vectors
        $('#' + elementDivId).prepend(
            '<object type="image/svg+xml" data="' + componentUrl + '" class="element-svg"' +
            'id="' + componentId + '" style="z-index: ' + componentZ + ';"></object>'
        );

        // Set the default colours
        setTimeout(function (component, colour) {
            setSvgFillByObjectId(component, colour);
        }, 200, componentId, jsonConfig.components[i].colour); // Need to foolproof this for slow machines?

        //setSvgFillByObjectId(componentId, jsonConfig.components[i].colour);

        // Create the option ui
        $('#' + elementOptionsDivId).append(
            '<div id="' + componentOptionsDivId + '">' +
            '<span id="' + componentOptionsDivId + '-label">' + jsonConfig.components[i].name + '</span>' +
            '</div>'
        );

        // Create config-specific ui elements
        // Toggle option
        if (jsonConfig.components[i].toggleable != null && jsonConfig.components[i].toggleable == "true") {
            $('#' + componentOptionsDivId).prepend(
                '<input id="' + componentOptionsDivId + '-toggle" type="checkbox" aria-label="Checkbox for following text input" checked>'
            );

            var toggleSelector = document.querySelector('#' + componentOptionsDivId + '-toggle');
            toggleSelector.addEventListener('change', onToggleValueChanges);
        }

        // Colour input
        if (jsonConfig.components[i].colour != null) {
            $('#' + componentOptionsDivId).append(
                '<input type="color" id="' + componentOptionsDivId + '-colour" value="' + jsonConfig.components[i].colour + '">'
            );

            var colourSelector = document.querySelector('#' + componentOptionsDivId + '-colour');
            colourSelector.addEventListener('change', onColourValueChanges);
        }

        console.log(componentId);
    }

    // Finally, hide it all :)
    setTimeout(function () {
        $('#' + elementDivId).hide();
        $('#' + elementOptionsDivId).hide();
    }, 100); // Prevents race between this and the svg helper functions below
}

function setSvgFillByObjectId(objectId, colour) {
    var vectorPaths = getSvgPathsFromObject(objectId)
    for (var i = 0; i < vectorPaths.length; i++) {
        console.log("filling");
        vectorPaths[i].setAttribute("fill", colour)
    }
}

function getSvgPathsFromObject(objectId) {
    console.log("Trying2: " + objectId);
    var svgElement = document.getElementById(objectId);
    var svgDocument = svgElement.contentDocument;
    return svgDocument.querySelectorAll('[id=' + objectId + '-path]');
}

// Handles when any of the category dropdowns is changed.
function onSelectValueChanged(event) {
    $('#' + event.target.oldvalue).hide();
    $('#' + event.target.oldvalue + '-options').hide();
    $('#' + event.target.value).show();
    $('#' + event.target.value + '-options').show();
    event.target.oldvalue = event.target.value;
}

function onColourValueChanges(event) {
    var objectToUpdate = event.target.id.substring(0, event.target.id.length - 7).replace("-options", "");
    setSvgFillByObjectId(objectToUpdate, event.target.value);
}

function onToggleValueChanges(event) {
    var objectToUpdate = event.target.id.substring(0, event.target.id.length - 7).replace("-options", "");
    console.log(event.target.checked);
    
    if (event.target.checked) $('#' + objectToUpdate).show();
    else $('#' + objectToUpdate).hide();
}

function sortSelect(selElem) {
    var tmpAry = new Array();
    for (var i = 0; i < selElem.options.length; i++) {
        tmpAry[i] = new Array();
        tmpAry[i][0] = selElem.options[i].text;
        tmpAry[i][1] = selElem.options[i].value;
    }
    tmpAry.sort();
    while (selElem.options.length > 0) {
        selElem.options[0] = null;
    }
    for (var i = 0; i < tmpAry.length; i++) {
        var op = new Option(tmpAry[i][0], tmpAry[i][1]);
        selElem.options[i] = op;
    }
    return;
}