import {PropTypes} from 'react'

const Map = props =>
  <div className="iframeContainer">
    <iframe className='iframe' src={props.src} frameBorder="0"></iframe>
  </div>

Map.propTypes = {
  src: PropTypes.string.isRequired,
}

export default Map
