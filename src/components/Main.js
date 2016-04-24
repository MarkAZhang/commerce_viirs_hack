import MapContainer from './MapContainer'
import FontAwesome from 'react-fontawesome'

const Main = props =>
  <div className="content">
    <div className="header">
      <div className="title">Satellite Data to Economic Activity</div>
      <a href='https://github.com/MarkAZhang/commerce_viirs_hack'>
        <FontAwesome name='github' className='githubIcon' />
      </a>
    </div>
    <div className="maps">
      <MapContainer />
      <MapContainer />
    </div>
  </div>

export default Main
