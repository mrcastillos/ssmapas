var size = 0;
var placement = 'point';

var style_CasosProbablesporMunicipio_8 = function(feature, resolution){
    var context = {
        feature: feature,
        variables: {}
    };
    var value = feature.get("casos — mpio_casos_proba");
    var labelText = "";
    size = 0;
    var labelFont = "26.0px \'Arial Rounded MT Bold\', sans-serif";
    var labelFill = "#323232";
    var bufferColor = "";
    var bufferWidth = 0;
    var textAlign = "left";
    var offsetX = 8;
    var offsetY = 3;
    var placement = 'point';
    if (feature.get("casos — mpio_casos_proba") !== null && resolution > 28 && resolution < 0) {
        labelText = String(feature.get("casos — mpio_casos_proba"));
    }
    if (value >= 3.000000 && value <= 12.800000) {
            style = [ new ol.style.Style({
        fill: new ol.style.Fill({color: 'rgba(247,252,245,0.504)'}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth)
    })]
                    } else if (value >= 12.800000 && value <= 88.200000) {
            style = [ new ol.style.Style({
        fill: new ol.style.Fill({color: 'rgba(201,234,194,0.504)'}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth)
    })]
                    } else if (value >= 88.200000 && value <= 118.400000) {
            style = [ new ol.style.Style({
        fill: new ol.style.Fill({color: 'rgba(123,199,124,0.504)'}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth)
    })]
                    } else if (value >= 118.400000 && value <= 280.600000) {
            style = [ new ol.style.Style({
        fill: new ol.style.Fill({color: 'rgba(42,146,75,0.504)'}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth)
    })]
                    } else if (value >= 280.600000 && value <= 1044.000000) {
            style = [ new ol.style.Style({
        fill: new ol.style.Fill({color: 'rgba(0,68,27,0.504)'}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth)
    })]
                    };

    return style;
};
