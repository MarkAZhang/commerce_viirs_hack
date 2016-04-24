import Main from './components/Main'
import {render} from 'react-dom'
import './style.css'

/* import {last, get, map, reverse, flow} from 'lodash/fp'
import {map as leafletMap, polygon, tileLayer, latLng, latLngBounds, CRS, geoJson} from 'leaflet'

import {fetchJson} from './api'
import {addPolygon} from './utils'

/* const southWest = latLng(-90, -180)
const northEast = latLng(90, 180)
const bounds = latLngBounds(southWest, northEast)

const mapOne = leafletMap('mapOne', {
  center:[40.72, -74],
  zoom: 9,
  maxBounds: bounds,
  layers: [],
  crs: CRS.EPSG3857,
})

const tileLayerOne = tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    minZoom: 1,
    attribution: `Data by <a href="http://openstreetmap.org">OpenStreetMap</a>,
      under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.`,
    detectRetina: false,
  }
).addTo(mapOne);

fetchJson('just_manhattan.json').then(json => {
  const polygonsOne = map(
    get(['geometry', 'coordinates', 0]),
  get(['features'], json))
  const polygons = map(flow(
    get(['geometry', 'coordinates', 0]),
    map(reverse)
  ), get(['features'], json))
  map(polygon => addPolygon(polygon, mapOne), polygons)
  // const geoJsonOne = geoJson(json).addTo(mapOne)
  // geoJsonOne.setStyle(feature => feature.properties.style)
})
*/

/* document.getElementById('mapOne').src = 'test_nums.html'
document.getElementById('mapTwo').src = 'test_nums.html' */

const rootElement = document.getElementById('content')
window.console.log(content)

// Render it
render(<Main />, rootElement)
