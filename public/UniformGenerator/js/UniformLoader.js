function UniformLoader() {
    console.log("Starting to load components")

    loadHeadgearComponents();
}

function loadHeadgearComponents() {
    const headgearPath = "http://localhost:8000/img/headgear/";

    var fs = require('fs');
    var files = fs.readdirSync(headgearPath);

    console.log(files);
}