import {PropTypes} from 'react'

const Map = props =>
  <iframe className='iframe' src={props.src} frameBorder="0"></iframe>

Map.propTypes = {
  src: PropTypes.string.isRequired,
}

export default Map
