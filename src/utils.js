import {polygon} from 'leaflet'

export const addPolygon = (ptArray, map) => {
  polygon(ptArray).addTo(map)
}
