import MapContainer from './MapContainer'
import FontAwesome from 'react-fontawesome'

const Main = props =>
  <div className="content">
    <div className="header">
      <div className="title">Using Satellite Data to Estimate Construction Activity</div>
      <a href='https://github.com/MarkAZhang/commerce_viirs_hack'>
        <FontAwesome name='github' className='githubIcon' />
      </a>
    </div>
    <div className="maps">
      <MapContainer initialSrc='chi_light.html'/>
      <MapContainer initialSrc='chi_build.html'/>
    </div>
  </div>

export default Main
