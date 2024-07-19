var size = 0;
var placement = 'point';

var style_CasosConfirmadosporMunicipio_9 = function(feature, resolution){
    var context = {
        feature: feature,
        variables: {}
    };
    var value = feature.get("casos — mpio_CASOS_confir");
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
    if (feature.get("casos — mpio_CASOS_confir") !== null && resolution > 28 && resolution < 0) {
        labelText = String(feature.get("casos — mpio_CASOS_confir"));
    }
    if (value >= 0.000000 && value <= 2.000000) {
            style = [ new ol.style.Style({
        fill: new ol.style.Fill({color: 'rgba(254,240,217,0.504)'}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth)
    })]
                    } else if (value >= 2.000000 && value <= 10.800000) {
            style = [ new ol.style.Style({
        fill: new ol.style.Fill({color: 'rgba(253,204,138,0.504)'}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth)
    })]
                    } else if (value >= 10.800000 && value <= 37.400000) {
            style = [ new ol.style.Style({
        fill: new ol.style.Fill({color: 'rgba(252,141,89,0.504)'}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth)
    })]
                    } else if (value >= 37.400000 && value <= 67.200000) {
            style = [ new ol.style.Style({
        fill: new ol.style.Fill({color: 'rgba(227,74,51,0.504)'}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth)
    })]
                    } else if (value >= 67.200000 && value <= 235.000000) {
            style = [ new ol.style.Style({
        fill: new ol.style.Fill({color: 'rgba(179,0,0,0.504)'}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth)
    })]
                    };

    return style;
};
