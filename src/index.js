import {last} from 'lodash/fp'
import {map, tileLayer, latLng, latLngBounds, CRS, geoJson} from 'leaflet'

import {fetchJson} from './api'
import './style.css'

const southWest = latLng(-90, -180)
const northEast = latLng(90, 180)
const bounds = latLngBounds(southWest, northEast)

const mapOne = map('mapOne', {
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
  const geoJsonOne = geoJson(json).addTo(mapOne)
  geoJsonOne.setStyle(feature => feature.properties.style)
})
