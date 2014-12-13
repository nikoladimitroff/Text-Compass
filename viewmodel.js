var viewmodel = {
    content: ko.observable("My heading"),
    color: ko.observable("#FFFFFF"),
    backgroundColor: ko.observable("#000000"),
    fontFamily: ko.observable("Segoe UI"),
    fontSize: ko.observable(25),
    letterSpacing: ko.observable(0),
    fontStyle: ko.observable("normal"),
    fontWeight: ko.observable("normal"),
    textTransform: ko.observable("none"),
    
    deepShadow: ko.observable(false),

    shadow: ko.observable({
        color: ko.observable("#FFFFFF"),
        offsetX: ko.observable(0),
        offsetY: ko.observable(0),
        blur: ko.observable(0),
        result: ko.pureComputed(function () {
            var shadow = viewmodel.shadow();
            if (viewmodel.deepShadow()) {
                return computeDeepShadow();
            }
            return shadow.color() + ' ' + shadow.offsetX() + 'px ' + shadow.offsetY() + 'px ' + shadow.blur() + 'px';
        }),
    }),
    
    fontFamilies: ko.observableArray([
        "Arial",
        "Segoe UI",
        "Calibri"
    ]),
    textTransformValues: [
        "none",
        "capitalize",
        "uppercase",
        "lowercase",
        "full-width"
    ],
    fontStyleValues: [
        "normal",
        "italic",
    ],
    fontWeightValues: [
        "normal",
        "bold",
    ],
};

document.getElementById("add-google-font-face-button").addEventListener("click", function () {
    var fontUrl = prompt("Give me an url to your font:");
    if (fontUrl && fontUrl.length !== 0) {
        var link = document.createElement("link");
        document.getElementsByTagName('head')[0].appendChild(link);
        link.rel = "stylesheet";
        link.href = fontUrl;
        var familyLiteral = "family=";
        var fontName = fontUrl.substr(fontUrl.indexOf(familyLiteral) + familyLiteral.length)
                       .replace("+", " ");
        viewmodel.fontFamilies.push(fontName);
        /*
        <link href='http://fonts.googleapis.com/css?family=Poiret+One' rel='stylesheet' type='text/css'>
        */
    }
});

document.getElementById("add-font-face-button").addEventListener("click", function () {
    var fontUrl = prompt("Give me an url to your font:");
    if (fontUrl && fontUrl.length !== 0) {        
        var fontName = fontUrl.substring(fontUrl.lastIndexOf("/"), fontUrl.lastIndexOf("."));
        var fontExtension = fontUrl.substr(fontUrl.lastIndexOf(".") + 1);
        var fontFormat = {"ttf": "truetype", "woff": "woff"}[fontExtension];
        var fontFace =  "font-family: '" + fontName + "'; src: url('" + fontUrl + "') " + "format('" + fontFormat + "');";
        var rule = "@font-face {" + fontFace + "}"
        var style = document.createElement('style');
        style.type = "text/css";
        document.getElementsByTagName('head')[0].appendChild(style);
        style.innerHTML = rule;
        viewmodel.fontFamilies.push("'" + fontName + "'");
    }
});

function computeDeepShadow() {
    var shadows = [];
    var startingY = -1;
    var shadowsCount = 16;
    for (var i = startingY; i < shadowsCount + startingY; i++) {
        var shadow = "0 " + i + "px" + " 0 " + viewmodel.shadow().color();
        shadows.push(shadow);
    }
    shadows.push("0 22px 30px rgba(0, 0, 0, 0.9)");
    return shadows.join(",\n") + ";";
}

ko.applyBindings(viewmodel);