
var map = new ol.Map({
    target: 'map',
    renderer: 'canvas',
    layers: layersList,
    view: new ol.View({
         maxZoom: 28, minZoom: 1
    })
});

//initial view - epsg:3857 coordinates if not "Match project CRS"
map.getView().fit([-11089323.115976, 2074069.874651, -10966219.988662, 2172829.840256], map.getSize());

////controls container

    //top left container
    var topLeftContainer = new ol.control.Control({
        element: (() => {
            var topLeftContainer = document.createElement('div');
            topLeftContainer.id = 'top-left-container';
            return topLeftContainer;
        })(),
    });
    map.addControl(topLeftContainer)

    //bottom left container
    var bottomLeftContainer = new ol.control.Control({
        element: (() => {
            var bottomLeftContainer = document.createElement('div');
            bottomLeftContainer.id = 'bottom-left-container';
            return bottomLeftContainer;
        })(),
    });
    map.addControl(bottomLeftContainer)
  
    //top right container
    var topRightContainer = new ol.control.Control({
        element: (() => {
            var topRightContainer = document.createElement('div');
            topRightContainer.id = 'top-right-container';
            return topRightContainer;
        })(),
    });
    map.addControl(topRightContainer)

    //bottom right container
    var bottomRightContainer = new ol.control.Control({
        element: (() => {
            var bottomRightContainer = document.createElement('div');
            bottomRightContainer.id = 'bottom-right-container';
            return bottomRightContainer;
        })(),
    });
    map.addControl(bottomRightContainer)

//popup
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');
var sketch;

closer.onclick = function() {
    container.style.display = 'none';
    closer.blur();
    return false;
};
var overlayPopup = new ol.Overlay({
    element: container
});
map.addOverlay(overlayPopup)
    
    
var NO_POPUP = 0
var ALL_FIELDS = 1

/**
 * Returns either NO_POPUP, ALL_FIELDS or the name of a single field to use for
 * a given layer
 * @param layerList {Array} List of ol.Layer instances
 * @param layer {ol.Layer} Layer to find field info about
 */
function getPopupFields(layerList, layer) {
    // Determine the index that the layer will have in the popupLayers Array,
    // if the layersList contains more items than popupLayers then we need to
    // adjust the index to take into account the base maps group
    var idx = layersList.indexOf(layer) - (layersList.length - popupLayers.length);
    return popupLayers[idx];
}

//highligth collection
var collection = new ol.Collection();
var featureOverlay = new ol.layer.Vector({
    map: map,
    source: new ol.source.Vector({
        features: collection,
        useSpatialIndex: false // optional, might improve performance
    }),
    style: [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#f00',
            width: 1
        }),
        fill: new ol.style.Fill({
            color: 'rgba(255,0,0,0.1)'
        }),
    })],
    updateWhileAnimating: true, // optional, for instant visual feedback
    updateWhileInteracting: true // optional, for instant visual feedback
});

var doHighlight = false;
var doHover = false;

function createPopupField(currentFeature, currentFeatureKeys, layer) {
    var popupText = '';
    for (var i = 0; i < currentFeatureKeys.length; i++) {
        if (currentFeatureKeys[i] != 'geometry') {
            var popupField = '';
            if (layer.get('fieldLabels')[currentFeatureKeys[i]] == "hidden field") {
                continue;
            } else if (layer.get('fieldLabels')[currentFeatureKeys[i]] == "inline label - visible with data") {
                if (currentFeature.get(currentFeatureKeys[i]) == null) {
                    continue;
                }
            }
            if (layer.get('fieldLabels')[currentFeatureKeys[i]] == "inline label - always visible" ||
                layer.get('fieldLabels')[currentFeatureKeys[i]] == "inline label - visible with data") {
                popupField += '<th>' + layer.get('fieldAliases')[currentFeatureKeys[i]] + '</th><td>';
            } else {
                popupField += '<td colspan="2">';
            }
            if (layer.get('fieldLabels')[currentFeatureKeys[i]] == "header label - visible with data") {
                if (currentFeature.get(currentFeatureKeys[i]) == null) {
                    continue;
                }
            }
            if (layer.get('fieldLabels')[currentFeatureKeys[i]] == "header label - always visible" ||
                layer.get('fieldLabels')[currentFeatureKeys[i]] == "header label - visible with data") {
                popupField += '<strong>' + layer.get('fieldAliases')[currentFeatureKeys[i]] + '</strong><br />';
            }
            if (layer.get('fieldImages')[currentFeatureKeys[i]] != "ExternalResource") {
				popupField += (currentFeature.get(currentFeatureKeys[i]) != null ? autolinker.link(currentFeature.get(currentFeatureKeys[i]).toLocaleString()) + '</td>' : '');
			} else {
				var fieldValue = currentFeature.get(currentFeatureKeys[i]);
				if (/\.(gif|jpg|jpeg|tif|tiff|png|avif|webp|svg)$/i.test(fieldValue)) {
					popupField += (fieldValue != null ? '<img src="images/' + fieldValue.replace(/[\\\/:]/g, '_').trim() + '" /></td>' : '');
				} else if (/\.(mp4|webm|ogg|avi|mov|flv)$/i.test(fieldValue)) {
					popupField += (fieldValue != null ? '<video controls><source src="images/' + fieldValue.replace(/[\\\/:]/g, '_').trim() + '" type="video/mp4">Il tuo browser non supporta il tag video.</video></td>' : '');
				} else {
					popupField += (fieldValue != null ? autolinker.link(fieldValue.toLocaleString()) + '</td>' : '');
				}
			}
            popupText += '<tr>' + popupField + '</tr>';
        }
    }
    return popupText;
}

var highlight;
var autolinker = new Autolinker({truncate: {length: 30, location: 'smart'}});
var onPointerMove = function(evt) {
    if (!doHover && !doHighlight) {
        return;
    }
    var pixel = map.getEventPixel(evt.originalEvent);
    var coord = evt.coordinate;
    var popupField;
    var currentFeature;
    var currentLayer;
    var currentFeatureKeys;
    var clusteredFeatures;
    var clusterLenght;
    var popupText = '<ul>';
    map.forEachFeatureAtPixel(pixel, function(feature, layer) {
        if (layer && feature instanceof ol.Feature && (layer.get("interactive") || layer.get("interactive") == undefined)) {
            var doPopup = false;
            for (k in layer.get('fieldImages')) {
                if (layer.get('fieldImages')[k] != "Hidden") {
                    doPopup = true;
                }
            }
            currentFeature = feature;
            currentLayer = layer;
            clusteredFeatures = feature.get("features");
            if (clusteredFeatures) {
				clusterLenght = clusteredFeatures.length;
			}
            var clusterFeature;
            if (typeof clusteredFeatures !== "undefined") {
                if (doPopup) {
                    for(var n=0; n<clusteredFeatures.length; n++) {
                        currentFeature = clusteredFeatures[n];
                        currentFeatureKeys = currentFeature.getKeys();
                        popupText += '<li><table>'
                        popupText += '<a>' + '<b>' + layer.get('popuplayertitle') + '</b>' + '</a>';
                        popupText += createPopupField(currentFeature, currentFeatureKeys, layer);
                        popupText += '</table></li>';    
                    }
                }
            } else {
                currentFeatureKeys = currentFeature.getKeys();
                if (doPopup) {
                    popupText += '<li><table>';
                    popupText += '<a>' + '<b>' + layer.get('popuplayertitle') + '</b>' + '</a>';
                    popupText += createPopupField(currentFeature, currentFeatureKeys, layer);
                    popupText += '</table></li>';
                }
            }
        }
    });
    if (popupText == '<ul>') {
        popupText = '';
    } else {
        popupText += '</ul>';
    }

    if (doHighlight) {
        if (currentFeature !== highlight) {
            if (highlight) {
                featureOverlay.getSource().removeFeature(highlight);
            }
            if (currentFeature) {
                var featureStyle
                if (typeof clusteredFeatures == "undefined") {
					var style = currentLayer.getStyle();
					var styleFunction = typeof style === 'function' ? style : function() { return style; };
					featureStyle = styleFunction(currentFeature)[0];
				} else {
					featureStyle = currentLayer.getStyle().toString();
				}

                if (currentFeature.getGeometry().getType() == 'Point' || currentFeature.getGeometry().getType() == 'MultiPoint') {
                    var radius
					if (typeof clusteredFeatures == "undefined") {
						radius = featureStyle.getImage().getRadius();
					} else {
						radius = parseFloat(featureStyle.split('radius')[1].split(' ')[1]) + clusterLenght;
					}

                    highlightStyle = new ol.style.Style({
                        image: new ol.style.Circle({
                            fill: new ol.style.Fill({
                                color: "#040af7"
                            }),
                            radius: radius
                        })
                    })
                } else if (currentFeature.getGeometry().getType() == 'LineString' || currentFeature.getGeometry().getType() == 'MultiLineString') {

                    var featureWidth = featureStyle.getStroke().getWidth();

                    highlightStyle = new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: '#040af7',
                            lineDash: null,
                            width: featureWidth
                        })
                    });

                } else {
                    highlightStyle = new ol.style.Style({
                        fill: new ol.style.Fill({
                            color: '#040af7'
                        })
                    })
                }
                featureOverlay.getSource().addFeature(currentFeature);
                featureOverlay.setStyle(highlightStyle);
            }
            highlight = currentFeature;
        }
    }

    if (doHover) {
        if (popupText) {
            overlayPopup.setPosition(coord);
            content.innerHTML = popupText;
            container.style.display = 'block';        
        } else {
            container.style.display = 'none';
            closer.blur();
        }
    }
};

var onSingleClick = function(evt) {
    if (doHover) {
        return;
    }
    if (sketch) {
        return;
    }
    var pixel = map.getEventPixel(evt.originalEvent);
    var coord = evt.coordinate;
    var popupField;
    var currentFeature;
    var currentFeatureKeys;
    var clusteredFeatures;
    var popupText = '<ul>';
    map.forEachFeatureAtPixel(pixel, function(feature, layer) {
        if (layer && feature instanceof ol.Feature && (layer.get("interactive") || layer.get("interactive") == undefined)) {
            var doPopup = false;
            for (k in layer.get('fieldImages')) {
                if (layer.get('fieldImages')[k] != "Hidden") {
                    doPopup = true;
                }
            }
            currentFeature = feature;
            clusteredFeatures = feature.get("features");
            var clusterFeature;
            if (typeof clusteredFeatures !== "undefined") {
                if (doPopup) {
                    for(var n=0; n<clusteredFeatures.length; n++) {
                        currentFeature = clusteredFeatures[n];
                        currentFeatureKeys = currentFeature.getKeys();
                        popupText += '<li><table>'
						popupText += '<a>' + '<b>' + layer.get('popuplayertitle') + '</b>' + '</a>';
						popupText += createPopupField(currentFeature, currentFeatureKeys, layer);
                        popupText += '</table></li>';    
                    }
                }
            } else {
                currentFeatureKeys = currentFeature.getKeys();
                if (doPopup) {
                    popupText += '<li><table>';
					popupText += '<a>' + '<b>' + layer.get('popuplayertitle') + '</b>' + '</a>';
					popupText += createPopupField(currentFeature, currentFeatureKeys, layer);
                    popupText += '</table>';
                }
            }
        }
    });
    if (popupText == '<ul>') {
        popupText = '';
    } else {
        popupText += '</ul>';
    }
    
	var viewProjection = map.getView().getProjection();
	var viewResolution = map.getView().getResolution();

	for (i = 0; i < wms_layers.length; i++) {
		if (wms_layers[i][1] && wms_layers[i][0].getVisible()) {
			overlayPopup.setPosition(coord);
			container.style.display = 'block';
			var url = wms_layers[i][0].getSource().getFeatureInfoUrl(
					evt.coordinate, viewResolution, viewProjection, {
					'INFO_FORMAT': 'text/html',
				});
			if (url) {
				content.innerHTML = '';

				var loadingIcon = document.createElement('div');
				loadingIcon.className = 'lds-roller';

				var imgElement = document.createElement('img');
                imgElement.className = 'lds-roller-img';
				imgElement.style.height = '25px';
				imgElement.style.width = '25px';
				loadingIcon.appendChild(imgElement);

				container.appendChild(loadingIcon);

				var timeoutPromise = new Promise((resolve, reject) => {
						setTimeout(() => {
							reject(new Error('Timeout exceeded'));
						}, 5000); // 5000 millisecondi (5 secondi)
					});

				Promise.race([
						fetch('https://api.allorigins.win/raw?url=' + encodeURIComponent(url)),
						timeoutPromise
					])
				.then((response) => {
					if (response.ok) {
						return response.text();
					} //else {						
					//}
				})
				.then((html) => {
					if (html.indexOf('<table') !== -1) {
						overlayPopup.setPosition(coord);
						content.innerHTML += html + '<p>' + '</p>';
						container.style.display = 'block';
					} // else {
					// }
				})
				// .catch((error) => {
				// })
				.finally(() => {
					var loaderIcon = document.querySelector('.lds-roller');
					loaderIcon.remove();
				});
			}
		}
	}

    if (popupText) {
        overlayPopup.setPosition(coord);
        content.innerHTML = popupText;
        container.style.display = 'block';        
    } else {
        container.style.display = 'none';
        closer.blur();
    }
};

map.on('pointermove', function(evt) {
    onPointerMove(evt);
});
map.on('singleclick', function(evt) {
    onSingleClick(evt);
});

//get container
var topLeftContainerDiv = document.getElementById('top-left-container')
var bottomLeftContainerDiv = document.getElementById('bottom-left-container')
var bottomRightContainerDiv = document.getElementById('bottom-right-container')

//title

//abstract


//geolocate

isTracking = false;
var geolocateControl = (function (Control) {
    geolocateControl = function(opt_options) {
        var options = opt_options || {};
        var button = document.createElement('button');
        button.className += ' fa fa-map-marker';
        var handleGeolocate = function() {
            if (isTracking) {
                map.removeLayer(geolocateOverlay);
                isTracking = false;
          } else if (geolocation.getTracking()) {
                map.addLayer(geolocateOverlay);
                map.getView().setCenter(geolocation.getPosition());
                isTracking = true;
          }
        };
        button.addEventListener('click', handleGeolocate, false);
        button.addEventListener('touchstart', handleGeolocate, false);
        var element = document.createElement('div');
        element.className = 'geolocate ol-unselectable ol-control';
        element.appendChild(button);
        ol.control.Control.call(this, {
            element: element,
            target: options.target
        });
    };
    if (Control) geolocateControl.__proto__ = Control;
    geolocateControl.prototype = Object.create(Control && Control.prototype);
    geolocateControl.prototype.constructor = geolocateControl;
    return geolocateControl;
}(ol.control.Control));
map.addControl(new geolocateControl())

      var geolocation = new ol.Geolocation({
  projection: map.getView().getProjection()
});


var accuracyFeature = new ol.Feature();
geolocation.on('change:accuracyGeometry', function() {
  accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
});

var positionFeature = new ol.Feature();
positionFeature.setStyle(new ol.style.Style({
  image: new ol.style.Circle({
    radius: 6,
    fill: new ol.style.Fill({
      color: '#3399CC'
    }),
    stroke: new ol.style.Stroke({
      color: '#fff',
      width: 2
    })
  })
}));

geolocation.on('change:position', function() {
  var coordinates = geolocation.getPosition();
  positionFeature.setGeometry(coordinates ?
      new ol.geom.Point(coordinates) : null);
});

var geolocateOverlay = new ol.layer.Vector({
  source: new ol.source.Vector({
    features: [accuracyFeature, positionFeature]
  })
});

geolocation.setTracking(true);


//measurement

var measuring = false;
var measureControl = (function (Control) {
    measureControl = function(opt_options) {

      var options = opt_options || {};

      var measurebutton = document.createElement('button');
      measurebutton.className += ' fas fa-ruler ';

      var this_ = this;
      var handleMeasure = function(e) {
        if (!measuring) {
            selectLabel.style.display = "";
            this_.getMap().addInteraction(draw);
            createHelpTooltip();
            createMeasureTooltip();
            measuring = true;
        } else {
            selectLabel.style.display = "none";
            this_.getMap().removeInteraction(draw);
            measuring = false;
            this_.getMap().removeOverlay(helpTooltip);
            this_.getMap().removeOverlay(measureTooltip);
            var staticTooltip = document.getElementsByClassName("tooltip-static");
                while (staticTooltip.length > 0) {
                  staticTooltip[0].parentNode.removeChild(staticTooltip[0]);
                }
            measureLayer.getSource().clear();
            sketch = null;
        }
      };

      measurebutton.addEventListener('click', handleMeasure, false);
      measurebutton.addEventListener('touchstart', handleMeasure, false);

      measurebutton.addEventListener("click", () => {
          measurebutton.classList.toggle("clicked");
        });

      var element = document.createElement('div');
      element.className = 'measure-control ol-unselectable ol-control';
      element.appendChild(measurebutton);

      ol.control.Control.call(this, {
        element: element,
        target: options.target
      });

    };
    if (Control) measureControl.__proto__ = Control;
    measureControl.prototype = Object.create(Control && Control.prototype);
    measureControl.prototype.constructor = measureControl;
    return measureControl;
    }(ol.control.Control));
    map.addControl(new measureControl())

    map.on('pointermove', function(evt) {
        if (evt.dragging) {
            return;
        }
        if (measuring) {
            /** @type {string} */
            var helpMsg = 'Click to start drawing';
            if (sketch) {
                var geom = (sketch.getGeometry());
                if (geom instanceof ol.geom.Polygon) {
                    helpMsg = continuePolygonMsg;
                } else if (geom instanceof ol.geom.LineString) {
                    helpMsg = continueLineMsg;
                }
            }
            helpTooltipElement.innerHTML = helpMsg;
            helpTooltip.setPosition(evt.coordinate);
        }
    });
    

    var measureControl = document.querySelector(".measure-control");

    var selectLabel = document.createElement("label");
    selectLabel.innerHTML = "&nbsp;Measure:&nbsp;";

    var typeSelect = document.createElement("select");
    typeSelect.id = "type";

    var measurementOption = [
        { value: "LineString", description: "Lenght" },
        { value: "Polygon", description: "Area" }
        ];
    measurementOption.forEach(function (option) {
        var optionElement = document.createElement("option");
        optionElement.value = option.value;
        optionElement.text = option.description;
        typeSelect.appendChild(optionElement);
    });

    selectLabel.appendChild(typeSelect);
    measureControl.appendChild(selectLabel);

    selectLabel.style.display = "none";
/**
 * Currently drawn feature.
 * @type {ol.Feature}
 */

/**
 * The help tooltip element.
 * @type {Element}
 */
var helpTooltipElement;


/**
 * Overlay to show the help messages.
 * @type {ol.Overlay}
 */
var helpTooltip;


/**
 * The measure tooltip element.
 * @type {Element}
 */
var measureTooltipElement;


/**
 * Overlay to show the measurement.
 * @type {ol.Overlay}
 */
var measureTooltip;


/**
 * Message to show when the user is drawing a line.
 * @type {string}
 */
var continueLineMsg = 'Click to continue drawing the line';



/**
 * Message to show when the user is drawing a polygon.
 * @type {string}
 */
var continuePolygonMsg = "1click continue, 2click close";


var typeSelect = document.getElementById("type");
var typeSelectForm = document.getElementById("form_measure");

typeSelect.onchange = function (e) {		  
  map.removeInteraction(draw);
  addInteraction();
  map.addInteraction(draw);		  
};

var style = new ol.style.Style({
  stroke: new ol.style.Stroke({ 
	color: "rgba(0, 0, 255)", //blu
	lineDash: [10, 10],
	width: 4
  }),
  image: new ol.style.Circle({
	radius: 6,
	stroke: new ol.style.Stroke({
	  color: "rgba(255, 255, 255)", 
	  width: 1
	}),
  })
});

var style2 = new ol.style.Style({	  
	stroke: new ol.style.Stroke({
		color: "rgba(255, 255, 255)", 
		lineDash: [10, 10],
		width: 2
	  }),
  image: new ol.style.Circle({
	radius: 5,
	stroke: new ol.style.Stroke({
	  color: "rgba(0, 0, 255)", 
	  width: 1
	}),
		  fill: new ol.style.Fill({
	  color: "rgba(255, 204, 51, 0.4)", 
	}),
	  })
});

var labelStyle = new ol.style.Style({
  text: new ol.style.Text({
	font: "14px Calibri,sans-serif",
	fill: new ol.style.Fill({
	  color: "rgba(0, 0, 0, 1)"
	}),
	stroke: new ol.style.Stroke({
	  color: "rgba(255, 255, 255, 1)",
	  width: 3
	})
  })
});

var labelStyleCache = [];

var styleFunction = function (feature, type) {
  var styles = [style, style2];
  var geometry = feature.getGeometry();
  var type = geometry.getType();
  var lineString;
  if (!type || type === type) {
	if (type === "Polygon") {
	  lineString = new ol.geom.LineString(geometry.getCoordinates()[0]);
	} else if (type === "LineString") {
	  lineString = geometry;
	}
  }
  if (lineString) {
	var count = 0;
	lineString.forEachSegment(function (a, b) {
	  var segment = new ol.geom.LineString([a, b]);
	  var label = formatLength(segment);
	  if (labelStyleCache.length - 1 < count) {
		labelStyleCache.push(labelStyle.clone());
	  }
	  labelStyleCache[count].setGeometry(segment);
	  labelStyleCache[count].getText().setText(label);
	  styles.push(labelStyleCache[count]);
	  count++;
	});
  }
  return styles;
};
var source = new ol.source.Vector();

var measureLayer = new ol.layer.Vector({
  source: source,
  displayInLayerSwitcher: false,
  style: function (feature) {
	labelStyleCache = [];
	return styleFunction(feature);
  }
});

map.addLayer(measureLayer);

var draw; // global so we can remove it later
function addInteraction() {
  var type = typeSelect.value;
  draw = new ol.interaction.Draw({
    source: source,
    type: /** @type {ol.geom.GeometryType} */ (type),
	style: function (feature) {
			  return styleFunction(feature, type);
			}
  });

  var listener;
  draw.on('drawstart',
      function(evt) {
        // set sketch
        sketch = evt.feature;

        /** @type {ol.Coordinate|undefined} */
        var tooltipCoord = evt.coordinate;

        listener = sketch.getGeometry().on('change', function(evt) {
          var geom = evt.target;
          var output;
          if (geom instanceof ol.geom.Polygon) {
				  output = formatArea(/** @type {ol.geom.Polygon} */ (geom));
				  tooltipCoord = geom.getInteriorPoint().getCoordinates();
				} else if (geom instanceof ol.geom.LineString) {
				  output = formatLength(/** @type {ol.geom.LineString} */ (geom));
				  tooltipCoord = geom.getLastCoordinate();
				}
          measureTooltipElement.innerHTML = output;
          measureTooltip.setPosition(tooltipCoord);
        });
      }, this);

  draw.on('drawend',
      function(evt) {
        measureTooltipElement.className = 'tooltip tooltip-static';
        measureTooltip.setOffset([0, -7]);
        // unset sketch
        sketch = null;
        // unset tooltip so that a new one can be created
        measureTooltipElement = null;
        createMeasureTooltip();
        ol.Observable.unByKey(listener);
      }, this);
}


/**
 * Creates a new help tooltip
 */
function createHelpTooltip() {
  if (helpTooltipElement) {
    helpTooltipElement.parentNode.removeChild(helpTooltipElement);
  }
  helpTooltipElement = document.createElement('div');
  helpTooltipElement.className = 'tooltip hidden';
  helpTooltip = new ol.Overlay({
    element: helpTooltipElement,
    offset: [15, 0],
    positioning: 'center-left'
  });
  map.addOverlay(helpTooltip);
}


/**
 * Creates a new measure tooltip
 */
function createMeasureTooltip() {
  if (measureTooltipElement) {
    measureTooltipElement.parentNode.removeChild(measureTooltipElement);
  }
  measureTooltipElement = document.createElement('div');
  measureTooltipElement.className = 'tooltip tooltip-measure';
  measureTooltip = new ol.Overlay({
    element: measureTooltipElement,
    offset: [0, -15],
    positioning: 'bottom-center'
  });
  map.addOverlay(measureTooltip);
}



/**
 * format length output
 * @param {ol.geom.LineString} line
 * @return {string}
 */
var formatLength = function(line) {
  var length;
  var coordinates = line.getCoordinates();
  length = 0;
  var sourceProj = map.getView().getProjection();
  for (var i = 0, ii = coordinates.length - 1; i < ii; ++i) {
      var c1 = ol.proj.transform(coordinates[i], sourceProj, 'EPSG:4326');
      var c2 = ol.proj.transform(coordinates[i + 1], sourceProj, 'EPSG:4326');
      length += ol.sphere.getDistance(c1, c2);
    }
  var output;
  if (length > 100) {
    output = (Math.round(length / 1000 * 100) / 100) +
        ' ' + 'km';
  } else {
    output = (Math.round(length * 100) / 100) +
        ' ' + 'm';
  }
  return output;
};

/**
 * Format area output.
 * @param {ol.geom.Polygon} polygon The polygon.
 * @return {string} Formatted area.
 */
var formatArea = function (polygon) {
  var area = polygon.getArea();
  var output;
  if (area > 1000000) {
	output =
	  Math.round((area / 1000000) * 1000) / 1000 + " " + "km<sup>2</sup>";
  } else {
	output = Math.round(area * 100) / 100 + " " + "m<sup>2</sup>";
  }
  return output;
};

addInteraction();

var parentElement = document.querySelector(".measure-control");
var elementToMove = document.getElementById("form_measure");
if (elementToMove && parentElement) {
  parentElement.insertBefore(elementToMove, parentElement.firstChild);
}


//geocoder

var geocoder = new Geocoder('nominatim', {
  provider: 'osm',
  lang: 'en-US',
  placeholder: 'Search place or address ...',
  limit: 5,
  keepOpen: true,
});
map.addControl(geocoder);
document.getElementsByClassName('gcd-gl-btn')[0].className += ' fa fa-search';


//layer search


//scalebar


//layerswitcher

var layerSwitcher = new ol.control.LayerSwitcher({
    tipLabel: "Layers",
    target: 'top-right-container'
    });
map.addControl(layerSwitcher);
layerSwitcher.hidePanel = function() {};
layerSwitcher.showPanel();






//attribution
var attributionComplete = false;
map.on("rendercomplete", function(evt) {
	if (!attributionComplete) {
		var attribution = document.getElementsByClassName('ol-attribution')[0];	
		attribution.classList.remove('ol-collapsed');
		var button = attribution.getElementsByTagName('button')[0];
		if (button) {
			button.parentNode.removeChild(button);
		}
		var attributionList = attribution.getElementsByTagName('ul')[0];
		if (attributionList) {
			var qgis2webAttribution = document.createElement('li');
			qgis2webAttribution.innerHTML = '<a href="https://github.com/tomchadwin/qgis2web">qgis2web</a> &middot; ';
			attributionList.appendChild(qgis2webAttribution);

			var olAttribution = document.createElement('li');
			olAttribution.innerHTML = '<a href="https://openlayers.org/">OpenLayers</a> &middot; ';
			attributionList.appendChild(olAttribution);

			var qgisAttribution = document.createElement('li');
			qgisAttribution.innerHTML = '<a href="https://qgis.org/">QGIS</a>';
			attributionList.appendChild(qgisAttribution);
		}
	attributionComplete = true;
	}
})



// Disable "popup on hover" or "highlight on hover" if ol-control mouseover
var preDoHover = doHover;
var preDoHighlight = doHighlight;
if (doHover || doHighlight) {
    var controlElements = document.getElementsByClassName('ol-control');
    for (var i = 0; i < controlElements.length; i++) {
        controlElements[i].addEventListener('mouseover', function() {
            if (doHover) { doHover = false; }
            if (doHighlight) { doHighlight = false; }
        });
        controlElements[i].addEventListener('mouseout', function() {
            doHover = preDoHover;
            doHighlight = preDoHighlight;
        });
    }
}


//move controls inside containers, in order

    //zoom
    var zoomControl = document.getElementsByClassName('ol-zoom')[0];
    if (zoomControl) {
        topLeftContainerDiv.appendChild(zoomControl);
    }
    //geolocate
    var geolocateControl = document.getElementsByClassName('geolocate')[0];
    if (geolocateControl) {
        topLeftContainerDiv.appendChild(geolocateControl);
    }
    //measure
    var measureControl = document.getElementsByClassName('measure-control')[0];
    if (measureControl) {
        topLeftContainerDiv.appendChild(measureControl);
    }
    //geocoder
    var geocoderControl = document.getElementsByClassName('ol-geocoder')[0];
    if (geocoderControl) {
        topLeftContainerDiv.appendChild(geocoderControl);
    }
    //search layer
    var searchLayerControl = document.getElementsByClassName('search-layer')[0];
    if (searchLayerControl) {
        topLeftContainerDiv.appendChild(searchLayerControl);
    }
    //scale line
    var scaleLineControl = document.getElementsByClassName('ol-scale-line')[0];
    if (scaleLineControl) {
        scaleLineControl.className += ' ol-control';
        bottomLeftContainerDiv.appendChild(scaleLineControl);
    }
    //attribution
    var attributionControl = document.getElementsByClassName('ol-attribution')[0];
    if (attributionControl) {
        bottomRightContainerDiv.appendChild(attributionControl);
    }