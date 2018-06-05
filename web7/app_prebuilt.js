var defaultFill = new ol.style.Fill({
   color: 'rgba(255,255,255,0.4)'
 });
 var defaultStroke = new ol.style.Stroke({
   color: '#3399CC',
   width: 1.25
 });
 var defaultSelectionFill = new ol.style.Fill({
   color: 'rgba(255,255,0,0.4)'
 });
 var defaultSelectionStroke = new ol.style.Stroke({
   color: '#FFFF00',
   width: 1.25
 });



                    var textStyleCache_nepalhouseholdsimple={}
                    var clusterStyleCache_nepalhouseholdsimple={}
                    var style_nepalhouseholdsimple = function(feature, resolution){
                        
                        var value = "";
                        var style = [ new ol.style.Style({
                            image: new ol.style.Circle({radius: 3.8, stroke: new ol.style.Stroke({color: "rgba(0,0,0,1.0)", lineDash: null, width: 0}), fill: new ol.style.Fill({color: "rgba(173,42,205,1.0)"})})
                        })
                        ];
                        var allStyles = [];
                        
                        allStyles.push.apply(allStyles, style);
                        return allStyles;
                    };
                    var selectionStyle_nepalhouseholdsimple = function(feature, resolution){
                        
                        var value = "";
                        var style = [ new ol.style.Style({
                            image: new ol.style.Circle({radius: 3.8, stroke: new ol.style.Stroke({color: "rgba(255, 204, 0, 1)", lineDash: null, width: 0}), fill: new ol.style.Fill({color: "rgba(255, 204, 0, 1)"})})
                        })
                        ]
                        var allStyles = [];
                        
                        allStyles.push.apply(allStyles, style);
                        return allStyles;
                    };
var baseLayers = [];var baseLayersGroup = new ol.layer.Group({showContent: true,'type':
                    'base-group', 'title': 'Base maps', layers: baseLayers});
var overlayLayers = [];var overlaysGroup = new ol.layer.Group({showContent: true, 'title': 'Overlays', layers: overlayLayers});
var lyr_srtm_cgiar_nepal_boundary = new ol.layer.Image({
                                opacity: 1.0,
                                 
                                title: "srtm_cgiar_nepal_boundary",
                                id: "srtm_cgiar_nepal_boundary20180604153247872",
                                timeInfo: null,
                                source: new ol.source.ImageStatic({
                                   url: "./data/srtm_cgiar_nepal_boundary.jpg",
                                    projection: "EPSG:3857",
                                    alwaysInRange: true,
                                    imageSize: [9793, 4925],
                                    imageExtent: [8910846.939275, 3041666.763660, 9819306.750390, 3561202.467405]
                                })
                            });
var lyr_nepalhouseholdsimple = new ol.layer.Vector({
                    opacity: 1.0,
                    source: new ol.source.Vector(),
                     
                    style: style_nepalhouseholdsimple,
                    selectedStyle: selectionStyle_nepalhouseholdsimple,
                    title: "Nepal Household simple",
                    id: "Nepal_Household_simple20180604155129552",
                    filters: [],
                    timeInfo: null,
                    isSelectable: true,
                    popupInfo: "<table class='popup-table'><tr><th>Attribute</th><th>Value</th><tr><td>contact_details</td><td style='text-align:right'>[Assessment/household_contact/contact_details]</td></tr><tr><td>latitude</td><td style='text-align:right'>[Assessment/household_contact/_gpslocation_latitude]</td></tr><tr><td>longitude</td><td style='text-align:right'>[Assessment/household_contact/_gpslocation_longitude]</td></tr></table>"
                });
nepalhouseholdsimple_geojson_callback = function(geojson) {
                              lyr_nepalhouseholdsimple.getSource().addFeatures(new ol.format.GeoJSON().readFeatures(geojson));
                        };

lyr_srtm_cgiar_nepal_boundary.setVisible(true);
lyr_nepalhouseholdsimple.setVisible(true);
var layersList = [lyr_srtm_cgiar_nepal_boundary,lyr_nepalhouseholdsimple];
var legendData = {"Nepal_Household_simple20180604155129552": [{"href": "1_0.png", "title": ""}]};
var view = new ol.View({ maxZoom: 32, minZoom: 1, projection: 'EPSG:3857'});
var originalExtent = [9144505.059565, 3095931.477166, 9796671.340106, 3361045.573351];

var map = new ol.Map({
  layers: layersList,
  view: view,
  controls: []
});



var BasicApp = React.createClass({
  componentDidMount() {
    map.setTarget(ReactDOM.findDOMNode(this.refs.map));
    view = map.getView();
    view.fit(originalExtent, map.getSize());
    
  },
  _toggle(el) {
    if (el.style.display === 'block') {
      el.style.display = 'none';
    } else {
      el.style.display = 'block';
    }
  },
  _toggleTable() {
    this._toggle(document.getElementById('table-panel'));
    this.refs.table.getWrappedInstance().setDimensionsOnState();
  },
  _toggleWFST() {
    this._toggle(document.getElementById('wfst'));
  },
  _toggleQuery() {
    this._toggle(document.getElementById('query-panel'));
  },
  _toggleEdit() {
    this._toggle(document.getElementById('edit-tool-panel'));
  },
  _toggleAboutPanel() {
    this._toggle(document.getElementById('about-panel'));
  },
  _toggleChartPanel(evt) {
    evt.preventDefault();
    this._toggle(document.getElementById('chart-panel'));
  },
  _navigationFunc() {
    ToolActions.activateTool(null, 'navigation');
  },
  render() {
    var options = [{text: 'Table', icon: 'list-alt', onClick: this._toggleTable.bind(this)},
{text: 'Query', icon: 'filter', onClick: this._toggleQuery.bind(this)},
{
                              jsx: React.createElement(Select, {toggleGroup: 'navigation', map:map})
                            }, {
                              text: 'Navigation',
                              icon: 'hand-paper-o',
                              onClick: this._navigationFunc.bind(this)
                            },
{exclude: true, jsx: React.createElement("a", {className:"navbar-brand", href:"#"}, "My Web App")}];
    return React.createElement("article", null,
      React.createElement(Toolbar, {options: options}
      ),
      React.createElement("div", {id: 'content'},
        React.createElement("div", {id: 'map', ref: 'map'}
          ,
React.createElement("div", {id: 'query-panel', className:'query-panel'},
                                          React.createElement(QueryBuilder, {map: map})
                                        ),
React.createElement("div", {id: 'popup', className: 'ol-popup'},
                                    React.createElement(InfoPopup, {map: map, hover: true})
                                  )
        )
        ,
 React.createElement("div", {id: 'table-panel', className: 'attributes-table'},
                                          React.createElement(FeatureTable, {offset: [20, 20], ref: 'table', resizeTo: 'table-panel', layer: lyr_nepalhouseholdsimple, pointZoom:16, map: map})
                                    ),
React.createElement("div",{id: "legend"},
                                React.createElement(QGISLegend, {map:map, legendBasePath:'./resources/legend/',showExpandedOnStartup:false, expandOnHover:true, legendData:legendData})
                            )
      )
    );
  }
});

ReactDOM.render(React.createElement(IntlProvider, {locale: 'en'}, React.createElement(BasicApp)), document.getElementById('main'));


