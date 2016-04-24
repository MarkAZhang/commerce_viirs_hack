import MapContainer from './MapContainer'

const Main = props =>
  <div className="content">
    <div className="container">
      <MapContainer iframeId="mapOne" />
      <MapContainer iframeId="mapTwo" />
    </div>
  </div>

export default Main
