var wms_layers = [];


        var lyr_CartoLight_0 = new ol.layer.Tile({
            'title': 'Carto Light',
            //'type': 'base',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
    attributions: ' ',
                url: 'https://a.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.pn'
            })
        });
var format_LimEstatal_1 = new ol.format.GeoJSON();
var features_LimEstatal_1 = format_LimEstatal_1.readFeatures(json_LimEstatal_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_LimEstatal_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_LimEstatal_1.addFeatures(features_LimEstatal_1);
var lyr_LimEstatal_1 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_LimEstatal_1, 
                style: style_LimEstatal_1,
                popuplayertitle: "Lim. Estatal",
                interactive: false,
                title: '<img src="styles/legend/LimEstatal_1.png" /> Lim. Estatal'
            });
var format_LimMpal_2 = new ol.format.GeoJSON();
var features_LimMpal_2 = format_LimMpal_2.readFeatures(json_LimMpal_2, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_LimMpal_2 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_LimMpal_2.addFeatures(features_LimMpal_2);
var lyr_LimMpal_2 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_LimMpal_2,
maxResolution:196.03126306583374,
 
                style: style_LimMpal_2,
                popuplayertitle: "Lim. Mpal.",
                interactive: false,
                title: '<img src="styles/legend/LimMpal_2.png" /> Lim. Mpal.'
            });
var format_II_3 = new ol.format.GeoJSON();
var features_II_3 = format_II_3.readFeatures(json_II_3, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_II_3 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_II_3.addFeatures(features_II_3);
var lyr_II_3 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_II_3, 
                style: style_II_3,
                popuplayertitle: "II",
                interactive: false,
                title: '<img src="styles/legend/II_3.png" /> II'
            });
var format_I_4 = new ol.format.GeoJSON();
var features_I_4 = format_I_4.readFeatures(json_I_4, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_I_4 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_I_4.addFeatures(features_I_4);
var lyr_I_4 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_I_4, 
                style: style_I_4,
                popuplayertitle: "I",
                interactive: false,
                title: '<img src="styles/legend/I_4.png" /> I'
            });
var format_Jurisdicciones_5 = new ol.format.GeoJSON();
var features_Jurisdicciones_5 = format_Jurisdicciones_5.readFeatures(json_Jurisdicciones_5, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Jurisdicciones_5 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Jurisdicciones_5.addFeatures(features_Jurisdicciones_5);
var lyr_Jurisdicciones_5 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_Jurisdicciones_5, 
                style: style_Jurisdicciones_5,
                popuplayertitle: "Jurisdicciones",
                interactive: false,
    title: 'Jurisdicciones<br />\
    <img src="styles/legend/Jurisdicciones_5_0.png" /> JS I<br />\
    <img src="styles/legend/Jurisdicciones_5_1.png" /> JS II<br />\
    <img src="styles/legend/Jurisdicciones_5_2.png" /> JS III<br />'
        });
var format_TotaldeCasosporMunicipio_6 = new ol.format.GeoJSON();
var features_TotaldeCasosporMunicipio_6 = format_TotaldeCasosporMunicipio_6.readFeatures(json_TotaldeCasosporMunicipio_6, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_TotaldeCasosporMunicipio_6 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_TotaldeCasosporMunicipio_6.addFeatures(features_TotaldeCasosporMunicipio_6);
var lyr_TotaldeCasosporMunicipio_6 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_TotaldeCasosporMunicipio_6,
maxResolution:196.03126306583374,
 
                style: style_TotaldeCasosporMunicipio_6,
                popuplayertitle: "Total de Casos por Municipio",
                interactive: false,
    title: 'Total de Casos por Municipio<br />\
    <img src="styles/legend/TotaldeCasosporMunicipio_6_0.png" /> 3 - 15<br />\
    <img src="styles/legend/TotaldeCasosporMunicipio_6_1.png" /> 15 - 116<br />\
    <img src="styles/legend/TotaldeCasosporMunicipio_6_2.png" /> 116 - 166<br />\
    <img src="styles/legend/TotaldeCasosporMunicipio_6_3.png" /> 166 - 335<br />\
    <img src="styles/legend/TotaldeCasosporMunicipio_6_4.png" /> 335 - 1,157<br />'
        });
var format_DefuncionesporMpio_7 = new ol.format.GeoJSON();
var features_DefuncionesporMpio_7 = format_DefuncionesporMpio_7.readFeatures(json_DefuncionesporMpio_7, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_DefuncionesporMpio_7 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_DefuncionesporMpio_7.addFeatures(features_DefuncionesporMpio_7);
var lyr_DefuncionesporMpio_7 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_DefuncionesporMpio_7,
maxResolution:196.03126306583374,
 
                style: style_DefuncionesporMpio_7,
                popuplayertitle: "Defunciones por Mpio. ",
                interactive: false,
    title: 'Defunciones por Mpio. <br />\
    <img src="styles/legend/DefuncionesporMpio_7_0.png" /> 0 - 0<br />\
    <img src="styles/legend/DefuncionesporMpio_7_1.png" /> 0 - 1<br />\
    <img src="styles/legend/DefuncionesporMpio_7_2.png" /> 1 - 4<br />'
        });
var format_CasosProbablesporMunicipio_8 = new ol.format.GeoJSON();
var features_CasosProbablesporMunicipio_8 = format_CasosProbablesporMunicipio_8.readFeatures(json_CasosProbablesporMunicipio_8, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_CasosProbablesporMunicipio_8 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_CasosProbablesporMunicipio_8.addFeatures(features_CasosProbablesporMunicipio_8);
var lyr_CasosProbablesporMunicipio_8 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_CasosProbablesporMunicipio_8,
maxResolution:196.03126306583374,
 
                style: style_CasosProbablesporMunicipio_8,
                popuplayertitle: "Casos Probables por Municipio",
                interactive: false,
    title: 'Casos Probables por Municipio<br />\
    <img src="styles/legend/CasosProbablesporMunicipio_8_0.png" /> 3 - 12.8<br />\
    <img src="styles/legend/CasosProbablesporMunicipio_8_1.png" /> 12.8 - 88.2<br />\
    <img src="styles/legend/CasosProbablesporMunicipio_8_2.png" /> 88.2 - 118.4<br />\
    <img src="styles/legend/CasosProbablesporMunicipio_8_3.png" /> 118.4 - 280.6<br />\
    <img src="styles/legend/CasosProbablesporMunicipio_8_4.png" /> 280.6 - 1,044<br />'
        });
var format_CasosConfirmadosporMunicipio_9 = new ol.format.GeoJSON();
var features_CasosConfirmadosporMunicipio_9 = format_CasosConfirmadosporMunicipio_9.readFeatures(json_CasosConfirmadosporMunicipio_9, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_CasosConfirmadosporMunicipio_9 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_CasosConfirmadosporMunicipio_9.addFeatures(features_CasosConfirmadosporMunicipio_9);
var lyr_CasosConfirmadosporMunicipio_9 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_CasosConfirmadosporMunicipio_9,
maxResolution:196.03126306583374,
 
                style: style_CasosConfirmadosporMunicipio_9,
                popuplayertitle: "Casos Confirmados por Municipio",
                interactive: false,
    title: 'Casos Confirmados por Municipio<br />\
    <img src="styles/legend/CasosConfirmadosporMunicipio_9_0.png" /> 0 - 2<br />\
    <img src="styles/legend/CasosConfirmadosporMunicipio_9_1.png" /> 2 - 10.8<br />\
    <img src="styles/legend/CasosConfirmadosporMunicipio_9_2.png" /> 10.8 - 37.4<br />\
    <img src="styles/legend/CasosConfirmadosporMunicipio_9_3.png" /> 37.4 - 67.2<br />\
    <img src="styles/legend/CasosConfirmadosporMunicipio_9_4.png" /> 67.2 - 235<br />'
        });
var format_CasosConfirmados_10 = new ol.format.GeoJSON();
var features_CasosConfirmados_10 = format_CasosConfirmados_10.readFeatures(json_CasosConfirmados_10, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_CasosConfirmados_10 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_CasosConfirmados_10.addFeatures(features_CasosConfirmados_10);
var lyr_CasosConfirmados_10 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_CasosConfirmados_10, 
                style: style_CasosConfirmados_10,
                popuplayertitle: "Casos Confirmados",
                interactive: false,
    title: 'Casos Confirmados<br />\
    <img src="styles/legend/CasosConfirmados_10_0.png" /> DENGUE NO GRAVE<br />\
    <img src="styles/legend/CasosConfirmados_10_1.png" /> DENGUE CON SIGNOS DE ALARMA<br />\
    <img src="styles/legend/CasosConfirmados_10_2.png" /> DENGUE GRAVE<br />\
    <img src="styles/legend/CasosConfirmados_10_3.png" /> DEFUNCIÓN POR DENGUE<br />'
        });
var group_Confirmados = new ol.layer.Group({
                                layers: [lyr_CasosConfirmadosporMunicipio_9,lyr_CasosConfirmados_10,],
                                fold: "open",
                                title: "Confirmados"});
var group_Probables = new ol.layer.Group({
                                layers: [lyr_CasosProbablesporMunicipio_8,],
                                fold: "open",
                                title: "Probables"});
var group_Defunsiones = new ol.layer.Group({
                                layers: [lyr_DefuncionesporMpio_7,],
                                fold: "open",
                                title: "Defunsiones"});
var group_Total = new ol.layer.Group({
                                layers: [lyr_TotaldeCasosporMunicipio_6,],
                                fold: "open",
                                title: "Total"});
var group_MapaBase = new ol.layer.Group({
                                layers: [lyr_Jurisdicciones_5,],
                                fold: "open",
                                title: "Mapa Base"});
var group_EstratosdeRiego = new ol.layer.Group({
                                layers: [lyr_II_3,lyr_I_4,],
                                fold: "open",
                                title: "Estratos de Riego"});
var group_Lmites = new ol.layer.Group({
                                layers: [lyr_LimEstatal_1,lyr_LimMpal_2,],
                                fold: "open",
                                title: "Límites"});
var group_Terreno = new ol.layer.Group({
                                layers: [lyr_CartoLight_0,],
                                fold: "open",
                                title: "Terreno"});

lyr_CartoLight_0.setVisible(false);lyr_LimEstatal_1.setVisible(true);lyr_LimMpal_2.setVisible(true);lyr_II_3.setVisible(true);lyr_I_4.setVisible(true);lyr_Jurisdicciones_5.setVisible(true);lyr_TotaldeCasosporMunicipio_6.setVisible(true);lyr_DefuncionesporMpio_7.setVisible(true);lyr_CasosProbablesporMunicipio_8.setVisible(true);lyr_CasosConfirmadosporMunicipio_9.setVisible(true);lyr_CasosConfirmados_10.setVisible(true);
var layersList = [group_Terreno,group_Lmites,group_EstratosdeRiego,group_MapaBase,group_Total,group_Defunsiones,group_Probables,group_Confirmados];
lyr_LimEstatal_1.set('fieldAliases', {'CVE_ENT': 'CVE_ENT', 'NOM_ENT': 'NOM_ENT', });
lyr_LimMpal_2.set('fieldAliases', {'CVE_ENT': 'CVE_ENT', 'CVE_MUN': 'CVE_MUN', 'NOM_MUN': 'NOM_MUN', 'CVE_JUR': 'CVE_JUR', });
lyr_II_3.set('fieldAliases', {'OBJECTID': 'OBJECTID', 'ENTIDAD': 'ENTIDAD', 'DISTRITO': 'DISTRITO', 'MUNICIPIO': 'MUNICIPIO', 'SECCION': 'SECCION', 'TIPO': 'TIPO', 'ENTIFE': 'ENTIFE', 'MUNIFE': 'MUNIFE', 'SECTOR': 'SECTOR', 'NOMMUNIFE': 'NOMMUNIFE', 'MUNINEG': 'MUNINEG', 'NOMMUNINE': 'NOMMUNINE', 'CVEUNIK': 'CVEUNIK', 'munineg10': 'munineg10', 'NOMNINE10': 'NOMNINE10', 'cve_ent': 'cve_ent', 'cve_mun': 'cve_mun', 'cx': 'cx', 'cy': 'cy', 'minx': 'minx', 'miny': 'miny', 'maxx': 'maxx', 'maxy': 'maxy', 'cve_jur': 'cve_jur', 'cveUnk': 'cveUnk', 'Shape_area': 'Shape_area', 'Shape_len': 'Shape_len', 'final —': 'final —', 'final ��_1': 'final ��_1', 'final ��_2': 'final ��_2', 'final ��_3': 'final ��_3', 'final ��_4': 'final ��_4', });
lyr_I_4.set('fieldAliases', {'OBJECTID': 'OBJECTID', 'ENTIDAD': 'ENTIDAD', 'DISTRITO': 'DISTRITO', 'MUNICIPIO': 'MUNICIPIO', 'SECCION': 'SECCION', 'TIPO': 'TIPO', 'ENTIFE': 'ENTIFE', 'MUNIFE': 'MUNIFE', 'SECTOR': 'SECTOR', 'NOMMUNIFE': 'NOMMUNIFE', 'MUNINEG': 'MUNINEG', 'NOMMUNINE': 'NOMMUNINE', 'CVEUNIK': 'CVEUNIK', 'munineg10': 'munineg10', 'NOMNINE10': 'NOMNINE10', 'cve_ent': 'cve_ent', 'cve_mun': 'cve_mun', 'cx': 'cx', 'cy': 'cy', 'minx': 'minx', 'miny': 'miny', 'maxx': 'maxx', 'maxy': 'maxy', 'cve_jur': 'cve_jur', 'cveUnk': 'cveUnk', 'Shape_area': 'Shape_area', 'Shape_len': 'Shape_len', 'final —': 'final —', 'final ��_1': 'final ��_1', 'final ��_2': 'final ��_2', 'final ��_3': 'final ��_3', 'final ��_4': 'final ��_4', });
lyr_Jurisdicciones_5.set('fieldAliases', {'Id': 'Id', 'JURIS': 'JURIS', 'NOM_JURIS': 'NOM_JURIS', 'NOM_CORTO': 'NOM_CORTO', });
lyr_TotaldeCasosporMunicipio_6.set('fieldAliases', {'CVE_ENT': 'CVE_ENT', 'CVE_MUN': 'CVE_MUN', 'NOM_MUN': 'NOM_MUN', 'CVE_JUR': 'CVE_JUR', 'casos — mpio_TOTAL_CASOS': 'casos — mpio_TOTAL_CASOS', });
lyr_DefuncionesporMpio_7.set('fieldAliases', {'CVE_ENT': 'CVE_ENT', 'CVE_MUN': 'CVE_MUN', 'NOM_MUN': 'NOM_MUN', 'CVE_JUR': 'CVE_JUR', 'casos — mpio_DEFUN': 'casos — mpio_DEFUN', });
lyr_CasosProbablesporMunicipio_8.set('fieldAliases', {'CVE_ENT': 'CVE_ENT', 'CVE_MUN': 'CVE_MUN', 'NOM_MUN': 'NOM_MUN', 'CVE_JUR': 'CVE_JUR', 'casos — mpio_casos_proba': 'casos — mpio_casos_proba', });
lyr_CasosConfirmadosporMunicipio_9.set('fieldAliases', {'CVE_ENT': 'CVE_ENT', 'CVE_MUN': 'CVE_MUN', 'NOM_MUN': 'NOM_MUN', 'CVE_JUR': 'CVE_JUR', 'casos — mpio_CASOS_confir': 'casos — mpio_CASOS_confir', });
lyr_CasosConfirmados_10.set('fieldAliases', {'FOLD_ID': 'FOLD_ID', 'id': 'id', 'casos — Hoja1_diag': 'casos — Hoja1_diag', });
lyr_LimEstatal_1.set('fieldImages', {'CVE_ENT': 'TextEdit', 'NOM_ENT': 'TextEdit', });
lyr_LimMpal_2.set('fieldImages', {'CVE_ENT': 'TextEdit', 'CVE_MUN': 'TextEdit', 'NOM_MUN': 'TextEdit', 'CVE_JUR': 'Range', });
lyr_II_3.set('fieldImages', {'OBJECTID': 'TextEdit', 'ENTIDAD': 'TextEdit', 'DISTRITO': 'TextEdit', 'MUNICIPIO': 'TextEdit', 'SECCION': 'TextEdit', 'TIPO': 'TextEdit', 'ENTIFE': 'TextEdit', 'MUNIFE': 'TextEdit', 'SECTOR': 'TextEdit', 'NOMMUNIFE': 'TextEdit', 'MUNINEG': 'TextEdit', 'NOMMUNINE': 'TextEdit', 'CVEUNIK': 'TextEdit', 'munineg10': 'TextEdit', 'NOMNINE10': 'TextEdit', 'cve_ent': 'TextEdit', 'cve_mun': 'TextEdit', 'cx': 'TextEdit', 'cy': 'TextEdit', 'minx': 'TextEdit', 'miny': 'TextEdit', 'maxx': 'TextEdit', 'maxy': 'TextEdit', 'cve_jur': 'TextEdit', 'cveUnk': 'TextEdit', 'Shape_area': 'TextEdit', 'Shape_len': 'TextEdit', 'final —': 'TextEdit', 'final ��_1': 'TextEdit', 'final ��_2': 'TextEdit', 'final ��_3': 'TextEdit', 'final ��_4': 'TextEdit', });
lyr_I_4.set('fieldImages', {'OBJECTID': 'TextEdit', 'ENTIDAD': 'TextEdit', 'DISTRITO': 'TextEdit', 'MUNICIPIO': 'TextEdit', 'SECCION': 'TextEdit', 'TIPO': 'TextEdit', 'ENTIFE': 'TextEdit', 'MUNIFE': 'TextEdit', 'SECTOR': 'TextEdit', 'NOMMUNIFE': 'TextEdit', 'MUNINEG': 'TextEdit', 'NOMMUNINE': 'TextEdit', 'CVEUNIK': 'TextEdit', 'munineg10': 'TextEdit', 'NOMNINE10': 'TextEdit', 'cve_ent': 'TextEdit', 'cve_mun': 'TextEdit', 'cx': 'TextEdit', 'cy': 'TextEdit', 'minx': 'TextEdit', 'miny': 'TextEdit', 'maxx': 'TextEdit', 'maxy': 'TextEdit', 'cve_jur': 'TextEdit', 'cveUnk': 'TextEdit', 'Shape_area': 'TextEdit', 'Shape_len': 'TextEdit', 'final —': 'TextEdit', 'final ��_1': 'TextEdit', 'final ��_2': 'TextEdit', 'final ��_3': 'TextEdit', 'final ��_4': 'TextEdit', });
lyr_Jurisdicciones_5.set('fieldImages', {'Id': 'Range', 'JURIS': 'Range', 'NOM_JURIS': 'TextEdit', 'NOM_CORTO': 'TextEdit', });
lyr_TotaldeCasosporMunicipio_6.set('fieldImages', {'CVE_ENT': 'TextEdit', 'CVE_MUN': 'TextEdit', 'NOM_MUN': 'TextEdit', 'CVE_JUR': 'Range', 'casos — mpio_TOTAL_CASOS': 'Range', });
lyr_DefuncionesporMpio_7.set('fieldImages', {'CVE_ENT': 'TextEdit', 'CVE_MUN': 'TextEdit', 'NOM_MUN': 'TextEdit', 'CVE_JUR': 'Range', 'casos — mpio_DEFUN': 'Range', });
lyr_CasosProbablesporMunicipio_8.set('fieldImages', {'CVE_ENT': 'TextEdit', 'CVE_MUN': 'TextEdit', 'NOM_MUN': 'TextEdit', 'CVE_JUR': 'Range', 'casos — mpio_casos_proba': 'Range', });
lyr_CasosConfirmadosporMunicipio_9.set('fieldImages', {'CVE_ENT': 'TextEdit', 'CVE_MUN': 'TextEdit', 'NOM_MUN': 'TextEdit', 'CVE_JUR': 'Range', 'casos — mpio_CASOS_confir': 'Range', });
lyr_CasosConfirmados_10.set('fieldImages', {'FOLD_ID': 'TextEdit', 'id': 'Range', 'casos — Hoja1_diag': 'TextEdit', });
lyr_LimEstatal_1.set('fieldLabels', {'CVE_ENT': 'no label', 'NOM_ENT': 'no label', });
lyr_LimMpal_2.set('fieldLabels', {'CVE_ENT': 'no label', 'CVE_MUN': 'no label', 'NOM_MUN': 'inline label - visible with data', 'CVE_JUR': 'no label', });
lyr_II_3.set('fieldLabels', {'OBJECTID': 'no label', 'ENTIDAD': 'no label', 'DISTRITO': 'no label', 'MUNICIPIO': 'no label', 'SECCION': 'no label', 'TIPO': 'no label', 'ENTIFE': 'no label', 'MUNIFE': 'no label', 'SECTOR': 'no label', 'NOMMUNIFE': 'no label', 'MUNINEG': 'no label', 'NOMMUNINE': 'no label', 'CVEUNIK': 'no label', 'munineg10': 'no label', 'NOMNINE10': 'no label', 'cve_ent': 'no label', 'cve_mun': 'no label', 'cx': 'no label', 'cy': 'no label', 'minx': 'no label', 'miny': 'no label', 'maxx': 'no label', 'maxy': 'no label', 'cve_jur': 'no label', 'cveUnk': 'no label', 'Shape_area': 'no label', 'Shape_len': 'no label', 'final —': 'no label', 'final ��_1': 'no label', 'final ��_2': 'no label', 'final ��_3': 'no label', 'final ��_4': 'no label', });
lyr_I_4.set('fieldLabels', {'OBJECTID': 'no label', 'ENTIDAD': 'no label', 'DISTRITO': 'no label', 'MUNICIPIO': 'header label - always visible', 'SECCION': 'no label', 'TIPO': 'no label', 'ENTIFE': 'no label', 'MUNIFE': 'no label', 'SECTOR': 'no label', 'NOMMUNIFE': 'no label', 'MUNINEG': 'no label', 'NOMMUNINE': 'no label', 'CVEUNIK': 'no label', 'munineg10': 'no label', 'NOMNINE10': 'no label', 'cve_ent': 'no label', 'cve_mun': 'no label', 'cx': 'no label', 'cy': 'no label', 'minx': 'no label', 'miny': 'no label', 'maxx': 'no label', 'maxy': 'no label', 'cve_jur': 'no label', 'cveUnk': 'no label', 'Shape_area': 'no label', 'Shape_len': 'no label', 'final —': 'no label', 'final ��_1': 'no label', 'final ��_2': 'no label', 'final ��_3': 'no label', 'final ��_4': 'no label', });
lyr_Jurisdicciones_5.set('fieldLabels', {'Id': 'no label', 'JURIS': 'no label', 'NOM_JURIS': 'no label', 'NOM_CORTO': 'no label', });
lyr_TotaldeCasosporMunicipio_6.set('fieldLabels', {'CVE_ENT': 'no label', 'CVE_MUN': 'no label', 'NOM_MUN': 'inline label - visible with data', 'CVE_JUR': 'no label', 'casos — mpio_TOTAL_CASOS': 'no label', });
lyr_DefuncionesporMpio_7.set('fieldLabels', {'CVE_ENT': 'header label - always visible', 'CVE_MUN': 'inline label - always visible', 'NOM_MUN': 'inline label - visible with data', 'CVE_JUR': 'no label', 'casos — mpio_DEFUN': 'no label', });
lyr_CasosProbablesporMunicipio_8.set('fieldLabels', {'CVE_ENT': 'no label', 'CVE_MUN': 'no label', 'NOM_MUN': 'inline label - visible with data', 'CVE_JUR': 'no label', 'casos — mpio_casos_proba': 'no label', });
lyr_CasosConfirmadosporMunicipio_9.set('fieldLabels', {'CVE_ENT': 'no label', 'CVE_MUN': 'no label', 'NOM_MUN': 'no label', 'CVE_JUR': 'no label', 'casos — mpio_CASOS_confir': 'inline label - visible with data', });
lyr_CasosConfirmados_10.set('fieldLabels', {'FOLD_ID': 'no label', 'id': 'no label', 'casos — Hoja1_diag': 'inline label - visible with data', });
lyr_CasosConfirmados_10.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});