const elementList = [
    "img/Headgear/visor/saddle/"//,
    //"img/Headgear/pith/pickelhaube/"
    //"img/Headgear/kepi/feather/",
]

const rootUrl = "http://localhost:8000/UniformGenerator/"
const HeadgearTabPane = "#nav-element-Headgear";

function loadElements() {
    console.log("Starting to load elements");
    elementList.forEach(loadElement);
}

function loadElement(item, index) {
    var elementUrl = rootUrl + item;

    $.getJSON(elementUrl + "config.json")
        .done(function (data) {
            switch (data.category) {
                case "Headgear":
                    loadHeadgear(data, index, elementUrl);
                    break;
                default:
                    console.log("Ooopsie doodle! Category config for " + item + " is invalid.");
                    break;
            }
        })
        .fail(function (jqhxr, textStatus, error) {
            console.log("Ooopsie doodle! An element has bad/missing config file! -> " + textStatus + ": " + error + " (" + elementUrl + ")");
        });
}

function loadHeadgear(jsonConfig, index, elementUrl) {
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
                '<input id="' + componentOptionsDivId + '-toggle" type="checkbox" aria-label="Checkbox for following text input">'
            );
        }

        // Colour input
        if (jsonConfig.components[i].colour != null) {
            $('#' + componentOptionsDivId).append(
                '<input type="color" id="' + componentOptionsDivId + '-colour" value="' + jsonConfig.components[i].colour + '">'
            );
        }

        console.log(componentId);
    }



    // Finally, hide it all :)
    //$('#' + elementDivId).hide();
    //$('#' + elementOptionsDivId).hide();
}

function setSvgFillByObjectId(objectId, colour) {
    console.log("Trying: " + objectId + " | " + colour);
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